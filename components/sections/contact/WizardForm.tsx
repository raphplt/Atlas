"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validators";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
    LayoutDashboard, 
    RefreshCcw, 
    Rocket, 
    MessageSquare, 
    ArrowRight, 
    ArrowLeft,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { trackFormSuccess, trackFormError } from "@/lib/analytics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Step 1: Objectives
const OBJECTIVES = [
    { id: "creation", icon: LayoutDashboard },
    { id: "redesign", icon: RefreshCcw },
    { id: "marketing", icon: Rocket },
    { id: "other", icon: MessageSquare },
] as const;

// Step 2: Timelines
const TIMELINES = ["urgent", "1month", "3months", "exploration"] as const;

export function WizardForm() {
    const t = useTranslations("contact.form");
    const [step, setStep] = useState(1);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            projectGoal: undefined,
            timeline: undefined,
            budget: "nd",
            currentUrl: "",
            firstName: "",
            company: "",
            email: "",
            phone: "",
            message: "",
        },
        mode: "onChange"
    });

    const { 
        register, 
        handleSubmit, 
        watch, 
        setValue, 
        trigger,
        formState: { errors, isSubmitting, isValid } 
    } = form;

    const watchedGoal = watch("projectGoal");
    const watchedTimeline = watch("timeline");

    // Navigation Logic
    const nextStep = async () => {
        let valid = false;
        if (step === 1) valid = await trigger("projectGoal");
        if (step === 2) valid = await trigger(["timeline", "budget", "currentUrl"]);
        
        if (valid) {
            setStep((s) => s + 1);
        }
    };

    const prevStep = () => setStep((s) => s - 1);

    // Submission
    const onSubmit = async (data: ContactInput) => {
        setServerError(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            if (!res.ok) throw new Error("Erreur serveur");

            trackFormSuccess("wizard");
            toast.success(t("successMessage"));
            setStep(4); // Success Step
        } catch (e: any) {
            trackFormError(e.message, "wizard");
            setServerError("Une erreur est survenue. Réessayez ou envoyez un email.");
            toast.error("Erreur lors de l'envoi");
            console.error(e);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 20 : -20,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 20 : -20,
            opacity: 0
        })
    };

    return (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm relative">
            {/* Progress Bar */}
            <div className="h-1 bg-[var(--color-border)] w-full">
                <motion.div 
                    className="h-full bg-[var(--color-primary)]/80 md:bg-[var(--color-primary)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ ease: "easeInOut" }}
                />
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait" initial={false}>
                        
                        {/* STEP 1: OBJECTIVE */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                                        {t("steps.objective")}
                                    </span>
                                    <h3 className="text-xl font-bold text-[var(--color-primary)]/90">
                                        Quel est votre besoin principal ?
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {OBJECTIVES.map((obj) => (
                                        <div
                                            key={obj.id}
                                            onClick={() => {
                                                setValue("projectGoal", obj.id as any);
                                                nextStep();
                                            }}
                                            className={cn(
                                                "cursor-pointer group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-md",
                                                watchedGoal === obj.id 
                                                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                                                    : "border-[var(--color-border)] bg-[var(--color-background-alt)] hover:border-[var(--color-primary)]/50"
                                            )}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                                    watchedGoal === obj.id 
                                                        ? "bg-[var(--color-primary)] text-white" 
                                                        : "bg-white text-[var(--color-muted)] group-hover:text-[var(--color-primary)]"
                                                )}>
                                                    <obj.icon className="size-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[var(--color-foreground)] text-sm mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                                                        {t(`objectives.${obj.id}.label`)}
                                                    </p>
                                                    <p className="text-xs text-[var(--color-muted)]">
                                                        {t(`objectives.${obj.id}.desc`)}
                                                    </p>
                                                </div>
                                                {watchedGoal === obj.id && (
                                                    <div className="absolute top-4 right-4 text-[var(--color-primary)]">
                                                        <CheckCircle2 className="size-5" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {errors.projectGoal && (
                                    <p className="text-center text-red-500 text-sm animate-pulse">{errors.projectGoal.message}</p>
                                )}
                            </motion.div>
                        )}

                        {/* STEP 2: CONTEXT */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center space-y-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                                        {t("steps.context")}
                                    </span>
                                    <h3 className="text-xl font-bold text-[var(--color-primary)]">
                                        Dites-nous en plus
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Timeline */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium text-[var(--color-foreground)]">
                                            {t("timelines.label")}
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {TIMELINES.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setValue("timeline", time as any)}
                                                    className={cn(
                                                        "py-2.5 px-3 rounded-lg text-sm border transition-all text-center",
                                                        watchedTimeline === time
                                                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white font-medium shadow-sm"
                                                            : "bg-[var(--color-background-alt)] border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
                                                    )}
                                                >
                                                    {t(`timelines.${time}`)}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.timeline && <p className="text-red-500 text-xs">{errors.timeline.message}</p>}
                                    </div>

                                    {/* Conditional: Current URL */}
                                    {watchedGoal === "redesign" && (
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-[var(--color-foreground)]">
                                                {t("fields.currentUrl")}
                                            </label>
                                            <input
                                                {...register("currentUrl")}
                                                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                                placeholder="https://monsite.com"
                                            />
                                            {errors.currentUrl && <p className="text-red-500 text-xs">{errors.currentUrl.message}</p>}
                                        </div>
                                    )}

                                    {/* Budget - Uses Radix Select */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-[var(--color-foreground)]">
                                            {t("fields.budget")}
                                        </label>
                                        <Select 
                                            onValueChange={(value: string) => setValue("budget", value)} 
                                            defaultValue={watch("budget")}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={t("fields.budgetPlaceholder")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="nd">{t("budgetRanges.tbd")}</SelectItem>
                                                <SelectItem value="<1000">{t("budgetRanges.under1000")}</SelectItem>
                                                <SelectItem value="1000-2000">{t("budgetRanges.1000to2000")}</SelectItem>
                                                <SelectItem value=">2000">{t("budgetRanges.over2000")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] hover:bg-[var(--color-background-alt)] transition-colors"
                                    >
                                        <ArrowLeft className="size-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                    >
                                        {t("next")} <ArrowRight className="size-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: IDENTITY */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center space-y-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                                        {t("steps.identity")}
                                    </span>
                                    <h3 className="text-xl font-bold text-[var(--color-primary)]">
                                        Où vous envoyer l&apos;audit ?
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <input
                                                {...register("firstName")}
                                                placeholder={t("fields.firstName")}
                                                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] outline-none focus:border-[var(--color-primary)] transition-all"
                                            />
                                            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-1">
                                             <input
                                                {...register("company")}
                                                placeholder={t("fields.company")}
                                                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] outline-none focus:border-[var(--color-primary)] transition-all"
                                            />
                                            {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <input
                                            {...register("email")}
                                            placeholder={t("fields.email")}
                                            type="email"
                                            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] outline-none focus:border-[var(--color-primary)] transition-all"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <input
                                            {...register("phone")}
                                            placeholder={t("fields.phone")}
                                            type="tel"
                                            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] outline-none focus:border-[var(--color-primary)] transition-all"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                    </div>

                                    <div className="pt-2">
                                        <textarea
                                            {...register("message")}
                                            placeholder={t("fields.message")}
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] outline-none focus:border-[var(--color-primary)] transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-[var(--color-primary)] text-white rounded-lg font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="size-5 animate-spin" />
                                                {t("submitting")}
                                            </>
                                        ) : (
                                            <>
                                                {t("submit")} <ArrowRight className="size-5" />
                                            </>
                                        )}
                                    </button>
                                    
                                    <div className="flex gap-2 justify-center">
                                         <button
                                            type="button"
                                            onClick={prevStep}
                                            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] underline-offset-4 hover:underline"
                                        >
                                            {t("back")}
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-center text-[var(--color-muted)] px-4 opacity-70">
                                        {t("consent")}
                                    </p>
                                </div>
                                {serverError && <p className="text-center text-red-500 text-sm">{serverError}</p>}
                            </motion.div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 space-y-6"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="size-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                                    Demande reçue !
                                </h3>
                                <p className="text-[var(--color-muted)] max-w-xs mx-auto text-lg">
                                    Merci {watch("firstName")}. Je vous recontacte sous 24h ouvrées pour faire le point.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
}
