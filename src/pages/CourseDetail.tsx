import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '@/data/courses';
import { supabase, type ReflectionDocument } from '@/lib/supabase';

const tocItems = [
  { id: 'tentang', label: 'Tentang Mata Kuliah' },
  { id: 'hal-yang-dipelajari', label: 'Hal yang Saya Pelajari' },
  { id: 'pengalaman', label: 'Pengalaman Belajar' },
  { id: 'refleksi', label: 'Refleksi' },
  { id: 'praktik', label: 'Pembelajaran yang Saya Bawa ke Praktik' },
  { id: 'dokumen', label: 'Dokumen Refleksi' },
];

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const courseIndex = courses.findIndex((c) => c.id === courseId);
  const course = courses[courseIndex];

  const [doc, setDoc] = useState<ReflectionDocument | null>(null);
  const [docLoading, setDocLoading] = useState(true);

  const fetchDoc = useCallback(async () => {
    if (!courseId) return;
    setDocLoading(true);
    const { data, error } = await supabase
      .from('reflection_documents')
      .select('*')
      .eq('course_id', courseId)
      .maybeSingle();
    if (!error && data) {
      setDoc(data as ReflectionDocument);
    } else {
      setDoc(null);
    }
    setDocLoading(false);
  }, [courseId]);

  useEffect(() => {
    fetchDoc();
  }, [fetchDoc]);

  if (!course) {
    return (
      <div className="max-w-editorial mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="font-serif text-xl text-ink-muted">
          Mata kuliah tidak ditemukan.
        </p>
        <Link
          to="/refleksi"
          className="font-serif text-ppg mt-4 inline-block link-underline"
        >
          ← Kembali ke Refleksi
        </Link>
      </div>
    );
  }

  const prevCourse = courseIndex > 0 ? courses[courseIndex - 1] : null;
  const nextCourse =
    courseIndex < courses.length - 1 ? courses[courseIndex + 1] : null;

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Breadcrumb */}
      <nav className="mb-10">
        <ol className="flex items-center gap-2 font-serif text-sm text-ink-muted">
          <li>
            <Link to="/" className="hover:text-ppg transition-colors duration-200">
              Beranda
            </Link>
          </li>
          <li className="text-line">/</li>
          <li>
            <Link
              to="/refleksi"
              className="hover:text-ppg transition-colors duration-200"
            >
              Refleksi
            </Link>
          </li>
          <li className="text-line">/</li>
          <li className="text-ink">{course.title}</li>
        </ol>
      </nav>

      {/* Course number + title */}
      <p className="font-serif text-sm text-ppg tracking-widest mb-3">
        {course.number}
      </p>
      <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-semibold tracking-tight leading-tight">
        {course.title}
      </h1>

      {/* Short description */}
      <p className="font-serif text-body text-ink-soft mt-4 max-w-prose">
        {course.shortDescription}
      </p>

      {/* Metadata */}
      <p className="font-serif text-sm text-ink-muted mt-4 tracking-wide">
        PPG Prajabatan · PJOK · Semester 1 · 2026
      </p>

      {/* Hero image */}
      <div className="mt-10">
        <img
          src={course.image}
          alt={course.imageAlt}
          className="w-full max-h-[460px] object-cover rounded-sm border border-line"
        />
        <p className="font-serif text-sm text-ink-muted mt-3 leading-snug">
          {course.imageCaption}
        </p>
      </div>

      <hr className="border-line mt-10" />

      {/* Main content + sidebar */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12">
        {/* Article content */}
        <div className="max-w-prose space-y-12">
          {/* Tentang Mata Kuliah */}
          <section id="tentang">
            <h2 className="font-serif text-xl text-ink font-semibold mb-4">
              Tentang Mata Kuliah
            </h2>
            <p className="font-serif text-body text-ink-soft">
              {course.description}
            </p>
          </section>

          {/* Hal yang Saya Pelajari */}
          <section id="hal-yang-dipelajari">
            <h2 className="font-serif text-xl text-ink font-semibold mb-4">
              Hal yang Saya Pelajari
            </h2>
            <ol className="space-y-3">
              {course.learningPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex gap-4 font-serif text-body text-ink-soft"
                >
                  <span className="font-serif text-sm text-ppg shrink-0 mt-[3px] tabular-nums">
                    {String(i + 1).padStart(2, '0')} —
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Pengalaman Belajar */}
          <section id="pengalaman">
            <h2 className="font-serif text-xl text-ink font-semibold mb-4">
              Pengalaman Belajar
            </h2>
            <p className="font-serif text-body text-ink-soft leading-[1.85]">
              {course.experience}
            </p>
          </section>

          {/* Refleksi */}
          <section id="refleksi">
            <h2 className="font-serif text-xl text-ink font-semibold mb-4">
              Refleksi
            </h2>
            <p className="font-serif text-body text-ink-soft leading-[1.85]">
              {course.reflection}
            </p>
          </section>

          {/* Pembelajaran yang Saya Bawa ke Praktik */}
          <section id="praktik">
            <h2 className="font-serif text-xl text-ink font-semibold mb-4">
              Pembelajaran yang Saya Bawa ke Praktik
            </h2>
            <p className="font-serif text-body text-ink-soft leading-[1.85]">
              {course.practiceConnection}
            </p>
          </section>

          {/* Dokumen Refleksi */}
          <section id="dokumen">
            <h2 className="font-serif text-xl text-ink font-semibold mb-4">
              Dokumen Refleksi
            </h2>

            {docLoading ? (
              <p className="font-serif text-body text-ink-muted">
                Memeriksa dokumen...
              </p>
            ) : doc ? (
              <div className="border-l-2 border-ppg pl-5">
                <p className="font-serif text-sm text-ppg tracking-wide mb-1">
                  Dokumen Refleksi Semester 1
                </p>
                <p className="font-serif text-lg text-ink font-semibold">
                  {doc.title}
                </p>
                {doc.description && (
                  <p className="font-serif text-body text-ink-soft mt-2">
                    {doc.description}
                  </p>
                )}
                <p className="font-serif text-sm text-ink-muted mt-2">
                  {doc.file_name} · {(doc.file_size / 1024).toFixed(0)} KB ·{' '}
                  {new Date(doc.upload_date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <Link
                  to={`/refleksi/${course.id}/dokumen`}
                  className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 whitespace-nowrap link-underline mt-4 inline-block"
                >
                  Baca Refleksi →
                </Link>
              </div>
            ) : (
              <div className="border-l-2 border-line pl-5">
                <p className="font-serif text-sm text-ink-muted tracking-wide mb-1">
                  Refleksi belum tersedia
                </p>
                <p className="font-serif text-body text-ink-soft">
                  Dokumen refleksi untuk mata kuliah ini belum ditambahkan.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar — table of contents (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-serif text-sm text-ink-muted tracking-widest uppercase mb-4">
              Dalam Refleksi
            </p>
            <nav className="border-l border-line-soft pl-4 space-y-3">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block font-serif text-[14px] text-ink-soft hover:text-ppg transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* Navigation between courses */}
      <hr className="border-line mt-16" />
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {prevCourse ? (
          <Link
            to={`/refleksi/${prevCourse.id}`}
            className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 link-underline text-left"
          >
            ← {prevCourse.title}
          </Link>
        ) : (
          <span />
        )}

        <Link
          to="/refleksi"
          className="font-serif text-[15px] text-ink-muted hover:text-ppg transition-colors duration-200 link-underline text-center"
        >
          Semua Refleksi
        </Link>

        {nextCourse ? (
          <Link
            to={`/refleksi/${nextCourse.id}`}
            className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 link-underline text-right"
          >
            {nextCourse.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
