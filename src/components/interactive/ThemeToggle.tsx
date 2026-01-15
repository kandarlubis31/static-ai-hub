import { useState, useEffect } from 'preact/hooks';
import { Moon, Sun } from 'lucide-preact';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cek kondisi Class di HTML saat ini (Source of Truth)
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    console.log("Theme awal terdeteksi:", isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    // Logic Toggle Sederhana: Baca -> Balik -> Terapkan
    const isDarkNow = document.documentElement.classList.contains('dark');
    const newTheme = isDarkNow ? 'light' : 'dark';

    // 1. Update State React (Biar Icon Berubah)
    setTheme(newTheme);

    // 2. Manipulasi DOM (Biar Warna Berubah)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 3. Simpan ke Storage (Biar diingat pas refresh)
    localStorage.setItem('theme', newTheme);
    
    console.log("Theme berubah jadi:", newTheme);
  };

  // Jangan render sebelum client-side siap (Mencegah Hydration Mismatch)
  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Ganti Tema"
      title={theme === 'light' ? "Masuk ke Sisi Gelap" : "Kembali ke Cahaya"}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}