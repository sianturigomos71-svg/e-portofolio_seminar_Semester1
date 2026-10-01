import { documentationPhotos } from '@/data/courses';

export default function Documentation() {
  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-3">
          Dokumentasi
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink font-semibold tracking-tight">
          Dokumentasi Perjalanan
        </h1>
        <p className="font-serif text-body text-ink-soft mt-6 max-w-prose">
          Beberapa potret kegiatan selama mengikuti PPG Prajabatan Semester 1 —
          perkuliahan, praktik, dan kegiatan kelompok.
        </p>
      </div>

      {/* Masonry gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {documentationPhotos.map((photo, i) => (
          <div key={i} className="mb-6 break-inside-avoid">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full rounded-sm border border-line"
              loading="lazy"
            />
            <div className="mt-3">
              <p className="font-serif text-[15px] text-ink font-semibold">
                {photo.caption}
              </p>
              <p className="font-serif text-sm text-ink-muted mt-1">
                {photo.meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
