import type { Metadata } from 'next';
import Doc from '@/components/Doc';
import { ABOUT_MD } from '@/lib/authority';

export const metadata: Metadata = { title: 'About', description: 'The mission and standards of the House Music Intelligence Database.' };

export default function AboutPage() {
  return <Doc md={ABOUT_MD} mdUrl="/about.md" />;
}
