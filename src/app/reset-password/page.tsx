"use client"

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useResetPasswordUser } from "@/features";
import { Card } from "@/components/ui/card";
import { ArrowLeft, DotsThree, Fingerprint } from "@phosphor-icons/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "../../../schema/useResetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "react-hot-toast";

const StepBar = () => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white max-sm:w-8 max-sm:h-8">
          1
        </div>
        <p className="text-sm mt-2">Forgot Password</p>
      </div>

      <div className="w-10 h-1 bg-blue-500 mx-2" />

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white max-sm:w-8 max-sm:h-8">
          2
        </div>
        <p className="text-sm mt-2">Verify otp</p>
      </div>

      <div className="w-10 h-1 bg-blue-500 mx-2" />

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white max-sm:w-8 max-sm:h-8">
          3
        </div>
        <p className="text-sm mt-2">Reset password</p>
      </div>
    </div>
  );
};

const ResetPassword: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")// Get token from query parameters
    const { mutate, isError, error, isSuccess } = useResetPasswordUser();

    type FormResetPassword = z.infer<typeof resetPasswordSchema>

    const form = useForm<FormResetPassword>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const { control, handleSubmit } = form

    const onSubmit = handleSubmit((values) => {
        if(typeof token === "string") {
            mutate({ token, newPassword: values.password })
        } else {
            console.error("Token is missing");
        }
    })

    return (
        <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
            <StepBar />
          <Card className="p-2 mb-4">
            <DotsThree size={32} weight="bold" />
          </Card>
          <h1 className="font-bold text-3xl mb-1">Reset password</h1>
          <p className="text-dark-grayForgotPasswrod text-lg mb-4">
            Your new password must be at least 8 characters
          </p>
          <Form {...form}>
          <form onSubmit={onSubmit} className="w-full space-y-4">
            <FormField
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} 
            />
            <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} 
            />
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-dark-bgSectionOne rounded-md hover:bg-dark-bgSectionTwo focus:outline-none cursor-pointer mt-6"
              >
              Reset Password
            </button>
            {isError && <p style={{ color: "red" }}>{(error as Error).message}</p>}
            {isSuccess && <p style={{ color: "green" }}>Password reset successfully!</p>}
          </form>
              </Form>
          <div className="mt-4">
          <Link href={'/login'} className="flex items-center gap-1 text-dark-grayForgotPasswrod hover:text-black">
            <ArrowLeft size={26} weight="bold" />
            <p>Back to log in</p>
          </Link>
          </div>
        </div>
        <Toaster />
      </div>
    );
};

export default ResetPassword;
