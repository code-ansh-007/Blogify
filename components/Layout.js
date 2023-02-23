import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col h-screen">
        <Header />
        <section className="flex-grow">{children}</section>
        <Footer />
      </main>
    </>
  );
};
export default Layout;
