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
	const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
	const buttonRef = React.useRef<HTMLButtonElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (variant === "secondary" && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
			setMousePosition({ x, y });
		}
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
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
		
		setRipples(prev => [...prev, newRipple]);
		
		// Remove ripple after animation
		setTimeout(() => {
			setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
		}, 600);
		
		onClick?.(e);
	};

	const baseClasses = "relative overflow-hidden font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
	
	const variantClasses = {
		primary: cn(
			"btn-primary-enhanced",
			"h-14 px-10 text-base",
			"bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white",
			"shadow-lg hover:shadow-xl",
			"border border-transparent"
		),
		secondary: cn(
			"btn-secondary-enhanced",
			"h-14 px-10 text-base",
			"text-[var(--color-fg)] hover:text-[var(--color-accent)]",
			"shadow-sm hover:shadow-lg"
		),
	};

	return (
		<button
			ref={buttonRef}
			className={cn(baseClasses, variantClasses[variant], className)}
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={variant === "secondary" ? {
				transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
			} : undefined}
			{...props}
		>
			{/* Shimmer effect for primary */}
			{variant === "primary" && (
				<div className="shimmer" />
			)}
			
			{/* Magnetic background for secondary */}
			{variant === "secondary" && (
				<>
					<div className="magnetic-bg" />
					{/* Floating dots */}
					<div className="floating-dot" />
					<div className="floating-dot" />
					<div className="floating-dot" />
					<div className="floating-dot" />
				</>
			)}
			
			{/* Ripple effects */}
			{ripples.map(ripple => (
				<div
					key={ripple.id}
					className="ripple"
					style={{
						left: ripple.x,
						top: ripple.y,
						width: 0,
						height: 0,
					}}
				/>
			))}
			
			{/* Button content */}
			<span className="relative z-10">
				{children}
			</span>
		</button>
	);
}

// Enhanced Link component for anchor tags
interface EnhancedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
	const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
	const buttonRef = React.useRef<HTMLAnchorElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (variant === "secondary" && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
			setMousePosition({ x, y });
		}
	};

	const handleMouseLeave = () => {
		setMousePosition({ x: 0, y: 0 });
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
		
		setRipples(prev => [...prev, newRipple]);
		
		// Remove ripple after animation
		setTimeout(() => {
			setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
		}, 600);
		
		onClick?.(e);
	};

	const baseClasses = "relative overflow-hidden font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 inline-flex items-center justify-center rounded-md";
	
	const variantClasses = {
		primary: cn(
			"btn-primary-enhanced",
			"h-14 px-10 text-base",
			"bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white",
			"shadow-lg hover:shadow-xl",
			"border border-transparent"
		),
		secondary: cn(
			"btn-secondary-enhanced",
			"h-14 px-10 text-base",
			"text-[var(--color-fg)] hover:text-[var(--color-accent)]",
			"shadow-sm hover:shadow-lg"
		),
	};

	return (
		<a
			ref={buttonRef}
			className={cn(baseClasses, variantClasses[variant], className)}
			onClick={handleClick}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={variant === "secondary" ? {
				transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
			} : undefined}
			{...props}
		>
			{/* Shimmer effect for primary */}
			{variant === "primary" && (
				<div className="shimmer" />
			)}
			
			{/* Magnetic background for secondary */}
			{variant === "secondary" && (
				<>
					<div className="magnetic-bg" />
					{/* Floating dots */}
					<div className="floating-dot" />
					<div className="floating-dot" />
					<div className="floating-dot" />
					<div className="floating-dot" />
				</>
			)}
			
			{/* Ripple effects */}
			{ripples.map(ripple => (
				<div
					key={ripple.id}
					className="ripple"
					style={{
						left: ripple.x,
						top: ripple.y,
						width: 0,
						height: 0,
					}}
				/>
			))}
			
			{/* Button content */}
			<span className="relative z-10">
				{children}
			</span>
		</a>
	);
}
