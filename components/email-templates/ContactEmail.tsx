import type { ContactInput } from "@/lib/validators";

// E-mail reçu à chaque demande de contact (envoyé par Resend, voir lib/mail.ts).
// Styles en ligne : les clients mail ignorent les feuilles de style.

const GOALS: Record<ContactInput["projectGoal"], string> = {
  creation: "Créer son site",
  redesign: "Refaire son site",
  product: "Construire une application ou un produit",
  marketing: "Être mieux trouvé sur Google",
  other: "Autre chose",
};

const font = "'Helvetica Neue', Arial, sans-serif";
const ink = "#0d1222";
const blue = "#1f3bd9";
const muted = "#545a6b";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <td style={{ padding: "10px 0", color: muted, fontSize: 14, width: 140, verticalAlign: "top" }}>
        {label}
      </td>
      <td style={{ padding: "10px 0", color: ink, fontSize: 16 }}>{children}</td>
    </tr>
  );
}

export function ContactEmail({ data }: { data: ContactInput }) {
  return (
    <div style={{ background: "#f3f4f1", padding: "32px 16px", fontFamily: font }}>
      <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: blue, color: "#fff", padding: "28px 32px" }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>atlas</p>
          <h1 style={{ margin: "20px 0 0", fontSize: 28, lineHeight: 1.1, letterSpacing: -0.8 }}>
            Nouvelle demande de {data.firstName}
          </h1>
        </div>
        <div style={{ padding: "24px 32px 32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <Row label="Prénom">{data.firstName}</Row>
              <Row label="Entreprise">{data.company}</Row>
              <Row label="E-mail">
                <a href={`mailto:${data.email}`} style={{ color: blue }}>
                  {data.email}
                </a>
              </Row>
              {data.phone && <Row label="Téléphone">{data.phone}</Row>}
              <Row label="Projet">{GOALS[data.projectGoal]}</Row>
              {data.currentUrl && <Row label="Site actuel">{data.currentUrl}</Row>}
              {data.budget && <Row label="Budget">{data.budget}</Row>}
            </tbody>
          </table>
          {data.message && (
            <div
              style={{
                marginTop: 20,
                padding: "16px 20px",
                background: "#f3f4f1",
                borderLeft: `4px solid ${blue}`,
                borderRadius: 8,
                color: ink,
                fontSize: 16,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {data.message}
            </div>
          )}
          <p style={{ margin: "28px 0 0", color: muted, fontSize: 13 }}>
            Envoyé depuis le formulaire de contact d’Atlas. Répondez directement à cet e-mail pour
            écrire à {data.firstName}.
          </p>
        </div>
      </div>
    </div>
  );
}
