"use client";
import { useCreateLoginUser } from "@/features/auth/useCreateLoginUser";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { loginSchema } from "../../../../schema/useAuthSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeSlash,
  ShieldCheck,
  ShoppingCartSimple,
  Star,
  Wallet,
} from "@phosphor-icons/react";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "@/components/ui/card";

import CountUp from "react-countup";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import GithubLoginButton from "@/components/Auth/GithubLoginButton";

const LoginPage = () => {
  const words = ["Sign In", "Login"];
  const { mutate } = useCreateLoginUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  type LoginRegister = z.infer<typeof loginSchema>;

  const form = useForm<LoginRegister>({
    resolver: zodResolver(loginSchema),
  });

  const { control, handleSubmit, setError } = form;

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    mutate(values, {
      onError: (error: any) => {
        setError("password", {
          type: "manual",
          message: error.response?.data?.message || "Password incorrect",
        });
      },
    });
  });
  const router = useRouter();

  // useEffect(() => {
  //   // Ambil query parameters dari URL
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const access_token = queryParams.get("access_token");
  //   const refresh_token = queryParams.get("refresh_token");

  //   if (access_token && refresh_token) {
  //     // Validasi token
  //     if (access_token && refresh_token) {
  //       // Simpan token di localStorage
  //       localStorage.setItem("access_token", access_token);
  //       localStorage.setItem("refresh_token", refresh_token);

  //       // Redirect ke dashboard
  //       toast.success("Login berhasil! Mengarahkan ke dashboard...");
  //       router.push("/");
  //     } else {
  //       toast.error("Token tidak valid, silakan coba login ulang.");
  //       router.push("/login");
  //     }
  //   } else {
  //     toast.error("Token tidak tersedia, silakan coba login ulang.");
  //     router.push("/login");
  //   }
  // }, [router]);

  return (
    <div className="h-screen">
      <div className="flex justify-between p-4 gap-16">
        <section className="p-16">
          <h1 className="font-bold text-4xl mb-12">
            <FlipWords words={words} />
          </h1>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-[600px] dark:bg-white dark:text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="dark:bg-white dark:text-black"
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5 text-gray-600" />
                          ) : (
                            <EyeSlash className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          className="dark:bg-white dark:text-black"
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                          onClick={toggleShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <Eye className="h-5 w-5 text-gray-600" />
                          ) : (
                            <EyeSlash className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <p className="flex justify-end">
                <Link href={"/forgot-password"}>Forgot Password</Link>
              </p>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-dark-bgSectionOne rounded-md hover:bg-dark-bgSectionTwo focus:outline-none cursor-pointer"
              >
                Login
              </button>
            </form>
          </Form>
          <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleLoginButton title="Sign In With Google" />
          <GithubLoginButton title="Sign In With Github" />
        </section>
        <section className="p-10 bg-gradient-to-b from-dark-bgSectionOne to-dark-bgSectionTwo/70 w-[600px] h-[calc(100vh-2rem)] rounded-2xl max-sm:hidden">
          <h1 className="text-white font-bold text-4xl mb-2">Welcome Back,</h1>
          <h1 className="text-white font-bold text-4xl mb-4">
            Let's Get Shopping!
          </h1>
          <h1 className="text-white font-semibold w-[300px] mb-6 pl-1">
            Log in to access your favorites, track orders, and enjoy exclusive
            offers!
          </h1>
          <div className="pl-1">
            <div className="flex gap-2 items-center mb-2">
              <Wallet size={32} color="#ffffff" weight="fill" />
              <h1 className="text-white font-semibold pl-1 text-lg">
                Secure Payments
              </h1>
            </div>
            <p className="text-white pl-1 mb-8">
              Shop with confidence. All transactions are securely processed with
              industry-leading protection.
            </p>
            <div className="flex gap-2 items-center mb-2">
              <ShieldCheck size={32} color="#ffffff" weight="fill" />
              <h1 className="text-white font-semibold pl-1 text-lg">
                Built-in Security
              </h1>
            </div>
            <p className="text-white pl-1 mb-8">
              Your data is safe with us. We use advanced encryption to protect
              your personal information.
            </p>
            <div className="flex gap-2 items-center mb-2">
              <ShoppingCartSimple size={32} color="#ffffff" weight="fill" />
              <h1 className="text-white font-semibold pl-1 text-lg">
                <CountUp start={1} end={1000000} duration={5} separator="," />+
                Happy Shoppers
              </h1>
            </div>
            <p className="text-white pl-1">
              Join a growing community of satisfied customers who trust us for
              their shopping needs.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
