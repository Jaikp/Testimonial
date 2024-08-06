"use client"
import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function page() {
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

  return (
    <section className="grid text-center h-screen items-center p-8 bg-[#151719] text-white">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2 text-white">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-white"
              >
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
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-white"
              >
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
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button onClick={async () => {
            const res = await signIn("credentials", {
                email: username,
                password: password,
                redirect: false,
            });
            console.log(res);
            router.push("/dashboard")
        }} color="gray" size="lg" className="mt-6 bg-[#5D5DFF] hover:bg-[#5D5DFF]" fullWidth>
            sign in
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button onClick={async()=>{ await signIn("google")}}
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2 bg-white"
            fullWidth
          >
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
            className="!mt-4 text-center font-normal"
          >
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

export default page;