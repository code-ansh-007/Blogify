import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <main className="flex items-center mt-4 space-x-4 justify-center p-2 border-t border-[#dbdbdb]">
      <Link
        href="https://www.linkedin.com/in/ansh-pradhan-2a963818a/"
        target={"_blank"}
      >
        <i className="text-gray-500 fa-brands fa-linkedin"></i>{" "}
      </Link>
      <Link href="https://github.com/code-ansh-007" target={"_blank"}>
        <i className="text-gray-500 fa-brands fa-github"></i>
      </Link>
      <Link href="https://www.instagram.com/slice_of_ansh/" target={"_blank"}>
        <i className="text-gray-500 fa-brands fa-instagram"></i>{" "}
      </Link>
    </main>
  );
}

export default Footer;
