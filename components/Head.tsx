import React from "react";
import { ThemeScript } from "./theme/ThemeScript";

const Head = () => {
	return (
		<head>
			<ThemeScript />

			{/* Google Consent Mode V2 - Configuration par défaut (refusé) */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						
						// Consent Mode V2 - Configuration par défaut (refusé)
						// Conforme aux directives RGPD et CNIL
						gtag('consent', 'default', {
							'analytics_storage': 'denied',
							'ad_user_data': 'denied',
							'ad_personalization': 'denied',
							'wait_for_update': 500
						});
					`,
				}}
			/>

			{/* Google Analytics 4 avec Consent Mode V2 */}
			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-BEJ9SX02CT"
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
						gtag('js', new Date());
						gtag('config', 'G-BEJ9SX02CT', {
							// Configuration GA4 avec Consent Mode V2
							'anonymize_ip': true,
							'allow_google_signals': false,
							'allow_ad_personalization_signals': false
						});
					`,
				}}
			/>
		</head>
	);
};

export default Head;
