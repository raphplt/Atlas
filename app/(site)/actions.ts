'use server';

import { redirect } from 'next/navigation';
import { validateContact } from '@/lib/validators';
import { sendMail } from '@/lib/mail';

export async function submitContact(formData: FormData) {
  const data = validateContact({
			firstName: String(formData.get("firstName") || ""),
			company: String(formData.get("company") || ""),
			email: String(formData.get("email") || ""),
			phone: formData.get("phone") ? String(formData.get("phone")) : undefined,
			projectType: formData.get("projectType")
				? String(formData.get("projectType"))
				: undefined,
			budget: formData.get("budget") ? String(formData.get("budget")) : undefined,
			hasSite: formData.get("hasSite")
				? (String(formData.get("hasSite")) as any)
				: undefined,
			message: String(formData.get("message") || ""),
			website: formData.get("website")
				? String(formData.get("website"))
				: undefined,
		});

		if ((data as any).website) {
			// honeypot triggered - silently abort
			redirect("/success");
		}

  if (process.env.NODE_ENV === 'production') {
    await sendMail(data);
  } else {
    console.log('contact', data);
  }

  redirect('/success');
}
