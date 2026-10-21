import { useState } from 'react';
import { Lightbulb, Compass, ArrowRight, ArrowLeft, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

interface PracticalConnectionItem {
  id: string;
  title: string;
  shortLabel: string;
  concepts: string[];
  futureChanges: string[];
}

const COURSES_DATA: PracticalConnectionItem[] = [
  {
    id: 'filosofi-pendidikan',
    title: 'Filosofi Pendidikan Indonesia',
    shortLabel: 'FPI',
    concepts: [
      'Filosofi Pendidikan Ki Hadjar Dewantara (KHD) mengenai pendidikan yang "menuntun" tumbuh kembang peserta didik sesuai dengan kodrat alam dan kodrat zaman.',
      'Sistem Among dan nilai-nilai "Semboyan Pendidikan" (Ing Ngarsa Sung Tulada, Ing Madya Mangun Karsa, Tut Wuri Handayani) sebagai landasan etika mengajar.',
      'Konsep Tri Pusat Pendidikan (Keluarga, Sekolah, Masyarakat) dalam membentuk karakter dan budi pekerti anak secara holistik.'
    ],
    futureChanges: [
      'Mengubah paradigma dari pengajaran berpusat pada guru (teacher-centered) menjadi pembelajaran yang berhamba pada anak (student-centered).',
      'Mendesain pembelajaran yang mengintegrasikan nilai kearifan lokal tanpa mengesampingkan perkembangan teknologi modern.',
      'Menghapuskan bentuk pemaksaan akademik dan memfasilitasi setiap potensi keunikan yang dimiliki peserta didik.'
    ]
  },
  {
    id: 'pemahaman-peserta-didik',
    title: 'Pemahaman tentang Peserta Didik & Pembelajarannya',
    shortLabel: 'PPDP',
    concepts: [
      'Teori-teori perkembangan kognitif, sosio-emosional, dan fisik peserta didik sebagai acuan perancangan aktivitas kelas.',
      'Pendekatan Culturally Responsive Teaching (CRT) yang mengaitkan latar belakang budaya siswa dengan materi pelajaran.',
      'Prinsip Kerangka Kerja Understanding by Design (UbD) dalam merancang tujuan belajar yang berorientasi pada pemahaman mendalam.'
    ],
    futureChanges: [
      'Melaksanakan pemetaan profil belajar dan analisis kebutuhan non-kognitif siswa secara berkala sebelum menyusun modul ajar.',
      'Menciptakan iklim kelas yang inklusif, ramah emosional, dan aman secara psikologis bagi seluruh peserta didik.',
      'Menyesuaikan strategi penyampaian materi dengan tahap perkembangan mental dan latar belakang sosio-budaya siswa.'
    ]
  },
  {
    id: 'pembelajaran-mendalam-asesmen',
    title: 'Pembelajaran Mendalam dan Asesmen',
    shortLabel: 'PMA',
    concepts: [
      'Prinsip Pembelajaran Mendalam (Deep Learning) yang berfokus pada pemahaman bermakna, berpikir kritis, dan pemecahan masalah kontekstual.',
      'Perancangan asesmen diagnostik, formatif, dan sumatif yang saling berkesinambungan untuk mengukur kompetensi nyata.',
      'Prinsip Teaching at the Right Level (TaRL) dan pemanfaatan umpan balik berkelanjutan untuk mendukung proses belajar siswa.'
    ],
    futureChanges: [
      'Menerapkan strategi pembelajaran kontekstual yang mendorong keterlibatan aktif dan daya kritis peserta didik di kelas.',
      'Menggunakan hasil asesmen formatif sebagai sarana umpan balik reflektif perbaikan mengajar, bukan sekadar penilaian angka.',
      'Menyusun variasi instrumen evaluasi (portofolio, proyek, unjuk kerja) yang adil dan mengakomodasi tingkat pemahaman siswa.'
    ]
  },
  {
    id: 'pembelajaran-berdiferensiasi',
    title: 'Pembelajaran Berdiferensiasi',
    shortLabel: 'PB',
    concepts: [
      'Penerapan 4 elemen diferensiasi: Konten (materi), Proses (cara belajar), Produk (hasil karya), dan Lingkungan Belajar.',
      'Pengenalan 3 variabel utama siswa: Kesiapan Belajar (readiness), Minat (interest), dan Profil Belajar (learning style).',
      'Strategi pengelompokan yang dinamis dan fleksibel (flexible grouping) dalam aktivitas instruksional.'
    ],
    futureChanges: [
      'Menyediakan pilihan opsi tugas akhir/produk belajar yang bervariasi (visual, audio, teks, maupun praktik langsung).',
      'Memberikan pemberian bantuan bertahap (scaffolding) yang terukur bagi siswa yang membutuhkan pendampingan ekstra.',
      'Mendesain tata ruang dan suasana kelas yang mendukung kolaborasi sekaligus belajar mandiri secara seimbang.'
    ]
  },
  {
    id: 'ppl-1',
    title: 'Praktik Pengalaman Lapangan I',
    shortLabel: 'PPL I',
    concepts: [
      'Implementasi nyata perangkat pembelajaran, media interaktif, dan instrumen asesmen pada kondisi kelas sesungguhnya.',
      'Keterampilan manajemen kelas, pembentukan kesepakatan belajar, dan penanganan dinamika perilaku siswa.',
      'Pentingnya diskusi kolaboratif dan umpan balik konstruktif bersama Guru Pamong serta Dosen Pembimbing Lapangan.'
    ],
    futureChanges: [
      'Meningkatkan efisiensi alokasi waktu kegiatan mengajar serta mengintegrasikan ice-breaking yang edukatif saat fokus siswa menurun.',
      'Rutin mencatat jurnal refleksi harian setelah selesai mengajar untuk mengidentifikasi kekurangan dan perbaikan.',
      'Mempererat komunikasi dengan orang tua/wali siswa dalam memantau perkembangan belajar anak di luar sekolah.'
    ]
  }
];

export default function PracticalConnections() {
  const [selectedCourse, setSelectedCourse] = useState<PracticalConnectionItem | null>(null);

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16" translate="no">
      {/* Header Halaman */}
      <div className="mb-10 text-center md:text-left">
        <span className="font-serif text-xs text-ppg font-semibold bg-ppg/10 px-3 py-1 rounded-sm inline-flex items-center gap-1.5 mb-3">
          <Compass size={14} />
          <span>Kaitan Praktis Pembelajaran</span>
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-ink font-semibold">
          Konsep Utama & Rencana Perubahan
        </h1>
        <p className="font-serif text-sm text-ink-soft mt-2 max-w-2xl">
          Rangkuman keterkaitan antara pemahaman teoritis mata kuliah PPG dengan komitmen transformasi praktik mengajar saya di masa depan.
        </p>
      </div>

      <hr className="border-line mb-10" />

      {/* Tampilan Detail Saat Mata Kuliah Dipilih */}
      {selectedCourse ? (
        <div className="space-y-8 fade-in">
          <button
            onClick={() => setSelectedCourse(null)}
            className="inline-flex items-center gap-2 font-serif text-xs text-ppg border border-ppg px-4 py-2 rounded-sm hover:bg-ppg hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Daftar Mata Kuliah</span>
          </button>

          <div className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm space-y-8 shadow-sm">
            <div className="border-b border-line pb-4">
              <span className="font-serif text-xs font-semibold text-ppg bg-ppg/10 px-2.5 py-0.5 rounded-sm">
                Mata Kuliah
              </span>
              <h2 className="font-serif text-2xl text-ink font-semibold mt-2">
                {selectedCourse.title}
              </h2>
            </div>

            {/* Bagian 1: Konsep Utama */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-ink font-semibold flex items-center gap-2">
                <Lightbulb className="text-amber-600" size={20} />
                <span>Konsep Utama yang Dipelajari</span>
              </h3>
              <ul className="space-y-3">
                {selectedCourse.concepts.map((concept, idx) => (
                  <li key={idx} className="bg-white border border-line p-4 rounded-sm flex items-start gap-3 font-serif text-sm text-ink leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-ppg mt-2 shrink-0" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bagian 2: Perubahan Masa Depan */}
            <div className="space-y-4 pt-4 border-t border-line-soft">
              <h3 className="font-serif text-lg text-ink font-semibold flex items-center gap-2">
                <Sparkles className="text-ppg" size={20} />
                <span>Perubahan yang Ingin Dilakukan di Masa Depan</span>
              </h3>
              <ul className="space-y-3">
                {selectedCourse.futureChanges.map((change, idx) => (
                  <li key={idx} className="bg-white border border-line p-4 rounded-sm flex items-start gap-3 font-serif text-sm text-ink leading-relaxed">
                    <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Tampilan Awal: Grid Jenis-jenis Mata Kuliah */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="group bg-white border border-line hover:border-ppg p-6 rounded-sm cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 bg-paper-warm text-ppg border border-line flex items-center justify-center font-serif text-xs font-semibold rounded-sm group-hover:bg-ppg group-hover:text-white transition-colors">
                    {course.shortLabel}
                  </span>
                  <GraduationCap size={20} className="text-ink-muted group-hover:text-ppg transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-ink font-semibold group-hover:text-ppg transition-colors">
                  {course.title}
                </h3>
                <p className="font-serif text-xs text-ink-muted mt-2 line-clamp-2 leading-relaxed">
                  {course.concepts[0]}
                </p>
              </div>

              <div className="pt-4 border-t border-line-soft flex items-center justify-between font-serif text-xs text-ppg font-semibold">
                <span>Lihat Kaitan Praktis</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
