import { PhoneCall, FileCheck2, Code2, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

type Step = {
	title: string;
	desc: string;
	icon: any; 
	duration: string;
};

export function Process() {
	const t = useTranslations("process");

	const steps: Step[] = [
		{
			title: t("steps.call.title"),
			desc: t("steps.call.description"),
			icon: PhoneCall,
			duration: t("steps.call.duration"),
		},
		{
			title: t("steps.quote.title"),
			desc: t("steps.quote.description"),
			icon: FileCheck2,
			duration: t("steps.quote.duration"),
		},
		{
			title: t("steps.creation.title"),
			desc: t("steps.creation.description"),
			icon: Code2,
			duration: t("steps.creation.duration"),
		},
		{
			title: t("steps.launch.title"),
			desc: t("steps.launch.description"),
			icon: Rocket,
			duration: t("steps.launch.duration"),
		},
	];

	return (
		<section className="py-24 bg-[var(--color-background-alt)] relative overflow-hidden" id="process">
            <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
			<div className="container-width relative">
				<div className="text-center mb-16 max-w-3xl mx-auto">
                    <MotionWrapper variant="fade-up">
					    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">{t("title")}</h2>
                    </MotionWrapper>
                    <MotionWrapper variant="fade-up" delay={0.1}>
					    <p className="text-lg text-[var(--color-muted)]">
						    {t("subtitle")}
					    </p>
                    </MotionWrapper>
				</div>
                
				<div className="grid md:grid-cols-4 gap-8">
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<div key={i} className="relative">
                                {/* Connector (Desktop) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[50%] w-full h-px bg-[var(--color-border)] -z-10" />
                                )}
                                
                                <MotionWrapper variant="fade-up" delay={0.1 * i} className="h-full">
								    <div className="bg-[var(--color-card)] rounded-lg p-6 border border-[var(--color-border)] h-full flex flex-col items-center text-center hover:border-[var(--color-primary)] transition-colors">
									    <div className="w-16 h-16 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-[var(--color-primary)] mb-6 relative">
										    <Icon className="size-6" />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                                                {i + 1}
                                            </div>
									    </div>
                                        
									    <h3 className="font-bold text-[var(--color-primary)] mb-2">
										    {step.title}
									    </h3>
                                        
                                        <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-4">
                                            {step.duration}
                                        </div>
                                        
									    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
										    {step.desc}
									    </p>
								    </div>
                                </MotionWrapper>
							</div>
						);
					})}
				</div>
                
				<MotionWrapper variant="fade-in" delay={0.5} className="mt-16 text-center">
					<p className="text-sm font-medium text-[var(--color-muted)] bg-white inline-block px-6 py-3 rounded-full border border-[var(--color-border)] shadow-sm">
						{t("totalDuration")}
					</p>
				</MotionWrapper>
			</div>
		</section>
	);
}
