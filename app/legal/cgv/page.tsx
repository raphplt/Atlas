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
		<div className="container py-24">
			<h1 className="h2 mb-8">{t("title")}</h1>

			<div className="prose prose-lg max-w-none">
				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.object.title")}</h2>
					<p>{t("sections.object.content")}</p>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.services.title")}</h2>
					<p>{t("sections.services.content")}</p>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.payment.title")}</h2>
					<ul className="list-disc pl-6">
						{t.raw("sections.payment.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.delivery.title")}</h2>
					<p>{t("sections.delivery.content")}</p>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.guarantees.title")}</h2>
					<ul className="list-disc pl-6">
						{t.raw("sections.guarantees.items").map((item: string, index: number) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.responsibilities.title")}</h2>
					<p>{t("sections.responsibilities.content")}</p>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.intellectual.title")}</h2>
					<p>{t("sections.intellectual.content")}</p>
				</section>

				<section className="mb-8">
					<h2 className="h3 mb-4">{t("sections.contact.title")}</h2>
					<p>
						{t("sections.contact.content")}
						<br />
						{t("sections.contact.email")}
					</p>
				</section>
			</div>
		</div>
	);
}
