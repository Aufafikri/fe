"use client";

import { useFetchProfileUser, useUpdateNameProfile } from "@/features";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
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
import { editProfileNameSchema } from "../../../schema/useAccountSchema";

type FormNameProfile = z.infer<typeof editProfileNameSchema>;

const HandleEditNameButton = () => {
  const { data: profileSettings } = useFetchProfileUser();
  const { mutate: updateNameProfile } = useUpdateNameProfile();

  const [isEditingName, setIsEditingName] = useState(false);

  const form = useForm<FormNameProfile>({
    resolver: zodResolver(editProfileNameSchema),
    defaultValues: {
      name: profileSettings?.name || "",
    },
  });

  const { handleSubmit, control, reset } = form;

  useEffect(() => {
    if (profileSettings?.name) {
      reset({ name: profileSettings.name });
    }
  }, [profileSettings, reset]);


  const onSubmit = handleSubmit((values) => {
    if (!profileSettings?.id) {
      toast.error("User ID is not available.");
      return;
    }

    updateNameProfile(
      { userId: profileSettings.id, name: values.name },
      {
        onSuccess: () => {
          toast.success("Name updated successfully");
          setIsEditingName(false)
        },
        onError: () => {
          toast.error("Failed to update name.");
        },
      }
    );
  });

  const handleCancelEdit = () => {
    reset({ name: profileSettings?.name || "" })
    setIsEditingName(false);
  };

  return (
    <>
      <h1 className="font-semibold mt-3">Name</h1>
      <div className="flex justify-between items-center gap-2">
        {isEditingName ? (
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex gap-2 w-full items-start">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} className="w-full mt-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                onClick={handleCancelEdit}
                className="p-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition duration-200 mt-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition duration-200 mt-1"
              >
                Save
              </button>
            </form>
          </Form>
        ) : (
          <>
            <p className="capitalize mt-2"> {profileSettings?.name} </p>
            <button
              onClick={() => setIsEditingName(true)}
              className="p-2 bg-blue-600 rounded-lg px-6 font-semibold hover:bg-blue-500 text-white"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default HandleEditNameButton;
