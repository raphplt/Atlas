import { H4 } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("legal.cgv");
	return {
		title: `${t("title")} - Atlas`,
		description: `${t("title")} pour les services de création de sites web d'Atlas. Modalités de paiement, délais de livraison et garanties.`,
	};
}

export default async function CGV() {
	const t = await getTranslations("legal.cgv");

	return (
		<div className="container mx-auto py-24">
			<h1 className="h2 mb-8">{t("title")}</h1>
			<p className="text-muted-foreground mb-8">{t("lastUpdate")}</p>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<H4 className="mb-4">{t("sections.object.title")}</H4>
					<p>{t("sections.object.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.provider.title")}</H4>
					<p>
						<strong>{t("sections.provider.name")}</strong>
						<br />
						{t("sections.provider.tradeName")}
						<br />
						{t("sections.provider.status")}
						<br />
						{t("sections.provider.siren")}
						<br />
						{t("sections.provider.siret")}
						<br />
						{t("sections.provider.ape")}
						<br />
						{t("sections.provider.address")}
						<br />
						{t("sections.provider.email")}
						<br />
						{t("sections.provider.phone")}
						<br />
						<em>{t("sections.provider.tva")}</em>
					</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.services.title")}</H4>
					<p>{t("sections.services.content")}</p>
					<ul className="list-disc pl-6">
						{t.raw("sections.services.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<p><em>{t("sections.services.detail")}</em></p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.quote.title")}</H4>
					<ul className="list-disc pl-6">
						{t.raw("sections.quote.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.pricing.title")}</H4>
					<p>{t("sections.pricing.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.payment.title")}</H4>
					<p>{t("sections.payment.content")}</p>
					<ul className="list-disc pl-6">
						{t.raw("sections.payment.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<p><em>{t("sections.payment.invoice")}</em></p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.latePayment.title")}</H4>
					<p>{t("sections.latePayment.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.delivery.title")}</H4>
					<p>{t("sections.delivery.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.providerObligations.title")}</H4>
					<ul className="list-disc pl-6">
						{t.raw("sections.providerObligations.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.clientObligations.title")}</H4>
					<ul className="list-disc pl-6">
						{t.raw("sections.clientObligations.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.withdrawal.title")}</H4>
					<p>{t("sections.withdrawal.content")}</p>
					<p><em>{t("sections.withdrawal.exception")}</em></p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.validation.title")}</H4>
					<p>{t("sections.validation.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.revisions.title")}</H4>
					<p>{t("sections.revisions.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.guarantee.title")}</H4>
					<p>{t("sections.guarantee.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.intellectual.title")}</H4>
					<ul className="list-disc pl-6">
						{t.raw("sections.intellectual.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.liability.title")}</H4>
					<ul className="list-disc pl-6">
						{t.raw("sections.liability.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.data.title")}</H4>
					<p>{t("sections.data.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.confidentiality.title")}</H4>
					<p>{t("sections.confidentiality.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.forceMajeure.title")}</H4>
					<p>{t("sections.forceMajeure.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.termination.title")}</H4>
					<p>{t("sections.termination.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.mediation.title")}</H4>
					<p>{t("sections.mediation.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.law.title")}</H4>
					<p>{t("sections.law.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.contact.title")}</H4>
					<p>
						{t("sections.contact.content")}
						<br />
						{t("sections.contact.email")}
						<br />
						{t("sections.contact.phone")}
						<br />
						{t("sections.contact.address")}
					</p>
				</section>
			</div>
		</div>
	);
}
