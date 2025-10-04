import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { EnhancedLink } from "@/components/ui/enhanced-button";
import { Code, Zap, Heart, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function About() {
	const t = useTranslations("about");

	const expertise = [
		{
			icon: Code,
			title: t("expertise.technical.title"),
			description: t("expertise.technical.description"),
		},
		{
			icon: Zap,
			title: t("expertise.conversion.title"),
			description: t("expertise.conversion.description"),
		},
		{
			icon: Heart,
			title: t("expertise.approach.title"),
			description: t("expertise.approach.description"),
		},
	];

	const skills = [
		t("skills.0"),
		t("skills.1"),
		t("skills.2"),
		t("skills.3"),
		t("skills.4"),
		t("skills.5"),
	];

	return (
		<section className="relative py-32 overflow-hidden" id="about">
			<div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent-alt)]/5" />
			<div className="container relative">
				<div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
					<div className="space-y-8">
						<div className="space-y-6">
							<h2 className="h2">{t("title")}</h2>
							<p className="text-lg text-[var(--color-muted)] leading-relaxed">
								{t("subtitle")}
							</p>
							<p className="text-[var(--color-fg-soft)] leading-relaxed">
								{t("description")}
							</p>
						</div>

						<div className="space-y-6">
							{expertise.map((item) => {
								const Icon = item.icon;
								return (
									<div key={item.title} className="flex gap-4 items-start">
										<div className="icon-circle shrink-0">
											<Icon className="size-5" />
										</div>
										<div>
											<h3 className="font-semibold mb-2 tracking-tight">{item.title}</h3>
											<p className="text-sm text-[var(--color-muted)] leading-relaxed">
												{item.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>

						{/* CTA */}
						<div className="flex flex-col sm:flex-row gap-4">
							<EnhancedLink href="/#contact" variant="primary" className="h-12 px-8">
								{t("cta")}
							</EnhancedLink>
							<EnhancedLink
								href="https://www.raphael-plassart.com/"
								target="_blank"
								rel="noopener noreferrer"
								variant="secondary"
								className="h-12 px-8"
							>
								{t("ctaSecondary")}
							</EnhancedLink>
						</div>
					</div>

					<div className="space-y-8">
						{/* <Card className="p-8">
							<h3 className="text-xl font-bold mb-6">{t("skillsTitle")}</h3>
							<div className="grid grid-cols-2 gap-4">
								{skills.map((skill, i) => (
									<div key={i} className="flex items-center gap-2 text-sm">
										<CheckCircle className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
										<span className="text-[var(--color-fg-soft)]">{skill}</span>
									</div>
								))}
							</div>
						</Card> */}

						<Card className="p-6 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-alt)]/10">
							<div className="aspect-square rounded-2xl bg-[var(--color-bg-alt)] flex items-center justify-center mb-4">
								<div className="text-center space-y-2">
									<div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-alt)] flex items-center justify-center">
										<span className="text-white text-2xl font-bold">
											{t("name").charAt(0)}
										</span>
									</div>
									<Image
										src="/images/Raphael-Plassart.jpg"
										alt="About"
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<div className="text-center">
								<h4 className="font-semibold text-[var(--color-fg)]">{t("name")}</h4>
								<p className="text-sm text-[var(--color-muted)]">{t("title")}</p>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
