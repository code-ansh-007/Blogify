import Image from "next/image";
import React from "react";
import { HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import { userAuth } from "../context/AuthContext";

const Banner = () => {
  const { user } = userAuth();
  return (
    <>
      <main className="w-full flex items-center max-w-3xl">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className="border-b border-gray-400 w-full mr-5 outline-none"
        />
        {user ? (
          <Link href="/userDashboard">
            <Image
              src={user?.photoURL}
              width={35}
              height={35}
              alt="User Profile pic"
              className="rounded-full"
            />
          </Link>
        ) : (
          <Link href="/login">
            <HiUserCircle className="text-5xl text-gray-500" />
          </Link>
        )}
      </main>
    </>
  );
};

export default Banner;
