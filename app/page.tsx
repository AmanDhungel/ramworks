"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLogin } from "@/services/auth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useAuthStore from "@/context/User";

const loginSchema = z.object({
  user_email: z.email(),
  user_password: z.string().min(1, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const { mutate, isPending } = useLogin();
  const [seePassword, setSeePassword] = useState(false);
  const { loginData } = useAuthStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        loginData(data?.user);
        router.push("/domain-workspace");
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-1">
            RamWorks
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Don`t have an account?{" "}
            <span className="text-blue-600 font-medium cursor-pointer">
              Get Started!
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Email
            </label>
            <input
              {...register("user_email")}
              type="email"
              placeholder="Enter your email address"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.user_email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.user_email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.user_email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Password
            </label>
            <div className="flex items-center w-full bg-[#f6f9ff] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
              <Input
                {...register("user_password")}
                type={seePassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`focus:ring-0 border-none shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-0  p-1 ${
                  errors.user_password ? "border-red-500" : "border-gray-200"
                }`}
              />
              {seePassword ? (
                <Eye
                  onClick={() => setSeePassword(!seePassword)}
                  className=" right-3 top-3 cursor-pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setSeePassword(!seePassword)}
                  className=" right-3 top-3 cursor-pointer"
                />
              )}
            </div>
            {errors.user_password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.user_password.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium text-gray-600">
              Remember Me
            </label>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors flex justify-center items-center">
            {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
          </Button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-200 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-semibold text-gray-700">
              Login with Google
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
