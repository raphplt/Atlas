import React from "react";
import Image from "next/image";
import clsx from "clsx";

export function LandscaperHeroAfter({
	hideGlobalUI = false,
}: {
	hideGlobalUI?: boolean;
}) {
	return (
		<div className="h-full w-full overflow-auto bg-white">
			{/* Navigation sticky moderne avec glassmorphism */}
			<nav
				className={clsx(
					"absolute w-full top-0 z-[10000] bg-white/20 backdrop-blur-md border-b border-white/30 shadow-lg transition-all duration-300",
					!hideGlobalUI ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						{/* Logo et nom */}
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500/90 to-emerald-600/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
								<svg
									className="w-6 h-6 text-white drop-shadow-lg"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div>
								<h1 className="text-xl font-bold text-white drop-shadow-lg">
									JARDINS & PAYSAGES
								</h1>
								<p className="text-sm text-white/80">Jean-Pierre Dubois</p>
							</div>
						</div>

						{/* Menu de navigation */}
						<div className="hidden md:flex items-center space-x-8">
							<a
								href="#services"
								className="text-white/90 hover:text-green-300 transition-colors font-medium drop-shadow-sm"
							>
								Services
							</a>
							<a
								href="#realisations"
								className="text-white/90 hover:text-green-300 transition-colors font-medium drop-shadow-sm"
							>
								Réalisations
							</a>
							<a
								href="#contact"
								className="text-white/90 hover:text-green-300 transition-colors font-medium drop-shadow-sm"
							>
								Contact
							</a>
							<button className="bg-green-600/90 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 border border-green-500/50 shadow-lg transition-all duration-300 transform hover:scale-105">
								Devis Gratuit
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section - Design moderne et immersif avec glassmorphism */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Background avec parallax */}
				<div className="absolute inset-0">
					<Image
						src="https://images.pexels.com/photos/6841361/pexels-photo-6841361.jpeg?w=1920&h=1080&fit=crop&crop=center"
						alt="Jardin paysager luxueux"
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
				</div>

				{/* Éléments décoratifs flottants avec blur */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Cercles flottants avec blur */}
					<div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
					<div className="absolute top-40 right-32 w-24 h-24 bg-emerald-300/15 rounded-full blur-lg animate-pulse delay-1000"></div>
					<div className="absolute bottom-40 left-1/4 w-20 h-20 bg-green-500/25 rounded-full blur-md animate-pulse delay-500"></div>
					<div className="absolute bottom-20 right-20 w-28 h-28 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1500"></div>
				</div>

				{/* Contenu principal avec effets glassmorphism */}
				<div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
					{/* Chip amélioré avec plus d'effets */}
					<div className="mb-12">
						<div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/40 shadow-lg hover:bg-white/20 transition-all duration-300">
							<span className="mr-2 text-lg">🌿</span>
							Création & Entretien depuis 2004
						</div>
					</div>

					{/* Titre principal avec effet glassmorphism */}
					<div className="mb-12 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
						<h1 className="text-7xl font-light tracking-wider mb-4 leading-tight">
							VOTRE{" "}
							<span className="font-bold text-green-400 drop-shadow-lg">
								JARDIN RÊVÉ
							</span>
						</h1>
						<p className="text-2xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
							De la conception à la réalisation, nous créons des espaces verts sur
							mesure qui s'harmonisent parfaitement avec votre style de vie
						</p>
					</div>

					{/* Métriques de confiance avec effets glassmorphism */}
					<div className="grid grid-cols-3 gap-8 mb-12">
						<div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
							<div className="flex items-center justify-center mb-3">
								<svg
									className="w-8 h-8 text-green-400 mr-2 drop-shadow-lg"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="text-4xl font-bold text-green-400 drop-shadow-lg">
									20+
								</div>
							</div>
							<div className="text-white/90 font-medium">Années d'expérience</div>
						</div>
						<div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
							<div className="flex items-center justify-center mb-3">
								<svg
									className="w-8 h-8 text-green-400 mr-2 drop-shadow-lg"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
								<div className="text-4xl font-bold text-green-400 drop-shadow-lg">
									500+
								</div>
							</div>
							<div className="text-white/90 font-medium">Jardins créés</div>
						</div>
						<div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
							<div className="flex items-center justify-center mb-3">
								<svg
									className="w-8 h-8 text-green-400 mr-2 drop-shadow-lg"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="text-4xl font-bold text-green-400 drop-shadow-lg">
									100%
								</div>
							</div>
							<div className="text-white/90 font-medium">Satisfaction client</div>
						</div>
					</div>

					{/* Boutons avec effets glassmorphism */}
					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						{/* CTA Principal */}
						<button className="px-12 py-5 text-xl font-bold rounded-2xl bg-green-600/95 backdrop-blur-md text-white border border-green-500/50 shadow-2xl hover:bg-green-600 hover:shadow-3xl transition-all duration-300 transform hover:scale-110">
							Devis Gratuit
						</button>
						{/* CTA Secondaire */}
						<button className="px-10 py-4 text-lg font-medium rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/40 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
							Découvrir nos réalisations
						</button>
					</div>
				</div>

				{/* Scroll indicator amélioré */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
					<div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
						<div className="w-1.5 h-4 bg-white rounded-full mt-2 animate-bounce"></div>
					</div>
				</div>
			</section>

			{/* Section Services - Design asymétrique moderne */}
			<section id="services" className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold text-gray-900 mb-6">Nos Services</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Une approche complète pour transformer votre espace extérieur en
							véritable havre de paix
						</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						{/* Création */}
						<div className="relative group">
							<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
								<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Création de Jardins
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Conception et réalisation de jardins sur mesure, de l'étude initiale à
									la plantation finale.
								</p>
								<ul className="space-y-3 text-gray-600 mb-8">
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-green-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Étude et conseils personnalisés
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-green-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Plans d'aménagement détaillés
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-green-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Plantation d'arbres et arbustes
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-green-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Création de massifs fleuris
									</li>
								</ul>
								<div className="text-2xl font-bold text-green-600">
									À partir de 2500€
								</div>
							</div>
						</div>

						{/* Entretien */}
						<div className="relative group">
							<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Entretien Régulier
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Maintenance et soins de vos espaces verts pour préserver leur beauté
									toute l'année.
								</p>
								<ul className="space-y-3 text-gray-600 mb-8">
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-blue-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Taille des arbustes et haies
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-blue-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Tonte et entretien de pelouse
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-blue-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Désherbage et nettoyage
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-blue-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Arrosage et fertilisation
									</li>
								</ul>
								<div className="text-2xl font-bold text-blue-600">
									À partir de 45€/mois
								</div>
							</div>
						</div>

						{/* Aménagement */}
						<div className="relative group">
							<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
								<div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">Aménagements</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Terrasse, allées, clôtures et décoration pour compléter votre espace
									extérieur.
								</p>
								<ul className="space-y-3 text-gray-600 mb-8">
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-amber-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Terrasses en bois ou composite
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-amber-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Allées pavées et gravillonnées
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-amber-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Clôtures végétales et occultantes
									</li>
									<li className="flex items-center">
										<svg
											className="w-5 h-5 text-amber-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										Éclairage extérieur d'accent
									</li>
								</ul>
								<div className="text-2xl font-bold text-amber-600">Sur devis</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Réalisations - Galerie moderne */}
			<section id="realisations" className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold text-gray-900 mb-6">
							Nos Réalisations
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Découvrez quelques-uns de nos projets qui ont transformé des espaces
							ordinaires en jardins extraordinaires
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="group relative overflow-hidden rounded-2xl">
							<Image
								src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center"
								alt="Jardin contemporain"
								width={400}
								height={300}
								className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-4 left-4 text-white">
									<h3 className="font-semibold">Jardin contemporain</h3>
									<p className="text-sm text-white/80">Paris 16ème</p>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl">
							<Image
								src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&crop=center"
								alt="Terrasse en bois"
								width={400}
								height={300}
								className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-4 left-4 text-white">
									<h3 className="font-semibold">Terrasse en bois</h3>
									<p className="text-sm text-white/80">Neuilly</p>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl">
							<Image
								src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop&crop=center"
								alt="Massif fleuri"
								width={400}
								height={300}
								className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-4 left-4 text-white">
									<h3 className="font-semibold">Massif fleuri</h3>
									<p className="text-sm text-white/80">Boulogne</p>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl">
							<Image
								src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=300&fit=crop&crop=center"
								alt="Allée pavée"
								width={400}
								height={300}
								className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="absolute bottom-4 left-4 text-white">
									<h3 className="font-semibold">Allée pavée</h3>
									<p className="text-sm text-white/80">Saint-Cloud</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Témoignages - Design moderne */}
			<section className="py-20 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold mb-6">Avis Clients</h2>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
							Ce que disent nos clients satisfaits de notre travail
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-gray-800 rounded-2xl p-8">
							<div className="flex items-center mb-6">
								<div className="flex text-yellow-400">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
							</div>
							<p className="text-gray-300 mb-6 italic text-lg leading-relaxed">
								"Jean-Pierre a transformé notre petit jardin en un véritable havre de
								paix. Son travail est soigné et il respecte les délais. Je recommande !"
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
									<span className="text-white font-semibold">MD</span>
								</div>
								<div>
									<div className="font-semibold text-white">Mme Dupont</div>
									<div className="text-gray-400 text-sm">Paris 16ème</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-800 rounded-2xl p-8">
							<div className="flex items-center mb-6">
								<div className="flex text-yellow-400">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
							</div>
							<p className="text-gray-300 mb-6 italic text-lg leading-relaxed">
								"Excellent service d'entretien. Jean-Pierre est ponctuel et
								professionnel. Notre jardin n'a jamais été aussi beau !"
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
									<span className="text-white font-semibold">MM</span>
								</div>
								<div>
									<div className="font-semibold text-white">M. Martin</div>
									<div className="text-gray-400 text-sm">Neuilly</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Contact - Design moderne */}
			<section id="contact" className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<h2 className="text-5xl font-bold text-gray-900 mb-8">Contactez-nous</h2>
					<p className="text-xl text-gray-600 mb-12 leading-relaxed">
						Prêt à transformer votre espace extérieur ? Contactez-nous pour un devis
						gratuit et personnalisé
					</p>

					<div className="grid md:grid-cols-2 gap-12 mb-12">
						<div>
							<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
								<svg
									className="w-8 h-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">Téléphone</h3>
							<p className="text-gray-600">01 42 78 56 32</p>
						</div>

						<div>
							<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
								<svg
									className="w-8 h-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">Email</h3>
							<p className="text-gray-600">jeanpierre@jardins-paysages.fr</p>
						</div>
					</div>

					<button className="bg-green-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-lg">
						DEVIS GRATUIT
					</button>
				</div>
			</section>

			{/* Footer moderne */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center">
						<div className="flex items-center justify-center mb-6">
							<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
								<svg
									className="w-6 h-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div>
								<h3 className="text-xl font-bold">Jardins & Paysages</h3>
								<p className="text-gray-400 text-sm">Jean-Pierre Dubois</p>
							</div>
						</div>
						<p className="text-gray-400 mb-4">
							Création et entretien de jardins - Devis gratuit
						</p>
						<p className="text-gray-500 text-sm">
							© 2024 Jean-Pierre Dubois - Tous droits réservés
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default LandscaperHeroAfter;
