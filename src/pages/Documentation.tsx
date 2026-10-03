import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { documentationPhotos } from '@/data/courses';

export default function Documentation() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxFullscreen, setLightboxFullscreen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const selectedPhoto = selectedIndex === null ? null : documentationPhotos[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) =>
          current === null
            ? null
            : (current - 1 + documentationPhotos.length) % documentationPhotos.length,
        );
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % documentationPhotos.length,
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  const closeLightbox = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setLightboxFullscreen(false);
    setSelectedIndex(null);
  };

  const toggleLightboxFullscreen = async () => {
    if (!lightboxRef.current) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setLightboxFullscreen(false);
      return;
    }

    if (lightboxRef.current.requestFullscreen) {
      await lightboxRef.current.requestFullscreen();
      setLightboxFullscreen(true);
    }
  };

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

      <section>
        <h2 className="font-serif text-2xl text-ink font-semibold border-b border-line pb-3 mb-8">
          Dokumentasi Semester 1
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentationPhotos.map((photo, index) => (
            <button
              key={photo.image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ppg focus-visible:ring-offset-4"
              aria-label="Buka foto dokumentasi"
            >
              <img
                src={photo.image}
                alt={photo.imageAlt}
                className="w-full aspect-[4/3] object-cover rounded-sm border border-line transition-opacity duration-200 group-hover:opacity-85"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      {selectedPhoto && selectedIndex !== null && (
        <div
          ref={lightboxRef}
          className={`fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-4 md:p-8 ${
            lightboxFullscreen ? 'bg-black' : ''
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Foto dokumentasi ukuran besar"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/90 hover:text-white transition-colors"
            aria-label="Tutup foto"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedIndex(
                (selectedIndex - 1 + documentationPhotos.length) % documentationPhotos.length,
              )
            }
            className="absolute left-3 md:left-8 text-white/90 hover:text-white transition-colors p-2"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>

          <img
            src={selectedPhoto.image}
            alt={selectedPhoto.imageAlt}
            className="max-w-full max-h-full object-contain"
          />

          <button
            type="button"
            onClick={() => setSelectedIndex((selectedIndex + 1) % documentationPhotos.length)}
            className="absolute right-3 md:right-8 text-white/90 hover:text-white transition-colors p-2"
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={toggleLightboxFullscreen}
            className="absolute bottom-4 right-4 text-white/90 hover:text-white transition-colors font-serif text-sm flex items-center gap-2"
          >
            <Maximize2 size={18} strokeWidth={1.5} />
            Layar penuh
          </button>
        </div>
      )}
    </div>
  );
}
