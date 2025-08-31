import React from "react";
import Image from "next/image";
import clsx from "clsx";

export function PhotographerHeroAfter({
	hideGlobalUI = false,
}: {
	hideGlobalUI?: boolean;
}) {
	return (
		<div className="h-full w-full overflow-autoh  bg-white font-sans">
			{/* Navigation minimaliste flottante */}
			<nav
				className={clsx(
					"fixed top-0 left-0 right-0 z-[10000] bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300",
					!hideGlobalUI ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex justify-between items-center">
						<div className="text-2xl font-light tracking-wider">
							PIERRE-ANDRÉ DUBOIS
						</div>
						<div className="hidden md:flex space-x-8 text-sm font-medium">
							<a href="#portfolio" className="hover:text-gray-600 transition-colors">
								Portfolio
							</a>
							<a href="#services" className="hover:text-gray-600 transition-colors">
								Services
							</a>
							<a href="#about" className="hover:text-gray-600 transition-colors">
								À propos
							</a>
							<a href="#contact" className="hover:text-gray-600 transition-colors">
								Contact
							</a>
						</div>
						<div className="text-sm font-medium">01 45 67 89 01</div>
					</div>
				</div>
			</nav>

			{/* Hero Section - Image en pleine largeur avec overlay minimal */}
			<section className="relative h-screen">
				<Image
					src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center"
					alt="Photographie artistique"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center text-white">
						<h1 className="text-7xl font-light tracking-wider mb-6">
							L'ART DE LA LUMIÈRE
						</h1>
						<p className="text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
							Capturer l'instant éphémère dans sa pureté absolue
						</p>
						<div className="mt-12">
							<button className="bg-white text-black px-8 py-3 text-sm font-medium tracking-wider hover:bg-gray-100 transition-colors duration-300">
								DÉCOUVRIR MON ŒUVRE
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Section Portfolio - Grille d'images */}
			<section id="portfolio" className="py-20">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-light tracking-wider mb-4">PORTFOLIO</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Une sélection de mes travaux les plus récents
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="group relative overflow-hidden">
							<Image
								src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=center"
								alt="Mariage"
								width={600}
								height={400}
								className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
								<div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
									<h3 className="text-xl font-light mb-2">Nuptiales</h3>
									<p className="text-sm">L'amour éternel</p>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden">
							<Image
								src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
								alt="Portrait"
								width={600}
								height={400}
								className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
								<div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
									<h3 className="text-xl font-light mb-2">Portraits</h3>
									<p className="text-sm">L'âme révélée</p>
								</div>
							</div>
						</div>

						<div className="group relative overflow-hidden">
							<Image
								src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center"
								alt="Événement"
								width={600}
								height={400}
								className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
								<div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
									<h3 className="text-xl font-light mb-2">Événementiel</h3>
									<p className="text-sm">L'instant préservé</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Services - Layout asymétrique */}
			<section id="services" className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-4xl font-light tracking-wider mb-8">SERVICES</h2>
							<div className="space-y-12">
								<div className="border-l-4 border-black pl-8">
									<h3 className="text-2xl font-light mb-4">Nuptiales</h3>
									<p className="text-gray-600 mb-4 leading-relaxed">
										L'amour éternel capturé dans des images qui racontent votre histoire
										unique. Reportage complet, retouches expertes et album premium inclus.
									</p>
									<div className="text-2xl font-light">À partir de 800€</div>
								</div>

								<div className="border-l-4 border-black pl-8">
									<h3 className="text-2xl font-light mb-4">Portraits</h3>
									<p className="text-gray-600 mb-4 leading-relaxed">
										L'âme révélée à travers des portraits qui capturent votre essence
										unique. Séance en studio avec direction artistique.
									</p>
									<div className="text-2xl font-light">À partir de 150€</div>
								</div>

								<div className="border-l-4 border-black pl-8">
									<h3 className="text-2xl font-light mb-4">Événementiel</h3>
									<p className="text-gray-600 mb-4 leading-relaxed">
										L'instant préservé pour des événements qui méritent d'être
										immortalisés. Couverture complète avec galerie en ligne.
									</p>
									<div className="text-2xl font-light">À partir de 300€</div>
								</div>
							</div>
						</div>

						<div className="relative">
							<Image
								src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop&crop=center"
								alt="Photographe au travail"
								width={800}
								height={600}
								className="w-full h-96 object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Section À propos - Layout créatif */}
			<section id="about" className="py-20">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-light tracking-wider mb-8">À PROPOS</h2>
						<div className="max-w-4xl mx-auto">
							<blockquote className="text-2xl font-light italic text-gray-700 leading-relaxed mb-8">
								"Chaque cliché est une fenêtre ouverte sur l'âme du monde, un instant
								figé dans l'éternité où la lumière rencontre l'émotion."
							</blockquote>
							<p className="text-lg text-gray-600 leading-relaxed">
								Pierre-André Dubois, photographe professionnel depuis 15 ans, spécialisé
								dans l'art de capturer les moments les plus précieux de votre vie. Ma
								philosophie : révéler l'essence même de l'existence à travers
								l'objectif.
							</p>
						</div>
					</div>

					<div className="grid md:grid-cols-3 gap-8 text-center">
						<div>
							<div className="text-4xl font-light mb-4">15</div>
							<div className="text-gray-600">Années d'expérience</div>
						</div>
						<div>
							<div className="text-4xl font-light mb-4">500+</div>
							<div className="text-gray-600">Séances réalisées</div>
						</div>
						<div>
							<div className="text-4xl font-light mb-4">100%</div>
							<div className="text-gray-600">Clients satisfaits</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Témoignages - Layout moderne */}
			<section className="py-20 bg-black text-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-light tracking-wider mb-4">TÉMOIGNAGES</h2>
						<p className="text-gray-300">Ce que disent mes clients</p>
					</div>

					<div className="grid md:grid-cols-2 gap-12">
						<div className="space-y-6">
							<div className="text-yellow-400">
								{[...Array(5)].map((_, i) => (
									<svg
										key={i}
										className="w-5 h-5 inline"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								))}
							</div>
							<p className="text-xl font-light leading-relaxed">
								"Pierre-André a su capturer l'essence même de notre amour. Ses photos
								sont des œuvres d'art qui transcendent la simple représentation."
							</p>
							<div className="text-sm text-gray-400">Marie et Thomas - Mariage</div>
						</div>

						<div className="space-y-6">
							<div className="text-yellow-400">
								{[...Array(5)].map((_, i) => (
									<svg
										key={i}
										className="w-5 h-5 inline"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								))}
							</div>
							<p className="text-xl font-light leading-relaxed">
								"Un artiste véritable. Il a révélé une dimension de ma personnalité que
								je ne soupçonnais pas."
							</p>
							<div className="text-sm text-gray-400">Isabelle M. - Portrait</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Contact - Layout épuré */}
			<section id="contact" className="py-20">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<h2 className="text-4xl font-light tracking-wider mb-8">CONTACT</h2>
					<p className="text-xl text-gray-600 mb-12 leading-relaxed">
						Prêt à immortaliser vos moments ? Discutons de votre projet et créons
						ensemble des images qui racontent votre histoire.
					</p>

					<div className="grid md:grid-cols-2 gap-12 mb-12">
						<div>
							<div className="text-2xl font-light mb-4">Téléphone</div>
							<div className="text-gray-600">01 45 67 89 01</div>
						</div>
						<div>
							<div className="text-2xl font-light mb-4">Email</div>
							<div className="text-gray-600">pierreandre@art-photo.fr</div>
						</div>
					</div>

					<button className="bg-black text-white px-12 py-4 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors duration-300">
						DEMANDER UN DEVIS
					</button>
				</div>
			</section>

			{/* Footer minimaliste */}
			<footer className="py-12 border-t border-gray-100">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center">
						<div className="text-2xl font-light tracking-wider mb-4">
							PIERRE-ANDRÉ DUBOIS
						</div>
						<div className="text-gray-600 mb-4">Art Photographique</div>
						<div className="text-sm text-gray-400">
							© 2024 Pierre-André Dubois - Tous droits réservés
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default PhotographerHeroAfter;
