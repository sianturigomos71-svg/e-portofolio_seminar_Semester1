import SectionHeading from '@/components/SectionHeading';

export default function Artifacts() {
  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Header Halaman */}
      <div className="mb-12">
        <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-2">
          E-Portofolio · PPG Prajabatan
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink font-semibold tracking-tight">
          Artefak & Analisis Artefak
        </h1>
        <p className="font-serif text-body text-ink-soft mt-4 max-w-prose">
          Ruang dokumentasi artefak pembelajaran yang menjadi bukti dukung hasil refleksi, dilengkapi analisis pemilihan artefak dan kaitan praktisnya dalam pembelajaran PJOK.
        </p>
        <hr className="border-line mt-8" />
      </div>

      {/* Bagian 1: Analisis Artefak */}
      <section className="mb-16">
        <SectionHeading title="Analisis Artefak Pembelajaran" />
        <div className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm mt-6 space-y-6">
          <div>
            <h3 className="font-serif text-xl text-ink font-semibold mb-2">
              Identifikasi Artefak
            </h3>
            <p className="font-serif text-body text-ink-soft leading-relaxed">
              [Tuliskan identifikasi artefak pembelajaran yang menjadi bukti dukung hasil refleksi Anda di sini. Misalnya: Modul Ajar PJOK, Lembar Kerja Peserta Didik (LKPD), Jurnal Refleksi Harian, atau Dokumentasi Video Pembelajaran.]
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl text-ink font-semibold mb-2">
              Alasan Pemilihan Artefak
            </h3>
            <p className="font-serif text-body text-ink-soft leading-relaxed">
              [Tuliskan alasan mengapa artefak tersebut dipilih sebagai bukti dukung hasil refleksi Anda di sini. Jelaskan bagaimana artefak tersebut merepresentasikan proses belajar dan perubahan cara pandang Anda.]
            </p>
          </div>
        </div>
      </section>

      {/* Bagian 2: Kaitan Praktis */}
      <section className="mb-16">
        <SectionHeading title="Kaitan Praktis" />
        <div className="bg-paper-warm border border-line p-6 md:p-8 rounded-sm mt-6 space-y-6">
          <div>
            <h3 className="font-serif text-xl text-ink font-semibold mb-2">
              Konsep Utama yang Dipelajari
            </h3>
            <p className="font-serif text-body text-ink-soft leading-relaxed">
              [Tuliskan penjelasan mengenai konsep-konsep utama yang telah Anda pelajari selama Semester 1 di sini.]
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl text-ink font-semibold mb-2">
              Rencana Perubahan di Masa Depan
            </h3>
            <p className="font-serif text-body text-ink-soft leading-relaxed">
              [Tuliskan perubahan dan komitmen yang ingin Anda lakukan di masa depan sebagai calon guru PJOK yang profesional.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
