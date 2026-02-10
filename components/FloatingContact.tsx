"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const schema = z.object({
	firstName: z.string().min(1).max(60),
	phone: z
		.string()
		.min(1, "Requis")
		.refine((v) => /^(\+|0)[0-9 .-]{6,}$/.test(v), "Téléphone invalide"),
	message: z.string().min(1).max(500),
	website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function FloatingContact() {
	const [open, setOpen] = useState(false);
	const [sent, setSent] = useState(false);
	const t = useTranslations("floatingContact");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = async (data: FormData) => {
		try {
			await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName: data.firstName,
					email: `${data.phone}@floating.atlas`,
					phone: data.phone,
					company: "—",
					message: data.message,
					projectGoal: "other",
					website: data.website,
				}),
			});
			setSent(true);
			setTimeout(() => {
				setSent(false);
				setOpen(false);
				reset();
			}, 3000);
		} catch {
			// Silently fail
		}
	};

	return (
		<>
			{/* Backdrop */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpen(false)}
						className="fixed inset-0 bg-black/20 z-40 lg:hidden"
					/>
				)}
			</AnimatePresence>

			{/* Panel */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="fixed bottom-20 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-atlas shadow-xl"
					>
						<div className="p-4 space-y-3">
							<div className="flex items-center justify-between">
								<h4 className="font-semibold text-sm text-[var(--color-primary)]">
									{t("title")}
								</h4>
								<button
									type="button"
									onClick={() => setOpen(false)}
									className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
								>
									<X className="size-4" />
								</button>
							</div>

							{sent ? (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-center py-4"
								>
									<p className="text-sm text-[var(--color-accent)] font-medium">
										{t("success")}
									</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
									{/* Honeypot */}
									<input
										type="text"
										{...register("website")}
										className="absolute opacity-0 pointer-events-none h-0"
										tabIndex={-1}
										autoComplete="off"
									/>
									<input
										{...register("firstName")}
										placeholder={t("fields.firstName")}
										className="w-full px-3 py-2 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
									/>
									{errors.firstName && (
										<p className="text-[10px] text-red-500">{errors.firstName.message}</p>
									)}
									<input
										{...register("phone")}
										type="tel"
										placeholder={t("fields.phone")}
										className="w-full px-3 py-2 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
									/>
									{errors.phone && (
										<p className="text-[10px] text-red-500">{errors.phone.message}</p>
									)}
									<textarea
										{...register("message")}
										placeholder={t("fields.message")}
										rows={2}
										className="w-full px-3 py-2 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
									/>
									{errors.message && (
										<p className="text-[10px] text-red-500">{errors.message.message}</p>
									)}
									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full py-2 rounded-[var(--radius)] bg-[var(--color-accent)] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
									>
										<Send className="size-3.5" />
										{isSubmitting ? t("sending") : t("send")}
									</button>
								</form>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Trigger button */}
			<motion.button
				type="button"
				onClick={() => setOpen(!open)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="fixed bottom-4 right-4 sm:right-6 z-40 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
				aria-label="Contact rapide"
			>
				<AnimatePresence mode="wait">
					{open ? (
						<motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
							<X className="size-5" />
						</motion.div>
					) : (
						<motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
							<MessageCircle className="size-5" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</>
	);
}
