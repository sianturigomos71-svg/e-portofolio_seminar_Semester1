import { useState, useEffect } from 'react';
import { FileText, Download, Eye, Loader2, Sparkles } from 'lucide-react';
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
  { id: 'Semua', label: 'Semua Artefak' },
  { id: 'Siklus 1', label: 'Siklus 1 - Bola Basket' },
  { id: 'Siklus 2', label: 'Siklus 2 - Lompat Jauh' },
  { id: 'Siklus 3', label: 'Siklus 3 - Senam Berirama' },
  { id: 'Umum', label: 'Umum' },
];

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

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
          Artefak Pembelajaran
        </h1>
        <p className="font-serif text-body text-ink-soft mt-4 max-w-prose leading-relaxed">
          Kumpulan berkas dokumen pendukung, Modul Ajar, LKPD, dan hasil refleksi pembelajaran selama mengikuti program PPG Prajabatan.
        </p>
        <hr className="border-line mt-8" />
      </div>

      {/* Filter Kategori / Siklus */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-line pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`font-serif text-sm px-4 py-2 rounded-sm transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-ppg text-white shadow-sm font-semibold'
                : 'bg-paper-warm text-ink-soft hover:bg-line-soft hover:text-ink'
            }`}
          >
            <Sparkles size={15} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Daftar Artefak */}
      {loading ? (
        <div className="text-center py-16 font-serif text-ink-muted flex items-center justify-center gap-2">
          <Loader2 size={22} className="animate-spin text-ppg" /> Memuat dokumen artefak...
        </div>
      ) : filteredArtifacts.length === 0 ? (
        <div className="bg-paper-warm border border-line p-10 text-center rounded-sm">
          <p className="font-serif text-body text-ink-muted">Belum ada artefak yang diunggah dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArtifacts.map((item) => {
            const fileUrl = getPublicUrl(item.storage_path);
            return (
              <div key={item.id} className="bg-white border border-line p-6 rounded-sm flex flex-col justify-between space-y-4 hover:shadow-sm transition-shadow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
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

                  <h3 className="font-serif text-lg text-ink font-semibold flex items-start gap-2">
                    <FileText size={20} className="text-ppg shrink-0 mt-0.5" />
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-serif text-sm text-ink-soft mt-2 leading-relaxed">{item.description}</p>
                  )}
                  <p className="font-serif text-xs text-ink-muted mt-3 truncate">📄 {item.file_name}</p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-line-soft">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-serif text-xs text-ppg border border-ppg px-4 py-2 rounded-sm hover:bg-ppg hover:text-white transition-colors"
                  >
                    <Eye size={15} /> Lihat Dokumen
                  </a>

                  <a
                    href={fileUrl}
                    download={item.file_name}
                    className="inline-flex items-center gap-1.5 font-serif text-xs text-ink-soft border border-line px-4 py-2 rounded-sm hover:bg-paper-warm transition-colors"
                  >
                    <Download size={15} /> Unduh
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
