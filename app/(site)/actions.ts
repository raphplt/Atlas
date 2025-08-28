'use server';

import { redirect } from 'next/navigation';
import { validateContact } from '@/lib/validators';
import { sendMail } from '@/lib/mail';

export async function submitContact(formData: FormData) {
  const data = validateContact({
    firstName: String(formData.get('firstName') || ''),
    company: String(formData.get('company') || ''),
    email: String(formData.get('email') || ''),
    phone: formData.get('phone') ? String(formData.get('phone')) : undefined,
    message: String(formData.get('message') || ''),
  });

  if (process.env.NODE_ENV === 'production') {
    await sendMail(data);
  } else {
    console.log('contact', data);
  }

  redirect('/success');
}
