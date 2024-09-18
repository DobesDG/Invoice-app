'use client'

import Image from "next/image"
import logo from "../public/assets/logo.svg"
import sun from "../public/assets/icon-sun.svg"
import moon from "../public/assets/icon-moon.svg"
import { useState } from "react"

export const Header = () => {

const [dark,setDark] = useState(true)

    return(
        <header className="flex flex-col justify-between bg-light-purple h-screen w-[6.4rem]">
            <div className="flex flex-col justify-center items-center h-[103px] w-full">
                <Image
                    src={logo}
                    width={28}
                    height={26}
                    alt=""
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center h-[103px] w-full">
                    <button onClick={() => setDark(prevValue => !prevValue)}>
                        {dark ? (<Image src={sun} width={20} height={20} alt=""/>) : 
                        (<Image src={moon} width={20} height={20} alt=""/>)}
                    </button>
                </div>
                <div>

                </div>
            </div>
    </header>
    )
}