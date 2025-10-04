import React from "react";
import { ThemeScript } from "./theme/ThemeScript";

const Head = () => {
	return (
		<head>
			<ThemeScript />

			<script
				defer
				data-domain="atlas.raphael-plassart.com"
				src="https://plausible.io/js/script.outbound-links.tagged-events.js"
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
						window.plausible = window.plausible || function() {
							(window.plausible.q = window.plausible.q || []).push(arguments);
						};
					`,
				}}
			/>
		</head>
	);
};

export default Head;
