"use client"
import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("")
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const router = useRouter();

  const handleChange= (e:any)=>{
    if(e.target.name === 'email'){
        setusername(e.target.value);
    }
    else{
        setPassword(e.target.value);
    }

  }
  const handleGoogleSignIn = async () => {
    const res = await signIn('google', { callbackUrl: '/dashboard' });

    if (res && !res.error) {
      // Sign-in was successful, redirect to dashboard
      router.push('/dashboard');
    } else {
      // Handle sign-in failure, you can show an error message or stay on the sign-in page
      console.error('Sign-in error:', res);
      // Optionally, you could redirect to an error page or show a message here
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 bg-[#151719] text-white">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2 text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Your Email
              </Typography>
            </label>
            <Input onChange={handleChange}
            id="email"
            color="gray"
            size="lg"
            type="email"
            name="email"
            placeholder="name@mail.com"
            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            labelProps={{
              className: "hidden",
            }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Password
              </Typography>
            </label>
            <Input onChange={handleChange}
            size="lg"
            placeholder="********"
            labelProps={{
              className: "hidden",
            }}
            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            type={passwordShown ? "text" : "password"}
            icon={<i onClick={togglePasswordVisiblity}>
              {passwordShown ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </i>} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />
          </div>
          <Button onClick={async () => {
            const res = await signIn("credentials", {
              email: username,
              password: password,
              redirect: false,
            });
            console.log(res);
            if(res?.status==200){
              router.push("/dashboard");
            }
            
          } } color="gray" size="lg" className="mt-6 bg-[#5D5DFF] hover:bg-[#5D5DFF]" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            sign in
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Forgot password
            </Typography>
          </div>
          <Button onClick={handleGoogleSignIn}
          variant="outlined"
          size="lg"
          className="mt-6 flex h-12 items-center justify-center gap-2 bg-white"
          fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Not registered?{" "}
            <a href="#" className="font-medium text-gray-900">
              Create account
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}
