"use client";

import React, { useState } from "react";
import { z } from "zod";
import { createProductSchema } from "../../../../schema/useProductSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateProduct,
  useFetchMerchantProfile,
  useFetchProfileUser,
} from "@/features";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "../../globals.css";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Warning, X } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";

const AddProductMerchantPage = () => {
  const { mutate } = useCreateProduct();

  const [selectedImages, setSelectedImages] = useState<File[]>([]); 

  const { data: profileUser } = useFetchProfileUser();
  const userId = profileUser?.id;
  const { data: profileMerchant } = useFetchMerchantProfile(userId);
  const merchantId = profileMerchant?.id;

  type FormProduct = z.infer<typeof createProductSchema>;

  const form = useForm<FormProduct>({
    resolver: zodResolver(createProductSchema),
    // defaultValues: { image: [] },
  });

  const { control, handleSubmit, watch } = form;

  const onSubmit = handleSubmit((values) => {
    console.log('values', values)
    const formData = new FormData()
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("stock", values.stock);

    values.image.forEach((file: File, index: number) => {
      console.log(file)
      formData.append(`productImages[${index}]`, file);
    });
  
    formData.append("category.name", values.category.name);
    formData.append("category.label", values.category.label || '');
    formData.append("category.type", values.category.type || '');
    formData.append("category.size", values.category.size || '');
    formData.append("category.description", values.category.description || '');
  
    mutate({ body: formData, merchantId });
  });

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      console.log("Files received:", files); 
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);

      const newProgressArray = Array.from(files).map(() => 0);
      setUploadProgress((prevProgress) => [
        ...prevProgress,
        ...newProgressArray,
      ]);

      newProgressArray.forEach((_, index) => {
        simulateUploadProgress(previewImages.length + index);
      });
    }
  };

  const simulateUploadProgress = (index: number) => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        if (newProgress[index] < 100) {
          newProgress[index] += 10; // Tambah progress 10%
        } else {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 500); // Update setiap 0.5 detik
  };

  const handleDeleteImage = (index: number) => {
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setUploadProgress((prevProgress) =>
      prevProgress.filter((_, i) => i !== index)
    );
  };

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const category = watch("category.name");

  return (
    <div className="flex justify-center items-center p-4">
      <div className="pt-4 w-[600px] pb-4">
        <h1 className="text-2xl font-bold mb-8">Add Products</h1>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="stock"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        id="upload"
                        className="hidden"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          handleImageUpload(e.target.files);
                          const files = Array.from(e.target.files)
                          form.setValue('image', files);
                          console.log(files);
                        }}
                      />
                    </FormControl>
                    <label
                      htmlFor="upload"
                      className="flex items-center p-2 bg-blue-600 justify-center text-white font-bold gap-2 hover:bg-blue-500 cursor-pointer duration-200 transition rounded-lg"
                    >
                      Product Image
                    </label>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="space-y-4">
              {previewImages.map((src, index) => (
                <div key={index} className="relative flex items-center gap-4">
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Progress
                      value={uploadProgress[index]}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {uploadProgress[index]}% uploaded
                    </p>
                  </div>
                  {uploadProgress[index] === 100 && (
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="mb-5"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <FormField
              control={control}
              name="category.name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Cetegories</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCategory(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Product Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Clothes">Clothes</SelectItem>
                        <SelectItem value="Ball">Ball</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {selectedCategory && (
              <>
                <FormField
                  control={control}
                  name="category.label" //sepatu | bola
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="category.type"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {selectedCategory !== "Ball" &&
                  selectedCategory !== "Sports" && (
                    <>
                      <FormField
                        control={control}
                        name="category.size"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Size</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="S">S</SelectItem>
                                  <SelectItem value="M">M</SelectItem>
                                  <SelectItem value="L">L</SelectItem>
                                  <SelectItem value="XL">XL</SelectItem>
                                  <SelectItem value="XXL">XXL</SelectItem>
                                  <SelectItem value="XXXL">XXXL</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          );
                        }}
                      />
                    </>
                  )}
                <FormField
                  control={control}
                  name="category.description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Category Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <p className="text-sm flex items-center gap-1">
                <Warning size={18} color="#e5ff24" weight="fill" />description category, it's can be empty
                </p>
              </>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProductMerchantPage;