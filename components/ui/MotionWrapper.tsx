"use client";

import { motion, useInView, type Transition } from "framer-motion";
import { useRef } from "react";

const VARIANT_MAP = {
	"fade-up": {
		hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
		visible: { opacity: 1, y: 0, filter: "blur(0px)" },
	},
	"fade-in": {
		hidden: { opacity: 0, filter: "blur(6px)" },
		visible: { opacity: 1, filter: "blur(0px)" },
	},
	"zoom-in": {
		hidden: { opacity: 0, scale: 0.92, filter: "blur(4px)" },
		visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
	},
	"slide-right": {
		hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
		visible: { opacity: 1, x: 0, filter: "blur(0px)" },
	},
	"slide-left": {
		hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
		visible: { opacity: 1, x: 0, filter: "blur(0px)" },
	},
	"scale-up": {
		hidden: { opacity: 0, scale: 0.85, y: 20 },
		visible: { opacity: 1, scale: 1, y: 0 },
	},
	"reveal-up": {
		hidden: { opacity: 0, y: 60, rotateX: 8 },
		visible: { opacity: 1, y: 0, rotateX: 0 },
	},
} as const;

type VariantKey = keyof typeof VARIANT_MAP;

interface MotionWrapperProps {
	children: React.ReactNode;
	className?: string;
	variant?: VariantKey;
	delay?: number;
	duration?: number;
	amount?: number | "some" | "all";
	once?: boolean;
}

export function MotionWrapper({
	children,
	className = "",
	variant = "fade-up",
	delay = 0,
	duration = 0.7,
	amount = 0.2,
	once = true,
}: MotionWrapperProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount, once });

	const transition: Transition = {
		duration,
		delay,
		ease: [0.22, 1, 0.36, 1], // custom cubic-bezier — smooth decel
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={VARIANT_MAP[variant]}
			transition={transition}
			className={className}
		>
			{children}
		</motion.div>
	);
}
