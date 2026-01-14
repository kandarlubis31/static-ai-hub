import { useState } from 'preact/hooks';
import { Copy, Check } from 'lucide-preact';

interface Props {
  text: string;
}

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Balik normal setelah 2 detik
    } catch (err) {
      console.error('Gagal copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 border ${
        copied
          ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
      }`}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Tersalin!' : 'Copy'}
    </button>
  );
}