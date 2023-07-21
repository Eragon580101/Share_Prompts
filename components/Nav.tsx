"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { getUserId } from "@utils/getUserInfo";

interface Provider{
  google:{
    name:string,
    id:string,
    type:string,
    signinUrl:string,
    callbackUrl:string,
  }
}



const Nav: React.FC = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState<Provider | null>(null);

  useEffect(() => {
    const getProviders_ = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    getProviders_();
    console.log("\n\n\n\nsession from Nav", session)
  }, []);

  // if(status === "authenticated"){
  //  ( async()=>{await getUserId(session?.user?.email as string)})()
  // }

  return (
    <nav className="flex-between mb-16 pt-3 w-full">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={()=>signOut()} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image as string}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full object-contain"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id) }
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
                

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image as string}
              alt="logo"
              width={30}
              height={30}
              className="object-contain"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
