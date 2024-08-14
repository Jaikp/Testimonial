
import prisma from '@/utils/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';

export const NEXTAUTH = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },

          async authorize (credentials:any){
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            console.log(credentials);
            const existinguser = await prisma.user.findUnique({
              where: { email: credentials.email },
            });
            console.log(existinguser);
            if (existinguser && existinguser.password) {
              const isValidPassword = await bcrypt.compare(credentials.password, existinguser.password);
    
              if (isValidPassword) {
                return { id: existinguser.id.toString(), email: existinguser.email, password: existinguser.password, name: existinguser.name, googleId: existinguser.googleId };
              }
              return null;
            }
            try {
                const user = await prisma.user.create({
                    data: {
                        email : credentials.email,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email
                }
            } catch(e) {
                console.error(e);
            }
    
            return null;
          },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile } :any) {
            if (account.provider === 'google') {
              
              const googleProfile = profile as { sub: string; email: string; name: string };
              console.log(googleProfile.sub);
              let existingUser = await prisma.user.findUnique({
                where: { googleId: googleProfile.sub },
              });
              console.log("fdjkvndsjkbcahjlsdb helloo");
              if (!existingUser) {
                existingUser = await prisma.user.create({
                  data: {
                    email: googleProfile.email,
                    googleId: googleProfile.sub,
                    name: googleProfile.name,
                  },
                });
              }
      
              return true;
            }
      
            return true;
          },
        session: ({ session, token, user }: any) => {
            if (session.user) {
              console.log(session);
                session.user.id = token.sub
            }
            return session
        },
  },
  }