import clsx from "clsx";
import React from "react";

type LogoProps = {
	size?: number;
};

const Logo = ({ size = 5 }: LogoProps) => {
	return (
		<span
			className={clsx(
				"inline-block rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#5ba8ff,40%,#f7a8a1,80%,#ffd67b)] ring-1 ring-black/5 dark:ring-white/10",
				`h-${size} w-${size}`
			)}
		/>
	);
};

export default Logo;
