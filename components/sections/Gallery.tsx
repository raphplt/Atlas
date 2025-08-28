import Image from "next/image";

const items: { type: "image" | "video"; src: string; label: string }[] = [
	{
		type: "image",
		src: "/images/placeholders/after.png",
		label: "Refonte artisan",
	},
	{
		type: "image",
		src: "/images/placeholders/after.png",
		label: "Site plombier",
	},
	{
		type: "image",
		src: "/images/placeholders/after.png",
		label: "Accueil modernisé",
	},
	{
		type: "image",
		src: "/images/placeholders/after.png",
		label: "Landing conversion",
	},
	{
		type: "image",
		src: "/images/placeholders/after.png",
		label: "Section services",
	},
	{
		type: "image",
		src: "/images/placeholders/after.png",
		label: "Version mobile",
	},
];

export function Gallery() {
	return (
		<section className="container py-24" id="galerie">
			<h2 className="h2 text-center mb-6">Exemples</h2>
			<p className="lead mb-12">
				Une qualité de design constante orientée performance.
			</p>
			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
				{items.map((it) => (
					<div key={it.label} className="gallery-card group">
						{it.type === "image" ? (
							<Image src={it.src} alt={it.label} fill className="object-cover" />
						) : (
							<video
								autoPlay
								loop
								muted
								playsInline
								className="w-full h-full object-cover"
							>
								<source src={it.src} />
							</video>
						)}
						<div className="gallery-label opacity-0 group-hover:opacity-100 transition">
							{it.label}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
