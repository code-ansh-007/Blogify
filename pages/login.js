import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import brand from "../images/Blogify.png";
import glogo from "../images/glogo.png";
import { userAuth } from "../context/AuthContext";

function Login() {
  const router = useRouter();
  const { signIn } = userAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  const { user } = userAuth();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <div className="h-full flex items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-10">
          <span onClick={() => router.push("/")}>
            <Image src={brand} width={300} />
          </span>
          <div
            onClick={handleSignIn}
            className="flex items-center space-x-1 active:scale-105 transition transform duration-150"
          >
            <button className=" text-gray-500 border-b border-gray-400 font-semibold  outline-none p-2 py-1 m-2">
              Sign In with Google
            </button>
            <Image src={glogo} width={30} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
