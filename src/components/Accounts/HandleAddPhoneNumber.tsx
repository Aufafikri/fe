"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { z } from 'zod'
import { phoneNumberSchema } from "../../../schema/useAddPhoneNumber";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useUpdatePhoneNumber } from '@/features'
import { useFetchProfileUser } from "@/features";
import toast from "react-hot-toast";

const HandleAddPhoneNumber = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: updatePhoneNumber } = useUpdatePhoneNumber()
  const { data: profile } = useFetchProfileUser()

  const profileId = profile?.id

  console.log(profileId)

  type AddPhoneNumber = z.infer<typeof phoneNumberSchema>

  const form = useForm<AddPhoneNumber>({
    resolver: zodResolver(phoneNumberSchema)
  })

  const { control, handleSubmit } = form

  const onSubmit = handleSubmit((values) => {
    const phoneNumber = Number(values.phoneNumber); // Convert to number
  if (isNaN(phoneNumber)) {
    console.error("Invalid phone number");
    return;
  }
  console.log({ phoneNumber });
    updatePhoneNumber({
      userId: profileId,
      phoneNumber: phoneNumber
    }, {
      onSuccess: () => {
        toast.success("success add phone number!")
        window.location.reload()
      }
    })
  })

  return (
    <>
      <h1 className="mt-3 font-semibold">Phone Number</h1>
      <button className="border mt-2 p-1" onClick={() => setIsModalOpen(true)}>
        add phone number
      </button>
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative dark:bg-gray-800 bg-white p-3 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto max-sm:h-full">
                <div className="p-2 relative flex items-center justify-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute right-0 text-xl"
                  >
                    x
                  </button>
                </div>
                  <Form {...form}>
                    <form onSubmit={onSubmit}>
                      <FormField
                      control={control}
                      name="phoneNumber"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                      />
                      <button type="submit" className="flex ml-auto bg-gray-900 p-2 mt-4">Add Phone Number</button>
                    </form>
                  </Form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HandleAddPhoneNumber;
