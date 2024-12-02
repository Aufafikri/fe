"use client";

import Navbar from "@/components/Navbar/Index";
import { useFetchProfileUser } from "@/features";
import { MapPinArea, UserCircle } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { addressShema } from "../../../../../schema/useAddressSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Flag from "react-world-flags";
import axios from "axios";
import { useAddress, useCitiesAddress } from "@/features/profile/useAddress";

const DEFAULT_PROFILE_IMAGE =
  "https://www.its.ac.id/it/wp-content/uploads/sites/46/2021/06/blank-profile-picture-973460_1280.png";

const ProfileAddress = () => {
  const { data: profileSettings } = useFetchProfileUser();
  const { data: provinces } = useAddress();

  const [cities, setCities] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [districts, setDistricts] = useState<any[]>([]);
  const [subDistricts, setSubDistricts] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchCities = async (provinceId: string) => {
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
  });

  return (
    <>
      <Navbar />
      <div className="flex max-sm:p-4">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={`${profileSettings?.profileImage || DEFAULT_PROFILE_IMAGE}`}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h1 className="capitalize"> {profileSettings?.name} </h1>
              <p className="text-gray-400 text-sm">
                {" "}
                {profileSettings?.email}{" "}
              </p>
            </div>
          </div>
          <div>
            <Link href={"/settings/your-account"}>
              <button className="w-full flex gap-2 font-bold items-center text-start p-2 rounded-lg mb-2 dark:hover:bg-dark-bgBlue dark:text-dark-textBlue hover:bg-light-bgBlue hover:text-white ">
                <UserCircle size={24} />
                Your Account
              </button>
            </Link>
            <button className="w-full flex gap-2 font-bold items-center text-start p-2 rounded-lg bg-light-bgBlue text-white dark:bg-dark-bgBlue dark:text-dark-textBlue">
              <MapPinArea size={24} />
              Address
            </button>
          </div>
        </div>
        <div className="p-4">
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
                              <Flag code="ID" style={{ width: "20px" }} />
                              <span className="text-left">Indonesia</span>
                            </div>
                          </SelectItem>
                          {/* <SelectItem value="United States">
                            <div className="flex items-center gap-2">
                              <Flag code="USA" style={{ width: "20px" }} />
                              <span className="text-left">United States</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Malaysia">
                            <div className="flex items-center gap-2">
                              <Flag code="MY" style={{ width: "20px" }} />
                              <span className="text-left">Malaysia</span>
                            </div>
                          </SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />
              <div className="flex items-center gap-4">
                <FormField
                  control={control}
                  name="province"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const selectedProvince = JSON.parse(value);
                            field.onChange(selectedProvince.id);
                            setSelectedProvince(selectedProvince);
                          }}
                          value={JSON.stringify({
                            id: field.value,
                            nama: provinces?.find(
                              (prov: any) => prov.id === field.value
                            )?.nama,
                          })}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Province">
                                {field.value
                                  ? provinces?.find(
                                      (prov: any) => prov.id === field.value
                                    )?.nama || "Select Province"
                                  : "Select Province"}
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
                            const selectedCity = JSON.parse(value);
                            field.onChange(selectedCity.id);
                            setSelectedCity(selectedCity);
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
                                {field.value
                                  ? cities?.find(
                                      (cty: any) => cty.id === field.value
                                    )?.nama || "Select city"
                                  : "Select city"}
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
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <FormField
                  control={control}
                  name="district"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const selectedDistrict = JSON.parse(value);
                            field.onChange(selectedDistrict.id);
                            setSelectedDistricts(selectedDistrict);
                          }}
                          value={JSON.stringify({
                            id: field.value,
                            nama: districts?.find(
                              (district: any) => district.id === field.value
                            )?.nama,
                          })}
                          disabled={!selectedCity}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select district">
                                {field.value
                                  ? districts?.find(
                                      (district: any) =>
                                        district.id === field.value
                                    )?.nama || "Select district"
                                  : "Select district"}
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
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="subDistrict"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Sub Districts</FormLabel>
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
                      </FormItem>
                    );
                  }}
                />
              </div>
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
    </>
  );
};

export default ProfileAddress;
