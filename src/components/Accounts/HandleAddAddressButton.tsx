"use client";

import { ArrowUUpLeft, TrashSimple, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { addressShema } from "../../../schema/useAddressSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Flag from "react-world-flags";
import { useAddress } from "@/features/profile/useAddress";
import axios from "axios";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { useCreateAddress, useFetchProfileUser } from "@/features";

interface Address {
  id: string;
  nama: string
}

const HandleAddAddressButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: profileSettings } = useFetchProfileUser();

  console.log('profile', profileSettings)

  const { mutate } = useCreateAddress();

  const { data: provinces } = useAddress();

  const [selectedProvince, setSelectedProvince] = useState<Address | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [subDistricts, setSubDistricts] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<Address | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<Address | null>(
    null
  )

  useEffect(() => {
    const fetchCities = async (provinceId: string) => {
      console.log(provinceId);
      try {
        const response = await axios.get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinceId}`
        );
        setCities(response.data.kota_kabupaten || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    if (selectedProvince) {
      fetchCities(selectedProvince.id);
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    const fetchDistrict = async (cityId: string) => {
      try {
        const response = await axios.get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${cityId}`
        );
        setDistricts(response.data.kecamatan || []);
      } catch (error) {
        console.error("Error fetching district", error);
      }
    };
    if (selectedCity) {
      fetchDistrict(selectedCity.id);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    const fetchSubDistricts = async (districtId: string) => {
      try {
        const response = await axios.get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${districtId}`
        );
        setSubDistricts(response.data.kelurahan || []);
      } catch (error) {
        console.error("Error fetching subdistrict:", error);
      }
    };

    if (selectedDistricts) {
      fetchSubDistricts(selectedDistricts.id);
    } else {
      setSubDistricts([]);
    }
  }, [selectedDistricts]);

  type FormAddress = z.infer<typeof addressShema>;

  const form = useForm<FormAddress>({
    resolver: zodResolver(addressShema),
  });

  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    const submitAddres = {
      ...values,
      userId: profileSettings?.id,
    };
    mutate(submitAddres, {
      onSuccess: (data) => {
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        toast.success("sucess add address!");
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  });

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-3 p-2 bg-blue-700 hover:bg-blue-600 font-bold rounded-lg text-white"
      >
        + New address
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
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative dark:bg-gray-800 bg-white p-3 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto max-sm:h-full">
                <div className="relative flex items-center justify-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute left-0 text-gray-500 hover:text-gray-700 transition dark:text-gray-100"
                  >
                    <ArrowUUpLeft size={32} weight="bold" />
                  </button>
                  <h1 className="text-center font-semibold text-3xl">
                    Add new address
                  </h1>
                </div>
                <hr className="mt-2 border" />
                <div className="p-2">
                  <Form {...form}>
                    <form onSubmit={onSubmit}>
                      <FormField
                        control={control}
                        name="country"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Indonesia">
                                    <div className="flex items-center gap-2">
                                      <Flag
                                        code="ID"
                                        style={{ width: "20px" }}
                                      />
                                      <span className="text-left">
                                        Indonesia
                                      </span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <FormField
                          control={control}
                          name="province"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>Province</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    console.log(
                                      "Selected Province Value:",
                                      value
                                    );
                                    if (value) {
                                      try {
                                        const selectedProvince =
                                          JSON.parse(value);
                                        field.onChange(selectedProvince.nama);
                                        setSelectedProvince(selectedProvince);
                                      } catch (error) {
                                        console.error(
                                          "Failed to parse JSON:",
                                          error
                                        );
                                      }
                                    } else {
                                      console.error(
                                        "Value is empty or undefined:",
                                        value
                                      );
                                    }
                                  }}
                                  value={JSON.stringify({
                                    id: field.value,
                                    nama: provinces?.find(
                                      (prov: any) => prov.id === field.value
                                    )?.nama,
                                  })}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select Province">
                                        {selectedProvince?.nama ||
                                          "Select Province"}
                                      </SelectValue>
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {provinces?.map((province: any) => (
                                      <SelectItem
                                        key={province.id}
                                        value={JSON.stringify({
                                          id: province.id,
                                          nama: province.nama,
                                        })}
                                      >
                                        {province.nama}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={control}
                          name="city"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    if (value) {
                                      try {
                                        const selectedCity = JSON.parse(value);
                                        field.onChange(selectedCity.nama);
                                        setSelectedCity(selectedCity);
                                      } catch (error) {
                                        console.error(
                                          "Failed to parse JSON:",
                                          error
                                        );
                                      }
                                    } else {
                                      console.error(
                                        "Value is empty or undefined:",
                                        value
                                      );
                                    }
                                  }}
                                  value={JSON.stringify({
                                    id: field.value,
                                    nama: cities?.find(
                                      (city: any) => city.id === field.value
                                    )?.nama,
                                  })}
                                  disabled={!selectedProvince}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select City">
                                        {selectedCity?.nama || "Select City"}
                                      </SelectValue>
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {cities?.map((city) => (
                                      <SelectItem
                                        key={city.id}
                                        value={JSON.stringify({
                                          id: city.id,
                                          nama: city.nama,
                                        })}
                                      >
                                        {city.nama}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <FormField
                          control={control}
                          name="district"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>District</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    if (value) {
                                      try {
                                        const selectedDistrict =
                                          JSON.parse(value);
                                        field.onChange(selectedDistrict.nama);
                                        setSelectedDistricts(selectedDistrict);
                                      } catch (error) {
                                        console.error(
                                          "Failed to parse JSON:",
                                          error
                                        );
                                      }
                                    } else {
                                      console.error(
                                        "Value is empty or undefined:",
                                        value
                                      );
                                    }
                                  }}
                                  value={JSON.stringify({
                                    id: field.value,
                                    nama: districts?.find(
                                      (district: any) =>
                                        district.id === field.value
                                    )?.nama,
                                  })}
                                  disabled={!selectedCity}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select district">
                                        {selectedDistricts?.nama ||
                                          "Select District"}
                                      </SelectValue>
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {districts?.map((district: any) => (
                                      <SelectItem
                                        key={district.id}
                                        value={JSON.stringify({
                                          id: district.id,
                                          nama: district.nama,
                                        })}
                                      >
                                        {district.nama}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={control}
                          name="subdistrict"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>Sub District</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={!selectedDistricts}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="select subdistrict">
                                        {field.value || "Select subdistrict"}
                                      </SelectValue>
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {subDistricts?.map((subDistrict) => (
                                      <SelectItem
                                        key={subDistrict.id}
                                        value={subDistrict.nama}
                                      >
                                        {subDistrict.nama}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                      <FormField
                        control={control}
                        name="zipCode"
                        render={({ field }) => {
                          return (
                            <FormItem className="mt-3">
                              <FormLabel>Zipcode</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="enter your zipcode"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={control}
                        name="street"
                        render={({ field }) => {
                          return (
                            <FormItem className="mt-3">
                              <FormLabel>Street</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="enter your street"
                                />
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
                            <FormItem className="mt-3">
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="enter address description"
                                  className="dark:bg-transparent dark:border-gray-600"
                                  rows={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-dark-bgSectionOne rounded-md hover:bg-dark-bgSectionTwo focus:outline-none cursor-pointer mt-6"
                      >
                        Add Address
                      </button>
                    </form>
                  </Form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Toaster />
    </>
  );
};

export default HandleAddAddressButton;