import { H2, H4 } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("legal.mentions");
	return {
		title: `${t("title")} - Atlas`,
		description: `${t("title")} du site Atlas - Création de sites web pour artisans. Informations sur l'éditeur, l'hébergeur et les contacts.`,
	};
}

export default async function MentionsLegales() {
	const t = await getTranslations("legal.mentions");

	return (
		<div className="container py-24">
			<h1 className="h2 mb-8">{t("title")}</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<H4 className="mb-4">{t("sections.publisher.title")}</H4>
					<p>
						<strong>{t("sections.publisher.content")}</strong>
						<br />
						{t("sections.publisher.role")}
						<br />
						{t("sections.publisher.studies")}
						<br />
						{t("sections.publisher.projects")}
					</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.contact.title")}</H4>
					<p>
						{t("sections.contact.email")}
						<br />
						{t("sections.contact.website")}
					</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.hosting.title")}</H4>
					<p>
						{t("sections.hosting.company")}
						<br />
						{t("sections.hosting.address")}
						<br />
						{t("sections.hosting.city")}
						<br />
						{t("sections.hosting.country")}
					</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.intellectual.title")}</H4>
					<p>{t("sections.intellectual.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.data.title")}</H4>
					<p>{t("sections.data.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.cookies.title")}</H4>
					<p>{t("sections.cookies.content")}</p>
				</section>

				<section className="mb-8">
					<H4 className="mb-4">{t("sections.law.title")}</H4>
					<p>{t("sections.law.content")}</p>
				</section>
			</div>
		</div>
	);
}
