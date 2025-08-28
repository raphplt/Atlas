'use client';

export function track(event: string) {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.plausible && window.plausible(event);
  }
}
