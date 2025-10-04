import { getTranslations } from "next-intl/server";
import { H4 } from "@/components/ui/typography";

export async function generateMetadata() {
	const t = await getTranslations("legal.privacy");
	return {
		title: `${t("title")} - Atlas`,
		description: `${t("title")} et protection des données personnelles d'Atlas. Conformité RGPD et gestion des cookies.`,
	};
}

export default async function Politique() {
	const t = await getTranslations("legal.privacy");

	return (
		<div className="container py-24">
			<h1 className="h2 mb-8">{t("title")}</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<H4 className="mb-4">{t("sections.introduction.title")}</H4>
					<p>{t("sections.introduction.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.controller.title")}</H4>
					<p>
						<strong>{t("sections.controller.name")}</strong>
						<br />
						{t("sections.controller.email")}
						<br />
						{t("sections.controller.website")}
					</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.data.title")}</H4>
					<p>{t("sections.data.content")}</p>
					<ul className="list-disc pl-6">
						{t.raw("sections.data.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.purposes.title")}</H4>
					<p>{t("sections.purposes.content")}</p>
					<ul className="list-disc pl-6">
						{t.raw("sections.purposes.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.legal.title")}</H4>
					<p>{t("sections.legal.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.retention.title")}</H4>
					<p>{t("sections.retention.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.rights.title")}</H4>
					<p>{t("sections.rights.content")}</p>
					<ul className="list-disc pl-6">
						{t.raw("sections.rights.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<p>{t("sections.rights.contact")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.analytics.title")}</H4>
					<p>{t("sections.analytics.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.security.title")}</H4>
					<p>{t("sections.security.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.contact.title")}</H4>
					<p>
						{t("sections.contact.content")}
						<br />
						{t("sections.contact.email")}
					</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.modifications.title")}</H4>
					<p>{t("sections.modifications.content")}</p>
				</section>
			</div>
		</div>
	);
}
