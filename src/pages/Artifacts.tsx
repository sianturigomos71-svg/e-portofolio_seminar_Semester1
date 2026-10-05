import { useState } from 'react';
import { BookOpen, CheckCircle2, Target, Award, Layers, Sparkles } from 'lucide-react';

interface ArtifactData {
  id: string;
  title: string;
  subject: string;
  cycle: string;
  approach: string;
  products: string[];
  identification: string;
  reasons: string[];
  keyConcepts: string[];
  practicalConnection: string;
  futurePlans: string[];
}

const artifactsData: ArtifactData[] = [
  {
    id: 'siklus-1',
    cycle: 'Siklus 1',
    title: 'Gerak Spesifik Lay-up Shoot Bola Basket',
    subject: 'Bola Basket (Kelas VIII / Fase D)',
    approach: 'Deep Learning (Mindful, Meaningful, Joyful) & Pembelajaran Berdiferensiasi Berbasis Stasiun',
    products: [
      'Modul Ajar PJOK: Gerak Spesifik Lay-up Shoot (Deep Learning & Station Rotation)',
      'LKPD "Petualangan Lay-up Shoot" (Integrasi Analogi Sehari-hari & Self-Tracking)'
    ],
    identification:
      'Artefak ini terdiri dari Modul Ajar 3 pertemuan dan LKPD tematik "Petualangan Lay-up Shoot". Produk ini memadukan pendekatan Deep Learning dengan model pembelajaran berdiferensiasi berbasis stasiun (Pemula, Menengah, Mahir) untuk mengatasi heterogenitas kemampuan fisik murid SMP.',
    reasons: [
      'Menjembatani konsep gerak teknis yang rumit melalui analogi kehidupan sehari-hari (seperti meraih benda di rak tinggi/melompati got).',
      'Menyediakan instrumen mandiri (self-tracking) kuantitatif dan kualitatif untuk melatih kesadaran metakognitif murid.',
      'Menjamin keadilan asesmen melalui rubrik berjenjang skala 1–4 yang disesuaikan dengan tingkat kemampuan murid.'
    ],
    keyConcepts: [
      'Mindful: Kesadaran tubuh saat bergerak melalui slow-motion drill dan refleksi rasa gerak.',
      'Meaningful: Menghubungkan teknik lay-up dengan konteks keputusan taktis dalam permainan nyata.',
      'Joyful: Pengemasan tantangan bertingkat, mini-game 2v1, dan pemilihan bentuk unjuk kerja akhir secara mandiri.'
    ],
    practicalConnection:
      'Pembelajaran gerak tidak efektif jika diseragamkan untuk semua siswa. Penerapan rotasi stasiun terbukti membantu murid pemula membangun koordinasi langkah tanpa tekanan, sementara murid mahir tetap tertantang melalui situasi permainan nyata.',
    futurePlans: [
      'Mengembangkan mitigasi skenario pembelajaran outdoor saat terjadi perubahan cuaca atau keterbatasan sarana.',
      'Menambahkan petunjuk operasional yang lebih rinci pada lembar asesmen teman sejawat (peer-assessment).',
      'Mengintegrasikan alternatif refleksi berbasis visual/audio untuk mengakomodasi murid dengan tantangan literasi menulis.'
    ]
  },
  {
    id: 'siklus-2',
    cycle: 'Siklus 2',
    title: 'Unit 3: Lompat Jauh Berdiferensiasi',
    subject: 'Atletik / Lompat Jauh (Kelas VIII / Fase D)',
    approach: 'Differentiated Instruction (Tomlinson) & Zone of Proximal Development (Vygotsky)',
    products: [
      'Modul Ajar Berdiferensiasi Lompat Jauh (6 JP / 2 Pertemuan)',
      'LKPD "Ayo, Jadi Juara Lompat Jauh!" (4 Halaman Multidimensi)'
    ],
    identification:
      'Artefak ini dirancang sebagai respons terhadap variasi kemampuan motorik murid dalam cabang olahraga atletik. Terdiri dari Modul Ajar berdiferensiasi 3 zona (Pemula, Menengah, Mahir) dan LKPD interaktif yang mencakup ranah kognitif, psikomotor, dan afektif.',
    reasons: [
      'Mengadopsi kerangka Tomlinson dengan membedakan Konten (video/infografis), Proses (panjang awalan 5-15 langkah), dan Produk.',
      'Menerapkan prinsip scaffolding dan Tutor Sebaya (Learning by Teaching) sesuai teori Zone of Proximal Development Vygotsky.',
      'Pengelompokan fleksibel dan dinamis yang mencegah pelabelan negatif (labeling) pada murid pemula.'
    ],
    keyConcepts: [
      'Pengelolaan Kelas 3 Zona: Zona A (awalan pendek/matras), Zona B (awalan sedang/papan tumpu), Zona C (awalan panjang/target sudut).',
      'Multi-modalitas Pembelajaran: Mengakomodasi gaya belajar visual, auditori, dan kinestetik.',
      'Self-Determination Theory: Membangun otonomi (autonomy), kompetensi (competence), dan keterhubungan (relatedness).'
    ],
    practicalConnection:
      'Penyesuaian jarak awalan dan media pendaratan (matras vs bak pasir) terbukti menurunkan kecemasan murid pemula, sehingga seluruh murid dapat merasakan pencapaian (sense of achievement) sesuai kapasitasnya.',
    futurePlans: [
      'Merancang instrumen asesmen diagnostik terstandarisasi sebelum pembagian zona latihan.',
      'Menyediakan skenario adaptasi alat untuk sekolah dengan sarana terbatas (misal: penggunaan tali/garis kapur pengganti papan tumpu).',
      'Penyelarasan otomatis antara poin pertanyaan kuis di LKPD dengan tingkat diferensiasi modul.'
    ]
  },
  {
    id: 'siklus-3',
    cycle: 'Siklus 3',
    title: 'Aktivitas Gerak Berirama',
    subject: 'Senam Berirama (Kelas VIII / Fase D)',
    approach: 'Deep Learning, Multiple Intelligences (Gardner) & Zero Judgment Zone',
    products: [
      'Modul Ajar Aktivitas Gerak Berirama (Deep Learning & 3 Level Stasiun)',
      'LKPD Aktivitas Gerak Berirama "Setiap Gerakan adalah Ekspresi Dirimu!"'
    ],
    identification:
      'Artefak ini memadukan olahraga ekspresif-performatif dengan konteks budaya populer remaja (TikTok Dance, K-Pop, Poco-Poco). Berisi Modul Ajar 2 pertemuan dan LKPD inklusif yang mencakup pengamatan gerak, checklist koordinasi, hingga rancangan kreasi pola lantai.',
    reasons: [
      'Mengintegrasikan pilar Mindful (body scan & napas sadar), Meaningful (kebugaran & tren remaja), dan Joyful (Freeze Dance & Momen Bintang).',
      'Menciptakan iklim psikologis aman (Zero Judgment Zone) untuk mengatasi kecemasan tampil di depan umum.',
      'Mengakomodasi kecerdasan majemuk: Kinestetik, Musikal, Interpersonal, Intrapersonal, dan Spasial.'
    ],
    keyConcepts: [
      'Gradasi Tempo Musik: Lambat (60-80 BPM) untuk Pemula, Sedang (80-100 BPM) untuk Menengah, dan Cepat (100-120 BPM) untuk Mahir.',
      'Diferensiasi Produk Kreasi: Unjuk kerja $2\times8$ hitungan (Pemula), $3\times8$ hitungan dengan alat (Menengah), hingga $4\times8$ hitungan kreasi pola lantai (Mahir).',
      'Refleksi Emosional SEL (Social-Emotional Learning) & Assessment for Learning (AfL).'
    ],
    practicalConnection:
      'Menggunakan referensi musik dan tren yang dekat dengan dunia siswa terbukti meningkatkan motivasi intrinsik dan partisipasi aktif murid dalam pembelajaran senam berirama.',
    futurePlans: [
      'Menyediakan variasi LKPD yang terdeferensiasi sesuai tingkat literasi reflektif siswa.',
      'Mengembangkan skenario pembelajaran berbasis budaya lokal (seperti Tari Tor-Tor atau Poco-Poco) untuk sekolah dengan konteks khusus.',
      'Menambahkan modul pendamping untuk siswa berkebutuhan khusus (inklusif/adaptif).'
    ]
  }
];

export default function Artifacts() {
  const [activeTab, setActiveTab] = useState<string>('siklus-1');

  const currentArtifact = artifactsData.find((item) => item.id === activeTab) || artifactsData[0];

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Header Halaman */}
      <div className="mb-10">
        <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-2">
          E-Portofolio · PPG Prajabatan PJOK
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink font-semibold tracking-tight">
          Artefak & Analisis Reflektif
        </h1>
        <p className="font-serif text-body text-ink-soft mt-4 max-w-prose leading-relaxed">
          Dokumentasi produk pembelajaran pilihan (Modul Ajar & LKPD) beserta analisis komprehensif kendala, pemetaan teori pedagogi, dan kaitan praktisnya dalam pelaksanaan PPL Terbimbing.
        </p>
        <hr className="border-line mt-8" />
      </div>

      {/* Navigasi Siklus Tab */}
      <div className="flex flex-wrap gap-3 mb-10 border-b border-line pb-4">
        {artifactsData.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`font-serif text-sm px-5 py-2.5 rounded-sm transition-all duration-200 flex items-center gap-2 ${
              activeTab === item.id
                ? 'bg-ppg text-white shadow-sm font-semibold'
                : 'bg-paper-warm text-ink-soft hover:bg-line-soft hover:text-ink'
            }`}
          >
            <Sparkles size={16} />
            {item.cycle}: {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
          </button>
        ))}
      </div>

      {/* Detail Siklus Terpilih */}
      <div className="space-y-12">
        {/* Ringkasan Artefak */}
        <div className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="font-serif text-xs uppercase tracking-widest text-ppg font-semibold bg-white px-3 py-1 border border-line">
              {currentArtifact.cycle} · {currentArtifact.subject}
            </span>
          </div>
          <h2 className="font-serif text-2xl text-ink font-semibold mb-3">
            {currentArtifact.title}
          </h2>
          <p className="font-serif text-sm text-ink-muted italic mb-6">
            Pendekatan Utama: {currentArtifact.approach}
          </p>

          <div className="space-y-3 pt-2">
            <p className="font-serif text-sm font-semibold text-ink flex items-center gap-2">
              <BookOpen size={18} className="text-ppg" /> Produk Pembelajaran yang Dianalisis:
            </p>
            <ul className="space-y-2 pl-6 list-disc font-serif text-sm text-ink-soft">
              {currentArtifact.products.map((prod, idx) => (
                <li key={idx}>{prod}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bagian 1: Analisis Artefak Pembelajaran */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-line-soft pb-3">
            <Layers className="text-ppg" size={24} />
            <h2 className="font-serif text-2xl text-ink font-semibold">
              1. Analisis Artefak Pembelajaran
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-line p-6 rounded-sm space-y-3">
              <h3 className="font-serif text-lg text-ink font-semibold flex items-center gap-2">
                <Target size={18} className="text-ppg" /> Identifikasi Artefak
              </h3>
              <p className="font-serif text-sm text-ink-soft leading-relaxed">
                {currentArtifact.identification}
              </p>
            </div>

            <div className="bg-white border border-line p-6 rounded-sm space-y-3">
              <h3 className="font-serif text-lg text-ink font-semibold flex items-center gap-2">
                <CheckCircle2 size={18} className="text-ppg" /> Alasan Pemilihan Artefak
              </h3>
              <ul className="space-y-2 pl-5 list-disc font-serif text-sm text-ink-soft leading-relaxed">
                {currentArtifact.reasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Bagian 2: Kaitan Praktis & Konsep Utama */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-line-soft pb-3">
            <Award className="text-ppg" size={24} />
            <h2 className="font-serif text-2xl text-ink font-semibold">
              2. Kaitan Praktis & Pembelajaran Masa Depan
            </h2>
          </div>

          <div className="bg-white border border-line p-6 md:p-8 rounded-sm space-y-6">
            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-3">
                Konsep Utama yang Dipelajari & Diadopsi
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 font-serif text-sm">
                {currentArtifact.keyConcepts.map((concept, idx) => (
                  <li key={idx} className="bg-paper-warm border border-line-soft p-4 rounded-sm text-ink-soft">
                    {concept}
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-line-soft" />

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-2">
                Relevansi & Refleksi Kaitan Praktis
              </h3>
              <p className="font-serif text-sm text-ink-soft leading-relaxed">
                {currentArtifact.practicalConnection}
              </p>
            </div>

            <hr className="border-line-soft" />

            <div>
              <h3 className="font-serif text-lg text-ink font-semibold mb-3">
                Rencana Adaptasi & Perubahan di Masa Depan
              </h3>
              <ul className="space-y-2 pl-5 list-disc font-serif text-sm text-ink-soft leading-relaxed">
                {currentArtifact.futurePlans.map((plan, idx) => (
                  <li key={idx}>{plan}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
