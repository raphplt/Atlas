import React from "react";
import Image from "next/image";
import clsx from "clsx";

export function HairdresserHeroAfter({
	hideGlobalUI = false,
}: {
	hideGlobalUI?: boolean;
}) {
	return (
		<div className="h-full w-full overflow-auto bg-white font-sans">
			{/* Navigation élégante */}
			<nav
				className={clsx(
					"fixed top-0 left-0 right-0 z-[10000] bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300",
					!hideGlobalUI ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						<div className="text-2xl font-semibold tracking-wide">
							SALON MARIE-CLAUDE
						</div>
						<div className="hidden md:flex space-x-8 text-sm font-medium">
							<a href="#services" className="hover:text-pink-600 transition-colors">
								Services
							</a>
							<a href="#gallery" className="hover:text-pink-600 transition-colors">
								Galerie
							</a>
							<a href="#team" className="hover:text-pink-600 transition-colors">
								Équipe
							</a>
							<a href="#contact" className="hover:text-pink-600 transition-colors">
								Contact
							</a>
						</div>
						<div className="text-sm font-medium text-pink-600">01 42 78 56 32</div>
					</div>
				</div>
			</nav>

			{/* Hero Section - Layout asymétrique avec plus de contenu */}
			<section className="relative min-h-screen flex items-center">
				<div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50"></div>
				<div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div className="space-y-8">
							<div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 text-sm font-medium rounded-full">
								✨ Salon de coiffure premium depuis 2008
							</div>
							<h1 className="text-6xl font-bold text-gray-900 leading-tight">
								Votre <span className="text-pink-600">beauté</span> est notre passion
							</h1>
							<p className="text-xl text-gray-600 leading-relaxed">
								Expertise, créativité et produits premium pour sublimer votre style.
								Notre équipe de professionnels vous accompagne dans votre
								transformation.
							</p>

							{/* Métriques de confiance */}
							<div className="grid grid-cols-3 gap-6">
								<div className="text-center">
									<div className="text-3xl font-bold text-pink-600 mb-2">25+</div>
									<div className="text-sm text-gray-600">Années d'expérience</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
									<div className="text-sm text-gray-600">Clientes satisfaites</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-pink-600 mb-2">24h</div>
									<div className="text-sm text-gray-600">Réservation</div>
								</div>
							</div>

							{/* Services rapides */}
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-white rounded-lg p-4 shadow-sm">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
											<svg
												className="w-4 h-4 text-pink-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
												/>
											</svg>
										</div>
										<div>
											<div className="font-semibold text-gray-900">Coupe & Styling</div>
											<div className="text-sm text-gray-600">À partir de 45€</div>
										</div>
									</div>
								</div>
								<div className="bg-white rounded-lg p-4 shadow-sm">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
											<svg
												className="w-4 h-4 text-purple-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
												/>
											</svg>
										</div>
										<div>
											<div className="font-semibold text-gray-900">Coloration</div>
											<div className="text-sm text-gray-600">À partir de 85€</div>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<button className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors duration-300 shadow-lg">
									Prendre RDV
								</button>
								<button className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pink-50 transition-colors duration-300">
									Découvrir nos créations
								</button>
							</div>

							{/* Contact rapide */}
							<div className="flex items-center gap-6 text-sm">
								<div className="flex items-center gap-2">
									<svg
										className="w-4 h-4 text-pink-600"
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
									<span className="text-gray-600">01 42 78 56 32</span>
								</div>
								<div className="flex items-center gap-2">
									<svg
										className="w-4 h-4 text-pink-600"
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
									<span className="text-gray-600">marieclaude@coiffure-beaute.fr</span>
								</div>
							</div>
						</div>
						<div className="relative">
							<div className="relative h-96 rounded-2xl overflow-hidden">
								<Image
									src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop&crop=center"
									alt="Salon de coiffure"
									fill
									className="object-cover"
								/>
							</div>
							<div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
								<div className="text-center">
									<div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
									<div className="text-sm text-gray-600">Années d'expérience</div>
								</div>
							</div>
							<div className="absolute -top-6 -right-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-4 shadow-xl">
								<div className="text-center">
									<div className="text-sm font-medium">Ouvert</div>
									<div className="text-lg font-bold">7j/7</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Services - Cards modernes */}
			<section id="services" className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Des prestations sur mesure pour sublimer votre beauté naturelle
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-8 hover:shadow-xl transition-all duration-300">
							<div className="relative z-10">
								<div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
									<svg
										className="w-8 h-8 text-pink-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Coupe & Styling
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Coupe personnalisée selon votre morphologie, style de vie et tendances
									actuelles.
								</p>
								<ul className="space-y-2 text-sm text-gray-600 mb-6">
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-pink-500 mr-3"
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
										Diagnostic personnalisé
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-pink-500 mr-3"
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
										Conseils d'entretien
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-pink-500 mr-3"
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
										Styling professionnel
									</li>
								</ul>
								<div className="text-2xl font-bold text-pink-600">À partir de 45€</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 hover:shadow-xl transition-all duration-300">
							<div className="relative z-10">
								<div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
									<svg
										className="w-8 h-8 text-purple-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Coloration & Mèches
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Techniques modernes de coloration pour un résultat naturel et durable.
								</p>
								<ul className="space-y-2 text-sm text-gray-600 mb-6">
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-purple-500 mr-3"
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
										Produits bio premium
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-purple-500 mr-3"
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
										Techniques balayage
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-purple-500 mr-3"
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
										Soins post-coloration
									</li>
								</ul>
								<div className="text-2xl font-bold text-purple-600">
									À partir de 85€
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-8 hover:shadow-xl transition-all duration-300">
							<div className="relative z-10">
								<div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
									<svg
										className="w-8 h-8 text-pink-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Soins & Traitements
								</h3>
								<p className="text-gray-600 mb-6 leading-relaxed">
									Soins professionnels pour cheveux secs, abîmés ou colorés.
								</p>
								<ul className="space-y-2 text-sm text-gray-600 mb-6">
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-pink-500 mr-3"
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
										Diagnostic cheveux
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-pink-500 mr-3"
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
										Soins hydratants
									</li>
									<li className="flex items-center">
										<svg
											className="w-4 h-4 text-pink-500 mr-3"
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
										Traitements réparateurs
									</li>
								</ul>
								<div className="text-2xl font-bold text-pink-600">À partir de 35€</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Galerie - Masonry layout */}
			<section id="gallery" className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Créations</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Découvrez nos dernières réalisations et trouvez l'inspiration
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="space-y-6">
							<div className="relative overflow-hidden rounded-xl">
								<Image
									src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop&crop=center"
									alt="Coiffure moderne"
									width={400}
									height={300}
									className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
								/>
							</div>
							<div className="relative overflow-hidden rounded-xl">
								<Image
									src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=500&fit=crop&crop=center"
									alt="Coloration"
									width={400}
									height={500}
									className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
								/>
							</div>
						</div>

						<div className="space-y-6">
							<div className="relative overflow-hidden rounded-xl">
								<Image
									src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop&crop=center"
									alt="Mèches"
									width={400}
									height={500}
									className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
								/>
							</div>
							<div className="relative overflow-hidden rounded-xl">
								<Image
									src="https://images.unsplash.com/photo-1552642084-9a670e93ea50?w=400&h=300&fit=crop&crop=center"
									alt="Soins"
									width={400}
									height={300}
									className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
								/>
							</div>
						</div>

						<div className="space-y-6">
							<div className="relative overflow-hidden rounded-xl">
								<Image
									src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=300&fit=crop&crop=center"
									alt="Styling"
									width={400}
									height={300}
									className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
								/>
							</div>
							<div className="relative overflow-hidden rounded-xl">
								<Image
									src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=500&fit=crop&crop=center"
									alt="Coupe"
									width={400}
									height={500}
									className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Équipe */}
			<section id="team" className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Des professionnels passionnés à votre service
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="relative mb-6">
								<Image
									src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop&crop=face"
									alt="Marie-Claude"
									width={300}
									height={300}
									className="w-48 h-48 rounded-full object-cover mx-auto"
								/>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Marie-Claude</h3>
							<p className="text-pink-600 font-medium mb-4">Directrice & Coloriste</p>
							<p className="text-gray-600 text-sm">
								15 ans d'expérience en coloration et techniques modernes
							</p>
						</div>

						<div className="text-center">
							<div className="relative mb-6">
								<Image
									src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300&h=300&fit=crop&crop=face"
									alt="Sophie"
									width={300}
									height={300}
									className="w-48 h-48 rounded-full object-cover mx-auto"
								/>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Sophie</h3>
							<p className="text-pink-600 font-medium mb-4">Styliste</p>
							<p className="text-gray-600 text-sm">
								Spécialiste des coupes tendances et du styling
							</p>
						</div>

						<div className="text-center">
							<div className="relative mb-6">
								<Image
									src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
									alt="Camille"
									width={300}
									height={300}
									className="w-48 h-48 rounded-full object-cover mx-auto"
								/>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Camille</h3>
							<p className="text-pink-600 font-medium mb-4">Soins & Traitements</p>
							<p className="text-gray-600 text-sm">
								Experte en soins capillaires et traitements réparateurs
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Section Témoignages */}
			<section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Avis Clients</h2>
						<p className="text-xl text-gray-600">
							Ce que disent nos clientes satisfaites
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white rounded-2xl p-8 shadow-lg">
							<div className="flex items-center mb-4">
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
							<p className="text-gray-700 mb-6 italic text-lg">
								"Marie-Claude a transformé mes cheveux ! Sa technique de balayage est
								exceptionnelle et le résultat est naturel."
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
									<span className="text-pink-600 font-semibold">LM</span>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Laure M.</div>
									<div className="text-sm text-gray-600">Coloration</div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl p-8 shadow-lg">
							<div className="flex items-center mb-4">
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
							<p className="text-gray-700 mb-6 italic text-lg">
								"Équipe très professionnelle et accueillante. Sophie m'a donné une coupe
								parfaite qui me va à ravir !"
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
									<span className="text-purple-600 font-semibold">AM</span>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Anne-Marie</div>
									<div className="text-sm text-gray-600">Coupe & Styling</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Contact */}
			<section id="contact" className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<h2 className="text-4xl font-bold text-gray-900 mb-8">
						Prenez Rendez-vous
					</h2>
					<p className="text-xl text-gray-600 mb-12 leading-relaxed">
						Prête à transformer votre style ? Réservez votre créneau et laissez-nous
						vous sublimer.
					</p>

					<div className="grid md:grid-cols-2 gap-12 mb-12">
						<div>
							<div className="text-2xl font-bold mb-4">Téléphone</div>
							<div className="text-gray-600">01 42 78 56 32</div>
						</div>
						<div>
							<div className="text-2xl font-bold mb-4">Email</div>
							<div className="text-gray-600">marieclaude@coiffure-beaute.fr</div>
						</div>
					</div>

					<button className="bg-pink-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors duration-300 shadow-lg">
						RÉSERVER MAINTENANT
					</button>
				</div>
			</section>

			{/* Footer élégant */}
			<footer className="py-12 border-t border-gray-100">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center">
						<div className="text-2xl font-semibold mb-4">SALON MARIE-CLAUDE</div>
						<div className="text-gray-600 mb-4">Coiffure & Beauté</div>
						<div className="text-sm text-gray-400">
							© 2024 Salon Marie-Claude - Tous droits réservés
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default HairdresserHeroAfter;
