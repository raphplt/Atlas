"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef } from "react";

interface MotionWrapperProps {
	children: React.ReactNode;
	className?: string;
	variant?: "fade-up" | "fade-in" | "zoom-in" | "slide-right";
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
	duration = 0.5,
	amount = 0.3,
    once = true,
}: MotionWrapperProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { amount, once });

	const variants = {
		"fade-up": {
			hidden: { opacity: 0, y: 30 },
			visible: { opacity: 1, y: 0 },
		},
		"fade-in": {
			hidden: { opacity: 0 },
			visible: { opacity: 1 },
		},
		"zoom-in": {
			hidden: { opacity: 0, scale: 0.95 },
			visible: { opacity: 1, scale: 1 },
		},
        "slide-right": {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
        }
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={variants[variant]}
			transition={{ duration, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
