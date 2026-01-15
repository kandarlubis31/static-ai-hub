import { useState, useMemo } from 'preact/hooks';
import { Copy, Trash2, Zap, Save, Download } from 'lucide-preact'; // Tambah Icon Download
import { addToast } from '../../lib/toastStore';

// Definisi Tipe Data Form
interface FormData {
  role: string;
  task: string;
  context: string;
  tone: string;
  format: string;
  language: string;
}

// Data Presets (Dipisah biar rapi & performa lebih baik)
const PRESETS = {
  coding: {
    role: 'Senior Software Engineer',
    task: 'Refactor kode berikut agar lebih bersih, modular, dan mengikuti prinsip SOLID.',
    context: 'Kode ini ditulis oleh junior developer dan menggunakan terlalu banyak nested loops.',
    tone: 'Technical & Constructive',
    format: 'Code Block with Explanation',
    language: 'English'
  },
  writing: {
    role: 'Copywriter Profesional',
    task: 'Buat 5 variasi headline untuk iklan Facebook produk kopi kekinian.',
    context: 'Target audiens adalah pekerja kantoran usia 25-35 tahun yang butuh energi pagi.',
    tone: 'Persuasive & Energetic',
    format: 'List',
    language: 'Indonesia'
  },
  learning: {
    role: 'Dosen Fisika Kuantum',
    task: 'Jelaskan konsep "Schrödinger\'s cat" kepada saya.',
    context: 'Saya tidak punya background sains, jadi gunakan analogi sehari-hari.',
    tone: 'Educational & Fun',
    format: 'Analogy + Summary',
    language: 'Indonesia'
  }
};

export default function PromptBuilder() {
  const defaultState: FormData = {
    role: '',
    task: '',
    context: '',
    tone: 'Professional',
    format: 'Bullet Points',
    language: 'Indonesia'
  };

  const [formData, setFormData] = useState<FormData>(defaultState);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // --- LOGIC PRESET ---
  const applyPreset = (type: keyof typeof PRESETS) => {
    setFormData(PRESETS[type]);
    addToast('Preset berhasil diterapkan!', 'info');
  };

  const handleReset = () => {
    setFormData(defaultState);
    setShowResetConfirm(false);
    addToast('Form berhasil direset', 'info');
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- FITUR BARU: BACKUP DATA (Download JSON) ---
  const handleBackup = () => {
    try {
      const saved = localStorage.getItem('my_prompts');
      if (!saved || saved === '[]') {
        addToast('Belum ada draft untuk dibackup', 'info');
        return;
      }
      
      // Buat file JSON dan download otomatis
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(saved);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `static-ai-hub-backup-${Date.now()}.json`);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      addToast('Backup berhasil didownload!', 'success');
    } catch (e) {
      addToast('Gagal membackup data', 'error');
    }
  };

  // --- USE MEMO (Generator Prompt) ---
  const generatedPrompt = useMemo(() => {
    return `Act as a ${formData.role || '[ROLE]'}.
Your task is to: ${formData.task || '[TASK]'}

Context:
${formData.context || '[CONTEXT]'}

Please write in ${formData.language} using a ${formData.tone} tone.
Output format: ${formData.format}.`;
  }, [formData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      addToast('Prompt berhasil disalin!', 'success');
    } catch (err) {
      addToast('Gagal menyalin text', 'error');
    }
  };

  // --- LOGIC SAVE (LocalStorage) ---
  const handleSave = () => {
    if (!formData.role || !formData.task) {
      addToast('Isi minimal Role dan Task dulu bos!', 'error');
      return;
    }

    const newPrompt = {
      id: 'local-' + Date.now(),
      data: {
        title: `[Draft] ${formData.role}`,
        description: `Draft personal: ${formData.task.substring(0, 50)}...`,
        role: 'Personal',
        category: 'Draft',
        tags: ['personal', 'draft']
      },
      body: generatedPrompt,
      slug: '#'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('my_prompts') || '[]');
      localStorage.setItem('my_prompts', JSON.stringify([newPrompt, ...existing]));
      addToast('Draft berhasil disimpan ke Library!', 'success');
    } catch (e) {
      addToast('Gagal menyimpan, storage penuh?', 'error');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      
      {/* KOLOM KIRI: FORM INPUT */}
      <div className="space-y-6">
        
        {/* Preset & Reset Wrapper */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Zap size={14} className="text-yellow-500" /> Quick Fill (Contoh)
            </p>
            
            <div className="flex gap-1">
                {/* Tombol Backup */}
                <button 
                  onClick={handleBackup} 
                  className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors rounded" 
                  title="Backup semua draft (Download JSON)"
                >
                  <Download size={16} />
                </button>

                {/* Tombol Reset */}
                <button 
                  onClick={() => setShowResetConfirm(true)} 
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded" 
                  title="Reset Form"
                >
                  <Trash2 size={16} />
                </button>
            </div>
          </div>

          {/* Dialog Konfirmasi Reset */}
          {showResetConfirm && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-3 flex items-center justify-between animate-fade-in">
              <span className="text-sm text-red-700 dark:text-red-300">Yakin reset form?</span>
              <div className="flex gap-2">
                <button onClick={handleReset} className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Ya</button>
                <button onClick={() => setShowResetConfirm(false)} className="text-xs bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-400">Batal</button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button onClick={() => applyPreset('coding')} className="preset-btn">🤖 Coding</button>
            <button onClick={() => applyPreset('writing')} className="preset-btn">✍️ Writing</button>
            <button onClick={() => applyPreset('learning')} className="preset-btn">🎓 Learning</button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
          
          <div>
            <label className="form-label">Role (Peran AI)</label>
            <input type="text" name="role" value={formData.role} onInput={handleChange} placeholder="Contoh: Senior Python Developer..." className="form-input" />
          </div>

          <div>
            <label className="form-label">Task (Tugas Utama)</label>
            <textarea name="task" rows={3} value={formData.task} onInput={handleChange} placeholder="Apa yang harus AI kerjakan?" className="form-input"></textarea>
          </div>

          <div>
            <label className="form-label">Context (Detail Tambahan)</label>
            <textarea name="context" rows={2} value={formData.context} onInput={handleChange} placeholder="Batasan, latar belakang..." className="form-input"></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Tone</label>
              <select name="tone" value={formData.tone} onChange={handleChange} className="form-input">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Sarcastic</option>
                <option>Academic</option>
                <option>Persuasive</option>
                <option>Eli5</option>
              </select>
            </div>
            <div>
              <label className="form-label">Format</label>
              <select name="format" value={formData.format} onChange={handleChange} className="form-input">
                <option>Bullet Points</option>
                <option>Step-by-Step Guide</option>
                <option>Markdown Table</option>
                <option>JSON Code</option>
                <option>Essay</option>
              </select>
            </div>
            <div>
              <label className="form-label">Bahasa</label>
              <select name="language" value={formData.language} onChange={handleChange} className="form-input">
                <option>Indonesia</option>
                <option>English</option>
                <option>Mandarin (中文)</option>
                <option>Japanese (日本語)</option>
                <option>Javanese (Basa Jawa)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* KOLOM KANAN: PREVIEW */}
      <div className="lg:sticky lg:top-24">
        <div className="bg-gray-900 text-gray-300 rounded-xl shadow-2xl overflow-hidden border border-gray-800 flex flex-col h-[600px] lg:h-[700px]">
          
          <div className="bg-gray-950 px-4 py-3 border-b border-gray-800 flex justify-between items-center">
            <span className="text-xs font-mono text-blue-400 font-bold tracking-wider">PREVIEW</span>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all bg-gray-700 text-white hover:bg-gray-600 hover:scale-105 active:scale-95"
              >
                <Save size={14} /> Simpan Draft
              </button>

              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95"
              >
                <Copy size={14} /> Copy
              </button>
            </div>
          </div>

          <div className="p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto flex-grow custom-scrollbar">
            <span className="text-purple-400 font-bold">Act as a </span>
            <span className="text-white border-b border-gray-700 pb-0.5">{formData.role || '...'}</span>.
            <br /><br />
            <span className="text-purple-400 font-bold">Your task is to: </span>
            <span className="text-white">{formData.task || '...'}</span>
            <br /><br />
            <span className="text-purple-400 font-bold">Context:</span><br />
            <span className="text-gray-400 italic">{formData.context || '...'}</span>
            <br /><br />
            Please write in <span className="text-yellow-400">{formData.language}</span> using a <span className="text-yellow-400">{formData.tone}</span> tone.
            <br />
            Output format: <span className="text-green-400">{formData.format}</span>.
          </div>

          <div className="bg-gray-950 px-4 py-2 text-[10px] text-gray-600 text-center border-t border-gray-800">
            Siap dipaste ke ChatGPT, Claude, DeepSeek, atau Gemini.
          </div>
        </div>
      </div>
    </div>
  );
}