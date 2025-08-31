import React from "react";
import Image from "next/image";
import clsx from "clsx";

export function PlumberHeroAfter({
	hideGlobalUI = false,
}: {
	hideGlobalUI?: boolean;
}) {
	return (
		<div className="h-full w-full overflow-auto bg-white font-sans">
			{/* Header moderne et professionnel */}
			<header
				className={clsx(
					"bg-white shadow-sm border-b border-gray-100 sticky top-0 z-[10000] transition-all duration-300",
					!hideGlobalUI ? "opacity-0 pointer-events-none" : "opacity-100"
				)}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center space-x-4">
							<div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
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
										d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
									/>
								</svg>
							</div>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">DÉPANNAGE EXPRESS</h1>
								<p className="text-sm text-gray-600">
									Plomberie • Électricité • Chauffage
								</p>
							</div>
						</div>
						<div className="hidden md:flex items-center space-x-8">
							<div className="flex items-center space-x-2">
								<svg
									className="w-5 h-5 text-blue-600"
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
								<span className="text-gray-900 font-medium">01 23 45 67 89</span>
							</div>
							<div className="flex items-center space-x-2">
								<svg
									className="w-5 h-5 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
									/>
								</svg>
								<span className="text-gray-900 font-medium">06 12 34 56 78</span>
							</div>
							<button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
								Devis Gratuit
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section avec image de fond */}
			<section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
				<Image
					src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&crop=center"
					alt="Plomberie professionnelle"
					fill
					className="object-cover opacity-50"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
					<div className="max-w-2xl">
						<div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full mb-6">
							<svg
								className="w-4 h-4 mr-2"
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
							Intervention rapide 7j/7 - 24h/24
						</div>
						<h1 className="text-5xl font-bold text-white mb-6 leading-tight">
							Votre expert en
							<span className="text-blue-200"> plomberie</span>
							<br />
							et maintenance
						</h1>
						<p className="text-xl text-blue-100 mb-8 leading-relaxed">
							Intervention rapide, devis gratuit et garantie satisfait ou remboursé.
							Plus de 15 ans d'expérience au service des particuliers et
							professionnels.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg">
								Devis Gratuit
							</button>
							<button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
								Urgence 24h/24
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Section Services */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Des solutions complètes pour tous vos besoins en plomberie, électricité
							et chauffage
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Plomberie */}
						<div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
							<div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
								<svg
									className="w-8 h-8 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Plomberie</h3>
							<ul className="space-y-3 text-gray-600 mb-6">
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
									Réparation fuites et canalisations
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
									Installation sanitaires
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
									Débouchage et nettoyage
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
									Maintenance préventive
								</li>
							</ul>
							<div className="text-2xl font-bold text-blue-600">À partir de 45€/h</div>
						</div>

						{/* Électricité */}
						<div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
							<div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
								<svg
									className="w-8 h-8 text-yellow-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Électricité</h3>
							<ul className="space-y-3 text-gray-600 mb-6">
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
									Installation électrique
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
									Dépannage panne électrique
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
									Mise aux normes
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
									Tableaux électriques
								</li>
							</ul>
							<div className="text-2xl font-bold text-yellow-600">
								À partir de 50€/h
							</div>
						</div>

						{/* Chauffage */}
						<div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
							<div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
								<svg
									className="w-8 h-8 text-red-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Chauffage</h3>
							<ul className="space-y-3 text-gray-600 mb-6">
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
									Installation chaudière
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
									Dépannage chauffage
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
									Maintenance système
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
									Optimisation énergétique
								</li>
							</ul>
							<div className="text-2xl font-bold text-red-600">À partir de 55€/h</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section Avantages */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Pourquoi nous choisir ?
						</h2>
						<p className="text-xl text-gray-600">
							Des garanties qui font la différence
						</p>
					</div>

					<div className="grid md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-10 h-10 text-blue-600"
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
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								Intervention Rapide
							</h3>
							<p className="text-gray-600">
								Disponible 7j/7 et 24h/24 pour les urgences
							</p>
						</div>

						<div className="text-center">
							<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-10 h-10 text-green-600"
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
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								Garantie Satisfait
							</h3>
							<p className="text-gray-600">
								Satisfait ou remboursé sur tous nos services
							</p>
						</div>

						<div className="text-center">
							<div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-10 h-10 text-yellow-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								Équipe Qualifiée
							</h3>
							<p className="text-gray-600">15 ans d'expérience et certifications</p>
						</div>

						<div className="text-center">
							<div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-10 h-10 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">Devis Gratuit</h3>
							<p className="text-gray-600">Estimation précise sans engagement</p>
						</div>
					</div>
				</div>
			</section>

			{/* Section Témoignages */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Avis Clients</h2>
						<p className="text-xl text-gray-600">
							Ce que disent nos clients satisfaits
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white rounded-xl shadow-lg p-8">
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
							<p className="text-gray-600 mb-6 italic">
								"Intervention rapide et professionnelle. Le technicien a résolu notre
								problème de fuite en moins d'une heure. Très satisfait du service !"
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
									<span className="text-blue-600 font-semibold">ML</span>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Marie Laurent</div>
									<div className="text-sm text-gray-600">Paris 16ème</div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-lg p-8">
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
							<p className="text-gray-600 mb-6 italic">
								"Équipe très professionnelle et ponctuelle. Devis respecté et travail
								soigné. Je recommande vivement !"
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
									<span className="text-green-600 font-semibold">PM</span>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Pierre Martin</div>
									<div className="text-sm text-gray-600">Neuilly-sur-Seine</div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-lg p-8">
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
							<p className="text-gray-600 mb-6 italic">
								"Service d'urgence exceptionnel. Intervention en moins de 30 minutes
								pour un problème de chauffage. Excellent rapport qualité-prix."
							</p>
							<div className="flex items-center">
								<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
									<span className="text-purple-600 font-semibold">SD</span>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Sophie Dubois</div>
									<div className="text-sm text-gray-600">Boulogne-Billancourt</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Section CTA */}
			<section className="py-20 bg-blue-600">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold text-white mb-6">
						Besoin d'une intervention ?
					</h2>
					<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
						Notre équipe est disponible 24h/24 pour répondre à vos urgences et vous
						proposer des solutions adaptées.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200">
							Devis Gratuit
						</button>
						<button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
							Appeler Maintenant
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-xl font-bold mb-4">DÉPANNAGE EXPRESS</h3>
							<p className="text-gray-400 mb-4">
								Votre expert en plomberie, électricité et chauffage depuis plus de 15
								ans.
							</p>
							<div className="flex space-x-4">
								<div className="flex items-center">
									<svg
										className="w-5 h-5 text-blue-400 mr-2"
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
									<span className="text-gray-400">01 23 45 67 89</span>
								</div>
							</div>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Services</h4>
							<ul className="space-y-2 text-gray-400">
								<li>Plomberie</li>
								<li>Électricité</li>
								<li>Chauffage</li>
								<li>Maintenance</li>
							</ul>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Zones d'intervention</h4>
							<ul className="space-y-2 text-gray-400">
								<li>Paris</li>
								<li>Hauts-de-Seine</li>
								<li>Seine-Saint-Denis</li>
								<li>Val-de-Marne</li>
							</ul>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Contact</h4>
							<div className="space-y-2 text-gray-400">
								<p>📞 01 23 45 67 89</p>
								<p>📱 06 12 34 56 78</p>
								<p>📧 contact@depannage-express.fr</p>
								<p>🕒 24h/24 - 7j/7</p>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; 2024 Dépannage Express. Tous droits réservés.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default PlumberHeroAfter;
