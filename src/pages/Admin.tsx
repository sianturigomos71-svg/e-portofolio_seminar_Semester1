import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Lock, LogOut, Upload, Trash2, FileText, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Eye, Download } from 'lucide-react';
import { supabase, REFLECTION_BUCKET } from '@/lib/supabase';

export interface ArtifactItem {
  id: string;
  title: string;
  description: string;
  category: string;
  file_name: string;
  storage_path: string;
  created_at: string;
}

const CATEGORIES = [
  { id: 'Siklus 1', label: 'Siklus 1 - Bola Basket' },
  { id: 'Siklus 2', label: 'Siklus 2 - Lompat Jauh' },
  { id: 'Siklus 3', label: 'Siklus 3 - Senam Berirama' },
  { id: 'Umum', label: 'Dokumen / Artefak Umum' },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Form Login State
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Management State
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Upload Form State
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Siklus 1');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  // Notification Message
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('admin_logged_in');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      fetchArtifacts();
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (loginEmail.trim() === 'gomossianturi71@gmail.com' && loginPassword === 'Sianturi71') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_logged_in', 'true');
      fetchArtifacts();
    } else {
      setLoginError('Email atau Kata Sandi salah. Akses ditolak!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_logged_in');
  };

  const fetchArtifacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('artifacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        const { data: refData } = await (supabase as any)
          .from('reflection_documents')
          .select('*')
          .order('upload_date', { ascending: false });

        if (refData) {
          const mapped = refData.map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            description: doc.description || '',
            category: doc.course_id || 'Umum',
            file_name: doc.file_name,
            storage_path: doc.storage_path,
            created_at: doc.upload_date,
          }));
          setArtifacts(mapped);
        }
      } else if (data) {
        setArtifacts(data as ArtifactItem[]);
      }
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      setMessage({ type: 'error', text: 'Harap isi judul dan pilih file terlebih dahulu.' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `artifacts/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from(REFLECTION_BUCKET)
        .upload(filePath, file);

      if (storageError) throw storageError;

      const newArtifact = {
        title: title.trim(),
        category,
        description: description.trim(),
        file_name: file.name,
        storage_path: filePath,
        created_at: new Date().toISOString(),
      };

      const { error: dbError } = await (supabase as any).from('artifacts').insert([newArtifact]);

      if (dbError) {
        await (supabase as any).from('reflection_documents').insert([
          {
            course_id: category,
            title: title.trim(),
            description: description.trim(),
            file_name: file.name,
            storage_path: filePath,
            upload_date: new Date().toISOString(),
          },
        ]);
      }

      setMessage({ type: 'success', text: 'Artefak berhasil diunggah ke website!' });
      setTitle('');
      setDescription('');
      setFile(null);
      fetchArtifacts();
    } catch (err: any) {
      console.error('Error upload:', err);
      setMessage({ type: 'error', text: `Gagal mengunggah file: ${err.message || 'Terjadi kesalahan'}` });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artefak ini dari publik?')) return;

    try {
      await supabase.storage.from(REFLECTION_BUCKET).remove([storagePath]);
      await (supabase as any).from('artifacts').delete().eq('id', id);
      await (supabase as any).from('reflection_documents').delete().eq('id', id);

      setMessage({ type: 'success', text: 'Artefak berhasil dihapus.' });
      fetchArtifacts();
    } catch (err) {
      console.error('Error delete:', err);
      setMessage({ type: 'error', text: 'Gagal menghapus file.' });
    }
  };

  const getPublicUrl = (storagePath: string) => {
    const { data } = supabase.storage.from(REFLECTION_BUCKET).getPublicUrl(storagePath);
    return data.publicUrl;
  };

  if (!isAuthenticated) {
    return (
      <div className="fade-in max-w-md mx-auto px-6 py-20">
        <div className="bg-paper-warm border border-line p-8 rounded-sm shadow-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-ppg/10 text-ppg rounded-full mb-3">
              <Lock size={24} />
            </div>
            <h1 className="font-serif text-2xl text-ink font-semibold">Login Kelola Web</h1>
            <p className="font-serif text-sm text-ink-soft mt-1">
              Khusus Admin untuk mengunggah & mengelola artefak
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 font-serif text-xs rounded-sm mb-4 flex items-center gap-2">
              <AlertCircle size={16} /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-serif text-xs font-semibold text-ink mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="gomossianturi71@gmail.com"
                className="w-full px-3.5 py-2 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
                required
              />
            </div>

            <div>
              <label className="block font-serif text-xs font-semibold text-ink mb-1">Kata Sandi</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full font-serif text-sm text-white bg-ppg py-2.5 rounded-sm hover:bg-ppg-dark transition-colors duration-200 mt-2 font-semibold"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-serif text-xs text-ppg font-semibold bg-ppg/10 px-3 py-1 rounded-sm inline-flex items-center gap-1 mb-2">
            <ShieldCheck size={14} /> Terautentikasi: gomossianturi71@gmail.com
          </span>
          <h1 className="font-serif text-3xl text-ink font-semibold">Panel Kelola Artefak</h1>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 font-serif text-xs text-rose-700 border border-rose-300 px-4 py-2 rounded-sm hover:bg-rose-50 transition-colors"
        >
          <LogOut size={16} /> Keluar (Logout)
        </button>
      </div>

      <hr className="border-line mb-10" />

      {/* Form Upload Admin */}
      <section className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm mb-12">
        <h2 className="font-serif text-xl text-ink font-semibold mb-6 flex items-center gap-2">
          <Upload className="text-ppg" size={22} /> Unggah Artefak Baru
        </h2>

        {message && (
          <div
            className={`p-4 rounded-sm mb-6 font-serif text-sm flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-serif text-sm text-ink font-semibold mb-2">
                Judul Artefak <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Modul Ajar Siklus 1 - Lay-up Basket"
                className="w-full px-4 py-2.5 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
                required
              />
            </div>

            <div>
              <label className="block font-serif text-sm text-ink font-semibold mb-2">
                Kategori / Siklus
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-serif text-sm text-ink font-semibold mb-2">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tambahkan catatan singkat..."
              rows={3}
              className="w-full px-4 py-2.5 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
            />
          </div>

          <div>
            <label className="block font-serif text-sm text-ink font-semibold mb-2">
              Pilih File Dokumen (PDF, Word, Gambar) <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="w-full px-4 py-2 border border-line rounded-sm bg-white font-serif text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-ppg file:text-white hover:file:bg-ppg-dark"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center gap-2 font-serif text-sm text-white bg-ppg px-6 py-3 rounded-sm hover:bg-ppg-dark transition-colors duration-200 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Mengunggah...
              </>
            ) : (
              <>
                <Upload size={18} /> Unggah Artefak Sekarang
              </>
            )}
          </button>
        </form>
      </section>

      {/* Manajemen Hapus File */}
      <section className="space-y-6">
        <h2 className="font-serif text-xl text-ink font-semibold flex items-center gap-2 border-b border-line pb-3">
          <FileText className="text-ppg" size={22} /> Kelola File Terunggah
        </h2>

        {loading ? (
          <div className="text-center py-10 font-serif text-ink-muted">Memuat data...</div>
        ) : artifacts.length === 0 ? (
          <p className="font-serif text-sm text-ink-muted">Belum ada file yang diunggah.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artifacts.map((item) => {
              const fileUrl = getPublicUrl(item.storage_path);
              return (
                <div key={item.id} className="bg-white border border-line p-5 rounded-sm flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-serif text-xs font-semibold text-ppg bg-ppg/10 px-2 py-0.5 rounded-sm mb-2 inline-block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base text-ink font-semibold">{item.title}</h3>
                    <p className="font-serif text-xs text-ink-muted truncate mt-1">📄 {item.file_name}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-line-soft">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-serif text-xs text-ppg border border-ppg px-3 py-1 rounded-sm hover:bg-ppg hover:text-white transition-colors"
                    >
                      <Eye size={13} /> Lihat
                    </a>

                    <a
                      href={fileUrl}
                      download={item.file_name}
                      className="inline-flex items-center gap-1 font-serif text-xs text-ink-soft border border-line px-3 py-1 rounded-sm hover:bg-paper-warm transition-colors"
                    >
                      <Download size={13} /> Unduh
                    </a>

                    <button
                      onClick={() => handleDelete(item.id, item.storage_path)}
                      className="inline-flex items-center gap-1 font-serif text-xs text-rose-600 border border-rose-200 px-3 py-1 rounded-sm hover:bg-rose-50 transition-colors ml-auto"
                    >
                      <Trash2 size={13} /> Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
