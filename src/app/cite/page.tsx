import type { Metadata } from 'next';
import Doc from '@/components/Doc';
import { CITE_MD } from '@/lib/authority';

export const metadata: Metadata = { title: 'How to Cite', description: 'How to cite the House Music Intelligence Database.' };

export default function CitePage() {
  return <Doc md={CITE_MD} mdUrl="/cite.md" />;
}
