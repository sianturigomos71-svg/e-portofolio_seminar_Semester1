import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Upload, FileText, Trash2, Download, Eye, Plus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, REFLECTION_BUCKET } from '@/lib/supabase';

export interface ArtifactItem {
  id: string;
  title: string;
  description: string;
  category: string;
  file_name: string;
  storage_path: string;
  created_at: string;
  file_url?: string;
}

const CATEGORIES = [
  { id: 'Siklus 1', label: 'Siklus 1 - Bola Basket' },
  { id: 'Siklus 2', label: 'Siklus 2 - Lompat Jauh' },
  { id: 'Siklus 3', label: 'Siklus 3 - Senam Berirama' },
  { id: 'Umum', label: 'Dokumen / Artefak Umum' },
];

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Form State
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Siklus 1');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  // Status Message
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('artifacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Fallback jika tabel 'artifacts' belum dibuat di Supabase
        const { data: refData } = await supabase
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
        setArtifacts(data);
      }
    } catch (err) {
      console.error('Gagal mengambil data artefak:', err);
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

      // 1. Upload file ke Supabase Storage
      const { error: storageError } = await supabase.storage
        .from(REFLECTION_BUCKET)
        .upload(filePath, file);

      if (storageError) throw storageError;

      // 2. Simpan metadata file ke database
      const newArtifact = {
        title: title.trim(),
        category,
        description: description.trim(),
        file_name: file.name,
        storage_path: filePath,
        created_at: new Date().toISOString(),
      };

      const { error: dbError } = await supabase.from('artifacts').insert([newArtifact]);

      if (dbError) {
        // Fallback jika tabel 'artifacts' belum ada
        await supabase.from('reflection_documents').insert([
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

      setMessage({ type: 'success', text: 'Artefak berhasil diunggah!' });
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
    if (!window.confirm('Apakah Anda yakin ingin menghapus artefak ini?')) return;

    try {
      await supabase.storage.from(REFLECTION_BUCKET).remove([storagePath]);
      await supabase.from('artifacts').delete().eq('id', id);
      await supabase.from('reflection_documents').delete().eq('id', id);

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

  const filteredArtifacts =
    selectedCategory === 'Semua'
      ? artifacts
      : artifacts.filter((item) => item.category === selectedCategory);

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Header Halaman */}
      <div className="mb-10">
        <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-2">
          E-Portofolio · PPG Prajabatan PJOK
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink font-semibold tracking-tight">
          Unggah & Kelola Artefak
        </h1>
        <p className="font-serif text-body text-ink-soft mt-4 max-w-prose leading-relaxed">
          Ruang untuk mengunggah, menyimpan, dan menampilkan dokumen artefak pembelajaran seperti Modul Ajar, LKPD, jurnal refleksi, atau berkas pendukung lainnya.
        </p>
        <hr className="border-line mt-8" />
      </div>

      {/* Form Upload */}
      <section className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm mb-12">
        <h2 className="font-serif text-xl text-ink font-semibold mb-6 flex items-center gap-2">
          <Upload className="text-ppg" size={22} /> Form Unggah Artefak Baru
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
              placeholder="Tambahkan catatan atau deskripsi ringkas tentang artefak ini..."
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
                <Plus size={18} /> Unggah Artefak Sekarang
              </>
            )}
          </button>
        </form>
      </section>

      {/* Daftar Artefak */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <h2 className="font-serif text-2xl text-ink font-semibold flex items-center gap-2">
            <FileText className="text-ppg" size={24} /> Daftar Artefak Terunggah
          </h2>

          {/* Filter Kategori */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('Semua')}
              className={`font-serif text-xs px-3 py-1.5 rounded-sm transition-colors ${
                selectedCategory === 'Semua' ? 'bg-ppg text-white' : 'bg-paper-warm text-ink-soft'
              }`}
            >
              Semua
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-serif text-xs px-3 py-1.5 rounded-sm transition-colors ${
                  selectedCategory === cat.id ? 'bg-ppg text-white' : 'bg-paper-warm text-ink-soft'
                }`}
              >
                {cat.id}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 font-serif text-ink-muted flex items-center justify-center gap-2">
            <Loader2 size={20} className="animate-spin text-ppg" /> Memuat daftar artefak...
          </div>
        ) : filteredArtifacts.length === 0 ? (
          <div className="bg-paper-warm border border-line p-8 text-center rounded-sm">
            <p className="font-serif text-body text-ink-muted">Belum ada artefak yang diunggah dalam kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArtifacts.map((item) => {
              const fileUrl = getPublicUrl(item.storage_path);
              return (
                <div key={item.id} className="bg-white border border-line p-6 rounded-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-serif text-xs font-semibold text-ppg bg-ppg/10 px-2.5 py-1 rounded-sm">
                        {item.category}
                      </span>
                      <span className="font-serif text-xs text-ink-muted">
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-ink font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="font-serif text-sm text-ink-soft mt-2 leading-relaxed">{item.description}</p>
                    )}
                    <p className="font-serif text-xs text-ink-muted mt-3 truncate">📄 {item.file_name}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-line-soft">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-serif text-xs text-ppg border border-ppg px-3 py-1.5 rounded-sm hover:bg-ppg hover:text-white transition-colors"
                    >
                      <Eye size={14} /> Lihat File
                    </a>

                    <a
                      href={fileUrl}
                      download={item.file_name}
                      className="inline-flex items-center gap-1.5 font-serif text-xs text-ink-soft border border-line px-3 py-1.5 rounded-sm hover:bg-paper-warm transition-colors"
                    >
                      <Download size={14} /> Unduh
                    </a>

                    <button
                      onClick={() => handleDelete(item.id, item.storage_path)}
                      className="inline-flex items-center gap-1.5 font-serif text-xs text-rose-600 border border-rose-200 px-3 py-1.5 rounded-sm hover:bg-rose-50 transition-colors ml-auto"
                    >
                      <Trash2 size={14} /> Hapus
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
