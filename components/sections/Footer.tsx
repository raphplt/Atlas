"use client";

import Logo from "@/components/Logo";
import {
	GitHubIcon,
	LinkedInIcon,
	MailIcon,
	CoffeeIcon,
} from "@/components/Icons";
import { ConsentManager } from "@/components/ConsentBanner";
import { useTranslations } from "next-intl";
import Image from "next/image"

export function Footer() {
    const t = useTranslations('footer');
	return (
		<footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-footer-bg)] text-[var(--color-footer-fg)] relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)]/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            
			<div className="container-width py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                             <Image
                                          src="/images/Logo-White.png" 
                                          alt="Logo" 
                                          width={20} 
                                          height={20} 
                                        
                                      />
                            <span className="font-heading font-bold text-2xl tracking-tight text-[var(--color-text)]">Atlas</span>
                        </div>
                        <p className="text-[var(--color-footer-muted)] leading-relaxed text-sm max-w-xs">
                            {t('description')}
                        </p>
                        
                        <div className="flex items-center gap-3 pt-4">
                            <SocialLink href="https://github.com/raphplt" icon={<GitHubIcon />} label="GitHub" />
                            <SocialLink href="https://linkedin.com/in/raphaël-plassart" icon={<LinkedInIcon />} label="LinkedIn" />
                            <SocialLink href="mailto:raphael.plassart@gmail.com" icon={<MailIcon />} label="Email" />
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:col-start-6 space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text)]">
                            {t('navigation')}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/#offres" label={t('links.offers')} />
                            <FooterLink href="/#portfolio" label={t('links.portfolio')} />
                            <FooterLink href="/#process" label={t('links.process')} />
                            <FooterLink href="/#temoignages" label={t('links.testimonials')} />
                        </ul>
                    </div>

                     <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text)]">
                            {t('support')}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/#faq" label={t('links.faq')} />
                            <FooterLink href="/#contact" label={t('links.contact')} />
                            <FooterLink href="/about" label={t('links.about')} />
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text)]">
                            {t('legal')}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <FooterLink href="/legal/mentions-legales" label={t('links.mentions')} />
                            <FooterLink href="/legal/cgv" label={t('links.cgv')} />
                            <FooterLink href="/legal/politique-confidentialite" label={t('links.privacy')} />
                        </ul>
                    </div>
                </div>
			</div>
            
            <div className="border-t border-[var(--color-border)]/10 py-8 relative z-10">
                <div className="container-width flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-footer-muted)] font-medium">
                        {t('copyright', {year: new Date().getFullYear()})}
                    </p>
                    <div className="text-xs text-[var(--color-footer-muted)] opacity-80 hover:opacity-100 transition-opacity">
                         <ConsentManager />
                    </div>
                </div>
            </div>
		</footer>
	);
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-footer-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 p-2 rounded-full transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <a 
                href={href} 
                className="text-[var(--color-footer-muted)] hover:text-[var(--color-footer-fg)] hover:translate-x-1 transition-all duration-200 inline-block"
            >
                {label}
            </a>
        </li>
    );
}
