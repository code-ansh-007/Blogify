import React from "react";
import brand from "../images/Blogify.png";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <section className="my-3">
      <div className="flex items-center flex-col space-y-2">
        <Link href="/">
          <Image src={brand} width={250} />
        </Link>
        <div className="flex items-center space-x-12">
          <Link
            href="/"
            className="transition transform duration-150 active:scale-105 ease-in-out"
          >
            <span>Home</span>
          </Link>
          <Link
            href="/yourBlogs"
            className="transition transform duration-150 active:scale-105 ease-in-out"
          >
            <span>Your Blogs</span>
          </Link>
          <Link
            href="/create"
            className="transition transform duration-150 active:scale-105 ease-in-out"
          >
            <span>Create</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
