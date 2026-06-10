'use client';
import { useEffect, useState } from 'react';

const SIZES = [
  { key: 'sm', label: 'A', cls: 'text-xs' },
  { key: 'md', label: 'A', cls: 'text-sm' },
  { key: 'lg', label: 'A', cls: 'text-base' },
  { key: 'xl', label: 'A', cls: 'text-lg' },
] as const;

// Adjusts the font size of the directory (#directory) and remembers the choice.
export default function FontSizeControl() {
  const [size, setSize] = useState<string>('md');

  useEffect(() => {
    const saved = localStorage.getItem('hmid-dir-font') || 'md';
    apply(saved);
    setSize(saved);
  }, []);

  function apply(s: string) {
    const el = document.getElementById('directory');
    if (el) el.setAttribute('data-font', s);
  }

  function choose(s: string) {
    setSize(s);
    apply(s);
    localStorage.setItem('hmid-dir-font', s);
  }

  return (
    <div className="flex items-center gap-1" title="Directory text size">
      <span className="text-xs text-muted mr-1">Text size</span>
      {SIZES.map((s) => (
        <button
          key={s.key}
          onClick={() => choose(s.key)}
          aria-label={`Font size ${s.key}`}
          className={`px-2 py-0.5 rounded border ${s.cls} ${size === s.key ? 'bg-accent border-accent text-white' : 'border-edge text-muted hover:border-accent'}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
