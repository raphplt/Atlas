import clsx from "clsx";
import Image from "next/image"
import React from "react";

type LogoProps = {
	size?: number;
	forceDark?: boolean;
	forceLight?: boolean;

};

const Logo = ({ size = 24, forceDark = false, forceLight = false }: LogoProps) => {
	return (
        <>
		    <Image 
                src="/images/Logo.png" 
                alt="Logo" 
                width={size} 
                height={size} 
                className={clsx(
                    forceDark ? "hidden" : forceLight ? "block" : "block dark:hidden"
                )} 
            />
            
            <Image 
                src="/images/Logo-White.png" 
                alt="Logo" 
                width={size} 
                height={size} 
                className={clsx(
                    forceLight ? "hidden" : forceDark ? "block" : "hidden dark:block"
                )} 
            />
        </>
	);
};

export default Logo;
