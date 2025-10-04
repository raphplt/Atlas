import React from "react";
import { ThemeScript } from "./theme/ThemeScript";

const Head = () => {
	return (
		<head>
			<ThemeScript />

			<script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-BEJ9SX02CT"
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-BEJ9SX02CT');
					`,
				}}
			/>
		</head>
	);
};

export default Head;
