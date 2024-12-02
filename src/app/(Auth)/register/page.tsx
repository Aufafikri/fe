"use client";

import { useCreateRegisterUser } from "@/features";
import React, { useState } from "react";
import { z } from "zod";
import { registerSchema } from "../../../../schema/useAuthSchema";
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
import { Eye, EyeSlash, Star } from "@phosphor-icons/react";
import { Toaster } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import GithubLoginButton from "@/components/Auth/GithubLoginButton";

const RegisterPage = () => {
  const signUp = ["Sign Up", "Register Your Account"];
  const { mutate } = useCreateRegisterUser();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  type FormRegister = z.infer<typeof registerSchema>;

  const form = useForm<FormRegister>({
    resolver: zodResolver(registerSchema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit((values) => {
    mutate(values, {
      onSuccess: () => {
        if (!isEmailVerified) {
          setShowVerificationMessage(true);
        } else {
          // Handle successful registration
          console.log("Registration successful!");
        }
      },
    });
  });

  return (
    <div className="h-screen">
      <div className="flex p-4 gap-16">
        <section className="p-10 bg-gradient-to-b from-dark-bgSectionOne to-dark-bgSectionTwo/70 w-[500px] h-[calc(100vh-2rem)] rounded-2xl max-sm:hidden">
          <h1 className="text-white font-bold">EvstStore</h1>
          <div className="mt-16 justify-center">
            <h1 className="text-white font-bold text-4xl mb-2">
              Shop Smarter,
            </h1>
            <h1 className="text-white font-bold text-4xl">
              Live Can Be Better!
            </h1>
          </div>
          <h1 className="text-white mt-8">
            Join our community today and unlock exclusive deals, personalized
            recommendations, and more!
          </h1>
          <Card className="p-6 rounded-3xl mt-16 bg-dark-bgCardReviews border-none">
            <h1 className="text-white text-left">
              Amazing platform! I’ve been using this e-commerce site for a few
              months now, and the experience has been nothing short of
              excellent.
            </h1>
            <div className="mt-4 flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="./assets/registerProfile.jpg"
                  alt=""
                  className="rounded-full w-8 h-8 object-cover"
                />
                <h1 className="text-white">Aufafikri</h1>
              </div>
              <div className="flex items-center">
                <Star size={18} color="#ffde05" weight="fill" />
                <Star size={18} color="#ffde05" weight="fill" />
                <Star size={18} color="#ffde05" weight="fill" />
                <Star size={18} color="#ffde05" weight="fill" />
                <Star size={18} color="#ffde05" weight="fill" />
              </div>
            </div>
          </Card>
        </section>
        <section className="p-10 max-sm:p-4">
          <h1 className="font-bold text-4xl mb-4">
            <FlipWords words={signUp} />
          </h1>
          <Link
            href={"/login"}
            className="font-semibold hover:text-dark-bgSectionOne"
          >
            Have an account?
          </Link>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 mt-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[500px] max-sm:w-[400px] dark:bg-white dark:text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
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
                          className="w-[500px] max-sm:w-[400px] dark:bg-white dark:text-black"
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
                          className="dark:bg-white dark:text-black mb-4"
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
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-dark-bgSectionOne rounded-md hover:bg-dark-bgSectionTwo focus:outline-none cursor-pointer mt-6"
              >
                Create Account
              </button>
            </form>
          </Form>
          {showVerificationMessage && (
            <p className="text-gray-500 mt-4 text-center dark:text-gray-200">
              Please verify your email first.
            </p>
          )}
          <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleLoginButton title="Sign Up With Google" />
          <GithubLoginButton title="Sign Up With Github" />
        </section>
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
