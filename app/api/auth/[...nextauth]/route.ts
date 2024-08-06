import { NEXTAUTH } from "@/app/lib/auth";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth(NEXTAUTH);

export const GET = handler; 
export const POST = handler;