import * as React from "react";
import { ContactInput } from "@/lib/validators";

interface ContactEmailProps {
	data: ContactInput;
}

export function ContactEmail({ data }: ContactEmailProps) {
	return (
		<div
			style={{
				fontFamily: "Arial, sans-serif",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<h2
				style={{
					color: "#333",
					borderBottom: "2px solid #007bff",
					paddingBottom: "10px",
				}}
			>
				Nouveau contact reçu
			</h2>

			<div style={{ marginBottom: "20px" }}>
				<h3 style={{ color: "#555", marginBottom: "10px" }}>
					Informations du contact :
				</h3>
				<p>
					<strong>Nom :</strong> {data.firstName}
				</p>
				<p>
					<strong>Entreprise :</strong> {data.company}
				</p>
				<p>
					<strong>Email :</strong> {data.email}
				</p>
				{data.phone && (
					<p>
						<strong>Téléphone :</strong> {data.phone}
					</p>
				)}
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h3 style={{ color: "#555", marginBottom: "10px" }}>Détails du projet :</h3>
				<p>
					<strong>Type de projet :</strong> {data.projectType}
				</p>
				<p>
					<strong>Budget :</strong> {data.budget}
				</p>
				<p>
					<strong>Possède déjà un site :</strong> {data.hasSite ? "Oui" : "Non"}
				</p>
			</div>

			{data.message && (
				<div style={{ marginBottom: "20px" }}>
					<h3 style={{ color: "#555", marginBottom: "10px" }}>Message :</h3>
					<div
						style={{
							backgroundColor: "#f8f9fa",
							padding: "15px",
							borderLeft: "4px solid #007bff",
							borderRadius: "4px",
						}}
					>
						<p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{data.message}</p>
					</div>
				</div>
			)}

			<div
				style={{
					marginTop: "30px",
					padding: "15px",
					backgroundColor: "#e9ecef",
					borderRadius: "4px",
					fontSize: "14px",
					color: "#666",
				}}
			>
				<p style={{ margin: 0 }}>
					Email envoyé automatiquement depuis le formulaire de contact
				</p>
			</div>
		</div>
	);
}
