import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const BlogDetail = () => {
  const router = useRouter();
  const { title, content, username, profileImg, image, timestamp } =
    router.query;
  return (
    <>
      <main className="flex flex-col mt-10 items-start">
        <span className="flex items-center space-x-1">
          <Image
            src={profileImg}
            width={30}
            height={30}
            className="rounded-full "
            alt="profile pic"
          />
          <span className="font-semibold">{username}</span>
        </span>
        <div className="mt-5 flex flex-col space-y-3">
          <img src={image} alt="pic" className="rounded-md md:max-w-3xl" />
          <div className="pl-3 flex flex-col items-start space-y-1">
            <span className="text-2xl font-semibold text-gray-700">
              {title}
            </span>
            <span className="md:max-w-3xl">{content}</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogDetail;
