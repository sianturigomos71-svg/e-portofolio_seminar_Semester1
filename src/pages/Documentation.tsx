import { documentationPhotos } from '@/data/courses';

const categories = ['Dokumentasi Semester 1', 'PPL Terbimbing', 'Pembelajaran Mendalam dan Asesmen'];

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
          Potret kegiatan belajar dan aktivitas selama mengikuti PPG Prajabatan
          Semester 1.
        </p>
      </div>

      {/* Editorial gallery grouped by activity */}
      <div className="space-y-16">
        {categories.map((category) => {
          const photos = documentationPhotos.filter((photo) => photo.category === category);
          if (photos.length === 0) return null;

          return (
            <section key={category}>
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 mb-6">
                <h2 className="font-serif text-2xl text-ink font-semibold">
                  {category}
                </h2>
                <span className="font-serif text-sm text-ink-muted">
                  {photos.length} {photos.length === 1 ? 'foto' : 'foto'}
                </span>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {photos.map((photo) => (
                  <figure key={photo.image} className="mb-6 break-inside-avoid">
                    <img
                      src={photo.image}
                      alt={photo.imageAlt}
                      className="w-full rounded-sm border border-line"
                      loading="lazy"
                    />
                    <figcaption className="mt-3">
                      <p className="font-serif text-[15px] text-ink font-semibold">
                        {photo.title}
                      </p>
                      {photo.caption && (
                        <p className="font-serif text-sm text-ink-muted mt-1 leading-relaxed">
                          {photo.caption}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
