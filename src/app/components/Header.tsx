'use client'

import Image from "next/image"
import logo from "../public/assets/logo.svg"
import sun from "../public/assets/icon-sun.svg"
import moon from "../public/assets/icon-moon.svg"
import avatar from '../public/assets/image-avatar.jpg'
import { useState } from "react"

export const Header: React.FC = () => {

const [dark,setDark] = useState<Boolean>(true)

    return(
        <header className="flex flex-col justify-between bg-light-purple h-screen w-[6.4375rem] rounded-r-3xl">
            <div className="flex flex-col justify-center items-center h-[103px] w-full bg-violet rounded-r-3xl">
                <Image
                    src={logo}
                    width={28}
                    height={26}
                    alt=""
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center h-[88px] w-full border-b border-gray-600">
                    <button onClick={() => setDark(prevValue => !prevValue)}>
                        {dark ? (<Image src={sun} width={20} height={20} alt=""/>) : 
                        (<Image src={moon} width={20} height={20} alt=""/>)}
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center h-[88px] w-full">
                    <button className="hover:border-solid hover:border-4 hover:border-purple-700 rounded-3xl">
                        <Image className="rounded-2xl" src={avatar} width={32} height={32} alt=""/>
                    </button>
                </div>
            </div>
    </header>
    )
}