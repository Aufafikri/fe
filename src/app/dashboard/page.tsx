"use client"

import { useFetchAllUsers } from '@/features/admin/useFetchAllUsers'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
    const {data: users, isLoading, isError} = useFetchAllUsers()

    console.log(users)
    
    const isAdmin = users?.some(user => user.role === 'ADMIN')

    console.log("Data Users:", users)
    console.log("Apakah ada Admin?", isAdmin)

    return (
        <div>
            <aside className="text-white h-screen w-1/5 p-4 shadow-md shadow-stone-500">
                <h1 className="text-4xl p-4 font-bold font-sans max-sm:hidden">
                    EvstPanel
                </h1>
                <div className="mt-10">
                    <div className="mb-3">
                        <Link href="/">
                            <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-700 rounded">
                                Dashboard
                            </button>
                        </Link>
                    </div>
                    {isAdmin && (
                    <div className="mb-3">
                        <Link href="/user">
                            <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-700 rounded">
                                Users
                            </button>
                        </Link>
                    </div>
                    )}
                    <div className="mb-3">
                        <Link href="/tambah">
                            <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-700 rounded">
                                Tambah Product
                            </button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        {/* <Logout /> */}
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default DashboardPage
