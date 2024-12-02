"use client";

import { Card } from "@/components/ui/card";
import { useForgotPassword } from "@/features";
import { ArrowLeft, Fingerprint } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { forgotPasswordSchema } from "../../../schema/useForgotPasswordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const StepBar = () => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white max-sm:w-8 max-sm:h-8">
          1
        </div>
        <p className="text-sm mt-2">Forgot Password</p>
      </div>

      <div className="w-10 h-1 bg-gray-300 mx-2" />

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 max-sm:w-8 max-sm:h-8">
          2
        </div>
        <p className="text-sm mt-2">Verify otp</p>
      </div>

      <div className="w-10 h-1 bg-gray-300 mx-2" />

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 max-sm:w-8 max-sm:h-8">
          3
        </div>
        <p className="text-sm mt-2">Reset password</p>
      </div>
    </div>
  );
};

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { mutate, isError, isSuccess, error } = useForgotPassword();
  const [countdown, setCountdown] = useState(0);

  type FormForgotPassword = z.infer<typeof forgotPasswordSchema>

  const form = useForm<FormForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const { control, handleSubmit } = form

  const onSubmit = handleSubmit((values) => {
    mutate(values.email)
  })

  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      setCountdown(10)

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push('/verify-otp');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isSuccess, router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <StepBar />
        <Card className="p-2 mb-4">
          <Fingerprint size={48} />
        </Card>
        <h1 className="font-bold text-3xl mb-1">Forgot Password?</h1>
        <p className="text-dark-grayForgotPasswrod text-lg mb-4">
          No worries, we’ll send you reset instruction.
        </p>
        <Form {...form}>
        <form onSubmit={onSubmit} className="w-full max-sm:p-4">
          <FormField
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
              </FormItem>
            )
          }} 
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-dark-bgSectionOne rounded-md hover:bg-dark-bgSectionTwo focus:outline-none cursor-pointer mt-6"
            >
            Send
          </button>
          {isSuccess && (
              <div className="mt-2 text-center">
                <p className="text-gray-900 dark:text-gray-300">We've sent an OTP code to your email!</p>
                <p className=" text-gray-900 dark:text-gray-300">You will be redirected in <span className="font-semibold">{countdown}</span> seconds.</p>
              </div>
            )}
        </form>
            </Form>
        <div className="mt-4">
        <Link href={'/login'} className="flex items-center gap-1 text-dark-grayForgotPasswrod hover:text-black">
          <ArrowLeft size={26} weight="bold" />
          <p>Back to log in</p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
