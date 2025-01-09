import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        router.push("/loginSuccess");
      }
    };

    fetchUserDetails();
  }, [router]);

  return (
    <>
      <Head>
        <title>Scriptorium</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Scriptorium
            </h1>
            <div className="flex justify-center space-x-4">
              <Link href="/login">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                  Login
                </button>
              </Link>

              <Link href="/signup">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
