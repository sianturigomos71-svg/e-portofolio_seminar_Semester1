import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Lock, LogOut, Upload, Trash2, FileText, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Eye, Download, Files } from 'lucide-react';
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

const COURSES = [
  { id: 'Filosofi Pendidikan Indonesia', label: 'Filosofi Pendidikan Indonesia' },
  { id: 'Pemahaman Peserta Didik', label: 'Pemahaman tentang Peserta Didik & Pembelajarannya' },
  { id: 'Prinsip Pengajaran & Asesmen I', label: 'Prinsip Pengajaran & Asesmen I' },
  { id: 'Pembelajaran Berdiferensiasi', label: 'Pembelajaran Berdiferensiasi' },
  { id: 'PPL I', label: 'PPL I' },
  { id: 'Seminar PPG', label: 'Seminar Pendidikan Profesi Guru' },
  { id: 'Mata Kuliah Lainnya', label: 'Mata Kuliah Lainnya / Umum' },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [artifacts, setArtifacts] = useState<ArtifactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const [category, setCategory] = useState<string>(COURSES[0].id);
  const [baseTitle, setBaseTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

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
      const { data, error } = await supabase
        .from('reflection_documents')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) {
        console.error('Error fetching data:', error);
      } else if (data) {
        const mapped: ArtifactItem[] = data.map((doc: any) => ({
          id: String(doc.id || ''),
          title: String(doc.title || ''),
          description: String(doc.description || ''),
          category: String(doc.course_id || 'Mata Kuliah Lainnya'),
          file_name: String(doc.file_name || ''),
          storage_path: String(doc.storage_path || ''),
          created_at: String(doc.upload_date || new Date().toISOString()),
        }));
        setArtifacts(mapped);
      }
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Pilih minimal satu file untuk diunggah.' });
      return;
    }

    setUploading(true);
    setMessage(null);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < files.length; i++) {
      const selectedFile = files[i];
      try {
        const cleanFileName = selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueStorageName = Date.now() + '_' + Math.random().toString(36).substring(2, 6) + '_' + cleanFileName;
        const filePath = 'artifacts/' + uniqueStorageName;

        const { error: storageError } = await supabase.storage
          .from(REFLECTION_BUCKET)
          .upload(filePath, selectedFile);

        if (storageError) throw storageError;

        const artifactTitle = baseTitle.trim()
          ? baseTitle.trim() + ' - ' + selectedFile.name.replace(/\.[^/.]+$/, '')
          : selectedFile.name.replace(/\.[^/.]+$/, '');

        const { error: dbError } = await supabase.from('reflection_documents').insert([
          {
            course_id: category,
            title: artifactTitle,
            description: description.trim(),
            file_name: selectedFile.name,
            storage_path: filePath,
            upload_date: new Date().toISOString(),
          },
        ]);

        if (dbError) throw dbError;

        successCount++;
      } catch (err) {
        console.error('Gagal unggah file:', err);
        failCount++;
      }
    }

    if (successCount > 0) {
      setMessage({
        type: 'success',
        text: 'Berhasil mengunggah ' + successCount + ' file artefak!' + (failCount > 0 ? ' (' + failCount + ' file gagal)' : ''),
      });
      setBaseTitle('');
      setDescription('');
      setFiles([]);
      fetchArtifacts();
    } else {
      setMessage({ type: 'error', text: 'Gagal mengunggah file. Silakan periksa koneksi atau pengaturan Supabase.' });
    }

    setUploading(false);
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artefak ini?')) return;

    try {
      if (storagePath) {
        await supabase.storage.from(REFLECTION_BUCKET).remove([storagePath]);
      }

      const { error: dbErr } = await supabase.from('reflection_documents').delete().eq('id', id);

      if (dbErr) throw dbErr;

      setMessage({ type: 'success', text: 'Artefak berhasil dihapus secara permanen.' });
      setArtifacts((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error('Error delete:', err);
      setMessage({
        type: 'error',
        text: 'Gagal menghapus file dari database.',
      });
    }
  };

  const getPublicUrl = (storagePath: string) => {
    const { data } = supabase.storage.from(REFLECTION_BUCKET).getPublicUrl(storagePath);
    return data.publicUrl;
  };

  if (!isAuthenticated) {
    return (
      <div className="fade-in max-w-md mx-auto px-6 py-20" translate="no">
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

          {loginError ? (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 font-serif text-xs rounded-sm mb-4 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          ) : null}

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
              <span>Masuk</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16" translate="no">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-serif text-xs text-ppg font-semibold bg-ppg/10 px-3 py-1 rounded-sm inline-flex items-center gap-1 mb-2">
            <ShieldCheck size={14} />
            <span>Terautentikasi: gomossianturi71@gmail.com</span>
          </span>
          <h1 className="font-serif text-3xl text-ink font-semibold">Panel Kelola Artefak</h1>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 font-serif text-xs text-rose-700 border border-rose-300 px-4 py-2 rounded-sm hover:bg-rose-50 transition-colors"
        >
          <LogOut size={16} />
          <span>Keluar (Logout)</span>
        </button>
      </div>

      <hr className="border-line mb-10" />

      <section className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm mb-12">
        <h2 className="font-serif text-xl text-ink font-semibold mb-2 flex items-center gap-2">
          <Upload className="text-ppg" size={22} />
          <span>Unggah Artefak (Sekaligus Banyak)</span>
        </h2>
        <p className="font-serif text-xs text-ink-soft mb-6">
          Kamu bisa memilih beberapa file sekaligus (misal 6 file PDF) untuk satu mata kuliah.
        </p>

        {message ? (
          <div
            className={
              'p-4 rounded-sm mb-6 font-serif text-sm flex items-center gap-3 ' +
              (message.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800')
            }
          >
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        ) : null}

        <form onSubmit={handleUpload} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-serif text-sm text-ink font-semibold mb-2">
                Pilih Mata Kuliah <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
              >
                {COURSES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-serif text-sm text-ink font-semibold mb-2">
                Awalan Judul (Opsional)
              </label>
              <input
                type="text"
                value={baseTitle}
                onChange={(e) => setBaseTitle(e.target.value)}
                placeholder="Contoh: Modul & LKPD (Kosongkan jika pakai nama file)"
                className="w-full px-4 py-2.5 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
              />
            </div>
          </div>

          <div>
            <label className="block font-serif text-sm text-ink font-semibold mb-2">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tambahkan deskripsi ringkas yang berlaku untuk file-file ini..."
              rows={2}
              className="w-full px-4 py-2.5 border border-line rounded-sm bg-white font-serif text-sm focus:outline-none focus:border-ppg"
            />
          </div>

          <div>
            <label className="block font-serif text-sm text-ink font-semibold mb-2">
              Pilih File Dokumen (Bisa Pilih Banyak File Sekaligus) <span className="text-rose-500">*</span>
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="w-full px-4 py-2 border border-line rounded-sm bg-white font-serif text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-ppg file:text-white hover:file:bg-ppg-dark"
              required
            />
            {files.length > 0 ? (
              <p className="font-serif text-xs text-ppg font-semibold mt-2 flex items-center gap-1">
                <Files size={14} />
                <span>{files.length} file dipilih dan siap diunggah.</span>
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={uploading || files.length === 0}
            className="inline-flex items-center gap-2 font-serif text-sm text-white bg-ppg px-6 py-3 rounded-sm hover:bg-ppg-dark transition-colors duration-200 disabled:opacity-50"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                <span>Mengunggah {files.length} File...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload size={18} />
                <span>Unggah {files.length > 0 ? files.length + ' File' : ''} Sekarang</span>
              </span>
            )}
          </button>
        </form>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-xl text-ink font-semibold flex items-center gap-2 border-b border-line pb-3">
          <FileText className="text-ppg" size={22} />
          <span>Daftar Artefak Terunggah ({artifacts.length})</span>
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
                    <span className="font-serif text-xs font-semibold text-ppg bg-ppg/10 px-2.5 py-0.5 rounded-sm mb-2 inline-block">
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
                      <Eye size={13} />
                      <span>Lihat</span>
                    </a>

                    <a
                      href={fileUrl}
                      download={item.file_name}
                      className="inline-flex items-center gap-1 font-serif text-xs text-ink-soft border border-line px-3 py-1 rounded-sm hover:bg-paper-warm transition-colors"
                    >
                      <Download size={13} />
                      <span>Unduh</span>
                    </a>

                    <button
                      onClick={() => handleDelete(item.id, item.storage_path)}
                      className="inline-flex items-center gap-1 font-serif text-xs text-rose-600 border border-rose-200 px-3 py-1 rounded-sm hover:bg-rose-50 transition-colors ml-auto"
                    >
                      <Trash2 size={13} />
                      <span>Hapus</span>
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
