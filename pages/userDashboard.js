import React, { useEffect } from "react";
import { userAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import shape from "../images/shape.png";
import Image from "next/image";

const UserDashboard = () => {
  const router = useRouter();
  const { logOut, user } = userAuth();
  useEffect(() => {
    if (user) {
      return;
    }
    router.push("/");
  }, [user]);
  return (
    <>
      <main className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <div className="relative flex flex-col items-center">
          <Image src={shape} width={300} />
          <img
            src={user?.photoURL}
            alt="user pic"
            className="rounded-full absolute top-[90px] right-[105px]"
          />
        </div>
        <span>{user?.email}</span>
        <button
          onClick={logOut}
          className="bg-gray-400 text-white px-2  py-1 active:scale-105 transition transform duration-150 rounded-md"
        >
          Logout
        </button>
      </main>
    </>
  );
};

export default UserDashboard;
