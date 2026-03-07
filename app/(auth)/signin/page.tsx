"use client"
import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
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
      router.push('/dashboard');
    } else {
      console.error('Sign-in error:', res);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0e0f11] via-[#1a1c20] to-[#0e0f11] text-white flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="relative w-full max-w-md z-10">
        {/* Brand */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-2">
            Endorser
          </h1>
          <p className="text-gray-400">Welcome back to your testimonial space</p>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-[#1a1c20] to-[#0f1114] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-white">Sign In</h2>
          <p className="text-gray-400 text-sm mb-8">Enter your credentials to access your dashboard</p>

          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                value={username}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  value={password}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisiblity}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              onClick={async () => {
                setLoading(true);
                const res = await signIn("credentials", {
                  email: username,
                  password: password,
                  redirect: false,
                });
                setLoading(false);
                if(res?.ok){
                  router.push("/dashboard");
                }
              }}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-400 disabled:to-blue-400 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a1c20] text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 border border-gray-700 hover:border-gray-600 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 hover:bg-gray-800/50"
            >
              <img
                src="https://www.material-tailwind.com/logos/logo-google.png"
                alt="google"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Protected by industry-standard security
        </p>
      </div>
    </section>
  );
}
