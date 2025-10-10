"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	children: React.ReactNode;
}

export function EnhancedButton({
	variant = "primary",
	className,
	children,
	onClick,
	...props
}: EnhancedButtonProps) {
	const [ripples, setRipples] = React.useState<
		Array<{ id: number; x: number; y: number }>
	>([]);
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = React.useState(false);
	const [isPressed, setIsPressed] = React.useState(false);
	const buttonRef = React.useRef<HTMLButtonElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const x =
				((e.clientX - rect.left) / rect.width - 0.5) *
				(variant === "secondary" ? 8 : 4);
			const y =
				((e.clientY - rect.top) / rect.height - 0.5) *
				(variant === "secondary" ? 8 : 4);
			setMousePosition({ x, y });
		}
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
		setIsHovered(false);
	};

	const handleMouseDown = () => {
		setIsPressed(true);
	};

	const handleMouseUp = () => {
		setIsPressed(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newRipple = {
			id: Date.now(),
			x,
			y,
		};

		setRipples((prev) => [...prev, newRipple]);

		// Remove ripple after animation
		setTimeout(() => {
			setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
		}, 800);

		onClick?.(e);
	};

	const baseClasses = cn(
		"relative overflow-hidden font-medium tracking-wide",
		"transition-all duration-300 ease-out",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
		"disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
		"transform-gpu will-change-transform"
	);

	const variantClasses = {
		primary: cn(
			"btn-primary-sober",
			"h-14 px-8 text-base rounded-xl",
			"bg-[var(--color-accent)]",
			"text-white font-bold shadow-[0_8px_24px_rgba(var(--color-accent-rgb),0.35)]",
			"border-none",
			"hover:bg-[var(--color-accent)]/90 hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.5)] hover:scale-[1.02]"
		),
		secondary: cn(
			"btn-secondary-sober",
			"h-14 px-8 text-base rounded-xl",
			"bg-[var(--color-card)]/90 backdrop-blur-sm",
			"text-[var(--color-fg)] hover:text-[var(--color-accent)] font-semibold",
			"border-2 border-[var(--color-border)]",
			"shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-[var(--color-accent)]/50"
		),
	};

	const buttonStyle = {
		transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) ${isPressed ? "scale(0.99)" : isHovered ? "scale(1.01)" : "scale(1)"}`,
		transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
	};

	return (
		<button
			ref={buttonRef}
			className={cn(baseClasses, variantClasses[variant], className)}
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={buttonStyle}
			{...props}
		>
			{/* Subtle shimmer effect for primary */}
			{variant === "primary" && <div className="sober-shimmer" />}

			{/* Subtle ripple effects */}
			{ripples.map((ripple) => (
				<div
					key={ripple.id}
					className="sober-ripple"
					style={{
						left: ripple.x,
						top: ripple.y,
						width: 0,
						height: 0,
					}}
				/>
			))}

			{/* Button content */}
			<span className="relative z-10">{children}</span>
		</button>
	);
}

// Enhanced Link component for anchor tags
interface EnhancedLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	variant?: "primary" | "secondary";
	children: React.ReactNode;
}

export function EnhancedLink({
	variant = "primary",
	className,
	children,
	onClick,
	...props
}: EnhancedLinkProps) {
	const [ripples, setRipples] = React.useState<
		Array<{ id: number; x: number; y: number }>
	>([]);
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = React.useState(false);
	const [isPressed, setIsPressed] = React.useState(false);
	const buttonRef = React.useRef<HTMLAnchorElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const x =
				((e.clientX - rect.left) / rect.width - 0.5) *
				(variant === "secondary" ? 8 : 4);
			const y =
				((e.clientY - rect.top) / rect.height - 0.5) *
				(variant === "secondary" ? 8 : 4);
			setMousePosition({ x, y });
		}
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
		setIsHovered(false);
	};

	const handleMouseDown = () => {
		setIsPressed(true);
	};

	const handleMouseUp = () => {
		setIsPressed(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newRipple = {
			id: Date.now(),
			x,
			y,
		};

		setRipples((prev) => [...prev, newRipple]);

		// Remove ripple after animation
		setTimeout(() => {
			setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
		}, 800);

		onClick?.(e);
	};

	const baseClasses = cn(
		"relative overflow-hidden font-medium tracking-wide",
		"transition-all duration-300 ease-out",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
		"inline-flex items-center justify-center rounded-xl",
		"transform-gpu will-change-transform"
	);

	const variantClasses = {
		primary: cn(
			"btn-primary-sober",
			"h-14 px-8 text-base rounded-xl",
			"bg-[var(--color-accent)]",
			"text-white font-bold shadow-[0_8px_24px_rgba(var(--color-accent-rgb),0.35)]",
			"border-none",
			"hover:bg-[var(--color-accent)]/90 hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.5)] hover:scale-[1.02]"
		),
		secondary: cn(
			"btn-secondary-sober",
			"h-14 px-8 text-base rounded-xl",
			"bg-[var(--color-card)]/90 backdrop-blur-sm",
			"text-[var(--color-fg)] hover:text-[var(--color-accent)] font-semibold",
			"border-2 border-[var(--color-border)]",
			"shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-[var(--color-accent)]/50"
		),
	};

	const buttonStyle = {
		transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) ${isPressed ? "scale(0.99)" : isHovered ? "scale(1.01)" : "scale(1)"}`,
		transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
	};

	return (
		<a
			ref={buttonRef}
			className={cn(baseClasses, variantClasses[variant], className)}
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={buttonStyle}
			{...props}
		>
			{/* Subtle shimmer effect for primary */}
			{variant === "primary" && <div className="sober-shimmer" />}

			{/* Subtle ripple effects */}
			{ripples.map((ripple) => (
				<div
					key={ripple.id}
					className="sober-ripple"
					style={{
						left: ripple.x,
						top: ripple.y,
						width: 0,
						height: 0,
					}}
				/>
			))}

			{/* Button content */}
			<span className="relative z-10">{children}</span>
		</a>
	);
}
