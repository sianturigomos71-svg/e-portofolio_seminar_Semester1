import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '@/data/courses';
import { supabase, type ReflectionDocument } from '@/lib/supabase';

export default function Reflections() {
  const [docs, setDocs] = useState<Record<string, ReflectionDocument>>({});
  const [loading, setLoading] = useState(true);

  const fetchDocs = useCallback(async () => {
    const { data, error } = await supabase
      .from('reflection_documents')
      .select('*');
    if (!error && data) {
      const map: Record<string, ReflectionDocument> = {};
      (data as ReflectionDocument[]).forEach((d) => {
        map[d.course_id] = d;
      });
      setDocs(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-3">
          Refleksi
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink font-semibold tracking-tight">
          Refleksi Semester 1
        </h1>
        <p className="font-serif text-body text-ink-soft mt-6 max-w-prose">
          Enam mata kuliah, enam ruang belajar, dan berbagai pengalaman yang
          membentuk cara pandang saya sebagai calon guru PJOK.
        </p>
        <p className="font-serif text-sm text-ink-muted mt-4 tracking-wide">
          PPG Prajabatan · PJOK · Semester 1 · 2026
        </p>
      </div>

      {/* Course list */}
      <div>
        {courses.map((course, index) => {
          const doc = docs[course.id];
          return (
            <div key={course.id}>
              {index > 0 && <hr className="border-line-soft" />}
              <div className="py-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start">
                {/* Number + image */}
                <div>
                  <span className="font-serif text-2xl text-ppg font-semibold block mb-4">
                    {course.number}
                  </span>
                  <Link to={`/refleksi/${course.id}`}>
                    <img
                      src={course.image}
                      alt={course.imageAlt}
                      className="w-full h-44 object-cover rounded-sm border border-line"
                      loading="lazy"
                    />
                  </Link>
                  <p className="font-serif text-sm text-ink-muted mt-2 leading-snug">
                    {course.imageCaption}
                  </p>
                </div>

                {/* Title + description + status + link */}
                <div>
                  <h3 className="font-serif text-xl text-ink font-semibold">
                    {course.title}
                  </h3>
                  <p className="font-serif text-body text-ink-soft mt-2 max-w-prose">
                    {course.shortDescription}
                  </p>

                  {loading ? (
                    <p className="font-serif text-sm text-ink-muted mt-3">
                      Memeriksa dokumen...
                    </p>
                  ) : doc ? (
                    <>
                      <p className="font-serif text-sm text-ppg mt-3 tracking-wide">
                        Refleksi tersedia
                      </p>
                      <Link
                        to={`/refleksi/${course.id}/dokumen`}
                        className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 whitespace-nowrap link-underline mt-4 inline-block"
                      >
                        Baca Refleksi →
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="font-serif text-sm text-ink-muted mt-3 tracking-wide">
                        Refleksi belum tersedia
                      </p>
                      <p className="font-serif text-sm text-ink-muted mt-2 max-w-prose">
                        Dokumen refleksi untuk mata kuliah ini belum ditambahkan.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
