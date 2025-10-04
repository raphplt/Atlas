import type { Metadata } from "next";
import { siteMeta } from "@/lib/meta";
import { businessSchema } from "@/lib/schema";

export const metadata: Metadata = {
	title: siteMeta.title,
	description: siteMeta.description,
	alternates: { canonical: siteMeta.url },
	openGraph: {
		title: siteMeta.title,
		description: siteMeta.description,
		url: siteMeta.url,
	},
	twitter: {
		card: "summary_large_image",
		title: siteMeta.title,
		description: siteMeta.description,
	},
};

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema()) }}
			/>
			{children}
		</>
	);
}
