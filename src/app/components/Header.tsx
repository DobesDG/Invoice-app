"use client";

import Image from "next/image";
import logo from "../public/assets/logo.svg";
import sun from "../public/assets/icon-sun.svg";
import moon from "../public/assets/icon-moon.svg";
import avatar from "../public/assets/image-avatar.jpg";

interface HeaderProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ dark, setDark }) => {
  return (
    <header className="flex flex-col justify-between bg-light-purple h-screen w-[6.4375rem] rounded-r-[25px] fixed max-xl:flex-row max-xl:w-screen max-xl:h-[72px] max-xl:rounded-none z-50">
      <div className="group relative overflow-hidden cursor-pointer h-[103px] w-full bg-violet flex items-center justify-center rounded-r-3xl max-xl:h-full max-xl:w-[72px] max-md:rounded-r-[20px]">
        <Image
          src={logo}
          alt="Logo"
          width={28}
          height={26}
          className="relative z-10"
        />
        <div className="absolute top-1/2 left-0 h-[103px] w-full bg-light-violet rounded-l-[20px] c z-0 group-hover:top-[10%] transition-all duration-200 ease-in-out" />
      </div>
      <div className="flex flex-col justify-center items-center max-xl:flex-row">
        <div className="flex flex-col justify-center items-center h-[88px] w-full border-b border-gray-600 max-xl:flex-row max-xl:h-full max-xl:w-[96px] max-xl:border-b-0 max-xl:border-r max-md:w-[80px] max-md:mt-[2px]">
          <button onClick={() => setDark((prevValue) => !prevValue)}>
            {dark ? (
              <Image src={sun} width={20} height={20} alt="" />
            ) : (
              <Image src={moon} width={20} height={20} alt="" />
            )}
          </button>
        </div>
        <div className="flex flex-col justify-center items-center h-[88px] w-full max-xl:flex-row max-xl:h-full max-xl:w-[96px] max-md:w-[80px]">
          <button className="hover:border-solid hover:border-4 hover:border-purple-700 rounded-3xl">
            <Image
              className="rounded-2xl"
              src={avatar}
              width={32}
              height={32}
              alt=""
            />
          </button>
        </div>
      </div>
    </header>
  );
};
