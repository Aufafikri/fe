"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchAllUsers } from "@/features/admin/useFetchAllUsers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface UsersProps {
  id: string;
  email: string;
  role: string;
}

const UserPage = () => {
  const { data, isLoading, error } = useFetchAllUsers();
  const router = useRouter();

  console.log(data)
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (error) {
      console.error("Failed to fetch users:", error);
      router.push("/error/permisions");
      return;
    }

    const hasAdmin = data?.some((user: UsersProps) => user.role === "ADMIN");

    if (!hasAdmin) {
      router.push("/error/permisions");
    }
  }, [data, isLoading, error, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.some((user: UsersProps) => user.role === "ADMIN")) {
    return;
  }

  const filteredUsers = data?.filter((user: UsersProps) => user.role === "USER");

  if (!filteredUsers || filteredUsers.length === 0) {
    return <div>No users found</div>;
  }


  const isAdmin = data?.some((user) => user.role === "ADMIN");

  return (
    <div className="flex">
      <aside className="text-white h-screen w-1/5 p-4 shadow-md shadow-stone-500">
        <h1 className="text-4xl p-4 font-bold font-sans max-sm:hidden">
          EvstPanel
        </h1>
        <div className="mt-10">
          <div className="mb-3">
            <Link href="/">
              <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-800 rounded">
                Dashboard
              </button>
            </Link>
          </div>
          {isAdmin && (
            <div className="mb-3">
              <Link href="/user">
                <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-800 rounded bg-gray-800">
                  Users
                </button>
              </Link>
            </div>
          )}
          <div className="mb-3">
            <Link href="/tambah">
              <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-800 rounded">
                Tambah Product
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            {/* <Logout /> */}
          </div>
        </div>
      </aside>
      <div className="w-full p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Email Verified</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell> {user.name} </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell> {user.isVerified ? "Verified" : "Not Verified"} </TableCell>
                <TableCell>
                  {user.Merchant ? (
                    <span> {user.Merchant.storeName} </span>
                  ): (
                    <span> not created yet </span>
                  )}
                </TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPage;
