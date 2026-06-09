import type { Metadata } from 'next';
import Doc from '@/components/Doc';
import { METHODOLOGY_MD } from '@/lib/authority';

export const metadata: Metadata = { title: 'Methodology', description: 'How HMID collects, verifies, and scores information.' };

export default function MethodologyPage() {
  return <Doc md={METHODOLOGY_MD} mdUrl="/methodology.md" />;
}
