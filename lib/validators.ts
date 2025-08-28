export interface ContactInput {
  firstName: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export function validateContact(data: ContactInput): ContactInput {
  if (!data.firstName) throw new Error("Prénom requis");
  if (!data.company) throw new Error("Entreprise requise");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error("Email invalide");
  if (!data.message) throw new Error("Message requis");
  return data;
}
