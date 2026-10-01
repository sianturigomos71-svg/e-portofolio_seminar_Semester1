import { Link } from 'react-router-dom';
import { courses, profilePhoto } from '@/data/courses';
import SectionHeading from '@/components/SectionHeading';

const stages = [
  {
    number: '01',
    title: 'Memahami',
    description: 'Memahami konsep dan gagasan yang dipelajari.',
  },
  {
    number: '02',
    title: 'Mencoba',
    description: 'Menghubungkan pembelajaran dengan pengalaman dan praktik.',
  },
  {
    number: '03',
    title: 'Merefleksikan',
    description:
      'Melihat kembali pengalaman, tantangan, dan pembelajaran yang diperoleh.',
  },
  {
    number: '04',
    title: 'Berkembang',
    description:
      'Menentukan hal-hal yang dapat diperbaiki dan dikembangkan sebagai calon guru.',
  },
];

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="max-w-editorial mx-auto px-6 lg:px-10 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="order-2 lg:order-1">
            <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-4">
              E-Portofolio · PPG Prajabatan
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink font-semibold leading-[1.15] tracking-tight">
              E-Portofolio
              <br />
              PPG Prajabatan
            </h1>
            <p className="font-serif text-xl text-ink-soft mt-6 leading-relaxed">
              Perjalanan Belajar dan Refleksi Semester 1
            </p>
            <p className="font-serif text-body text-ink-soft mt-6 max-w-prose">
              Ruang dokumentasi perjalanan belajar saya selama mengikuti PPG
              Prajabatan, mulai dari memahami konsep pendidikan, mengenali
              karakteristik peserta didik, merancang pembelajaran, hingga
              merefleksikan pengalaman sebagai calon guru PJOK.
            </p>
            <p className="font-serif text-sm text-ink-muted mt-6 tracking-wide">
              PPG Prajabatan · PJOK · Semester 1 · 2026
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/refleksi"
                className="font-serif text-[15px] text-white bg-ppg px-6 py-3 hover:bg-ppg-dark transition-colors duration-200"
              >
                Lihat Refleksi
              </Link>
              <Link
                to="/tentang"
                className="font-serif text-[15px] text-ppg border border-ppg px-6 py-3 hover:bg-ppg hover:text-white transition-colors duration-200"
              >
                Tentang Saya
              </Link>
            </div>
          </div>

          {/* Right column — profile photo */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={profilePhoto}
                alt="Gomos Andreas Sianturi"
                className="w-full max-h-[520px] object-cover rounded-sm border border-line"
              />
              <div className="mt-4">
                <p className="font-serif text-base text-ink font-semibold">
                  Gomos Andreas Sianturi
                </p>
                <p className="font-serif text-sm text-ink-muted">
                  Mahasiswa PPG Prajabatan — PJOK
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang E-Portofolio Ini */}
      <section className="bg-paper-warm border-y border-line-soft">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-prose">
            <SectionHeading title="Tentang E-Portofolio Ini" />
            <p className="font-serif text-body text-ink-soft mt-6">
              E-Portofolio ini menjadi ruang untuk mendokumentasikan proses
              belajar, pengalaman, pemikiran, dan refleksi saya selama mengikuti
              PPG Prajabatan Semester 1. Setiap mata kuliah tidak hanya saya
              pahami sebagai materi akademik, tetapi juga sebagai bagian dari
              proses membentuk cara pandang dan identitas saya sebagai calon
              guru PJOK.
            </p>
          </div>
        </div>
      </section>

      {/* Perjalanan Belajar Semester 1 */}
      <section className="max-w-editorial mx-auto px-6 lg:px-10 py-20">
        <SectionHeading title="Perjalanan Belajar Semester 1" />
        <div className="mt-10">
          {courses.map((course, index) => (
            <div key={course.id}>
              {index > 0 && <hr className="border-line-soft" />}
              <div className="py-8 grid grid-cols-1 md:grid-cols-[200px_auto_1fr_auto] gap-4 md:gap-6 items-start">
                <span className="font-serif text-2xl text-ppg font-semibold">
                  {course.number}
                </span>
                <Link to={`/refleksi/${course.id}`}>
                  <img
                    src={course.image}
                    alt={course.imageAlt}
                    className="w-full h-32 object-cover rounded-sm border border-line"
                    loading="lazy"
                  />
                </Link>
                <div>
                  <h3 className="font-serif text-xl text-ink font-semibold">
                    {course.title}
                  </h3>
                  <p className="font-serif text-body text-ink-soft mt-2 max-w-prose">
                    {course.shortDescription}
                  </p>
                </div>
                <Link
                  to={`/refleksi/${course.id}`}
                  className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 whitespace-nowrap link-underline"
                >
                  Baca Refleksi →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dari Belajar ke Refleksi */}
      <section className="bg-paper-warm border-y border-line-soft">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 py-20">
          <SectionHeading title="Dari Belajar ke Refleksi" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage) => (
              <div key={stage.number} className="border-l-2 border-ppg pl-5">
                <p className="font-serif text-sm text-ppg tracking-widest">
                  {stage.number}
                </p>
                <h3 className="font-serif text-lg text-ink font-semibold mt-2">
                  {stage.title}
                </h3>
                <p className="font-serif text-[15px] text-ink-soft mt-2 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekilas Tentang Saya */}
      <section className="max-w-editorial mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <img
              src={profilePhoto}
              alt="Gomos Andreas Sianturi"
              className="w-full max-h-80 object-cover rounded-sm border border-line"
            />
          </div>
          <div>
            <SectionHeading title="Sekilas Tentang Saya" />
            <p className="font-serif text-body text-ink-soft mt-6 max-w-prose">
              Nama saya Gomos Andreas Sianturi. Saya merupakan mahasiswa PPG
              Prajabatan bidang Pendidikan Jasmani, Olahraga, dan Kesehatan
              (PJOK). Bagi saya, menjadi guru bukan hanya tentang menyampaikan
              materi, tetapi juga tentang memahami peserta didik, membangun
              hubungan yang positif, dan terus belajar untuk menjadi pendidik
              yang lebih baik.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 border-t border-line-soft pt-4">
                <span className="font-serif text-sm text-ink-muted sm:w-24 shrink-0">
                  Bidang
                </span>
                <span className="font-serif text-[15px] text-ink">
                  Pendidikan Jasmani, Olahraga, dan Kesehatan
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 border-t border-line-soft pt-4">
                <span className="font-serif text-sm text-ink-muted sm:w-24 shrink-0">
                  Program
                </span>
                <span className="font-serif text-[15px] text-ink">
                  PPG Prajabatan
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 border-t border-line-soft pt-4">
                <span className="font-serif text-sm text-ink-muted sm:w-24 shrink-0">
                  Fokus
                </span>
                <span className="font-serif text-[15px] text-ink">
                  Pembelajaran PJOK yang bermakna, aktif, dan berpihak pada
                  peserta didik.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
