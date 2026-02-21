import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
	return (
		<main className="min-h-[70vh] bg-[var(--color-background-alt)] py-20 md:py-28">
			<div className="container-width">
				<div className="max-w-2xl mx-auto rounded-atlas bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow)] p-8 md:p-12 text-center">
					<div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center">
						<CheckCircle2 className="size-8" />
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
						Merci, votre demande a bien été envoyée.
					</h1>
					<p className="text-[var(--color-muted)] mb-8">
						Je vous recontacte sous 24h ouvrées avec un premier retour concret.
					</p>
					<Link href="/" className="btn-primary inline-flex">
						Retour à l&apos;accueil
					</Link>
				</div>
			</div>
		</main>
	);
}
