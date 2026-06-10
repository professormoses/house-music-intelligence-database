import type { Metadata } from 'next';
import Doc from '@/components/Doc';
import { LICENSE_MD } from '@/lib/authority';

export const metadata: Metadata = { title: 'Data License & Terms', description: 'License and terms of use for the House Music Intelligence Database.' };

export default function LicensePage() {
  return <Doc md={LICENSE_MD} mdUrl="/license.md" />;
}
