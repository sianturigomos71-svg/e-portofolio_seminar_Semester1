import { profilePhoto, educationTimeline } from '@/data/courses';
import SectionHeading from '@/components/SectionHeading';

export default function About() {
  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-3">
          Tentang
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink font-semibold tracking-tight">
          Tentang Saya
        </h1>
      </div>

      {/* Profile info */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 mb-20">
        <div>
          <img
            src={profilePhoto}
            alt="Gomos Andreas Sianturi"
            className="w-full max-h-96 object-cover rounded-sm border border-line"
          />
          <p className="font-serif text-sm text-ink-muted mt-3">
            Gomos Andreas Sianturi
            <br />
            Mahasiswa PPG Prajabatan — PJOK
          </p>
        </div>
        <div>
          <div className="space-y-0">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-t border-line pt-4 pb-4">
              <span className="font-serif text-sm text-ink-muted sm:w-28 shrink-0">
                Nama
              </span>
              <span className="font-serif text-[15px] text-ink">
                Gomos Andreas Sianturi
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-t border-line-soft pt-4 pb-4">
              <span className="font-serif text-sm text-ink-muted sm:w-28 shrink-0">
                Program
              </span>
              <span className="font-serif text-[15px] text-ink">
                PPG Prajabatan
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-t border-line-soft pt-4 pb-4">
              <span className="font-serif text-sm text-ink-muted sm:w-28 shrink-0">
                Bidang
              </span>
              <span className="font-serif text-[15px] text-ink">PJOK</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-t border-line-soft pt-4 pb-4">
              <span className="font-serif text-sm text-ink-muted sm:w-28 shrink-0">
                Semester
              </span>
              <span className="font-serif text-[15px] text-ink">1</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 border-t border-line-soft pt-4 pb-4 border-b border-line">
              <span className="font-serif text-sm text-ink-muted sm:w-28 shrink-0">
                Tahun
              </span>
              <span className="font-serif text-[15px] text-ink">2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Perjalanan Pendidikan */}
      <div className="mb-12">
        <SectionHeading title="Perjalanan Pendidikan" />
      </div>

      <div className="max-w-prose">
        {educationTimeline.map((item, index) => (
          <div key={item.institution} className="flex gap-6 group">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-3 h-3 rounded-full border-2 border-ppg bg-paper mt-2" />
              {index < educationTimeline.length - 1 && (
                <div className="w-[2px] flex-1 bg-line min-h-[60px]" />
              )}
            </div>
            {/* Content */}
            <div className={`pb-8 ${index === educationTimeline.length - 1 ? 'pb-0' : ''}`}>
              <p className="font-serif text-lg text-ink font-semibold">
                {item.institution}
              </p>
              <p className="font-serif text-sm text-ink-muted mt-1">
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
