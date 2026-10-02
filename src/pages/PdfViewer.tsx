import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, type ReflectionDocument, REFLECTION_BUCKET } from '@/lib/supabase';
import { courses } from '@/data/courses';

export default function PdfViewer() {
  const { courseId } = useParams<{ courseId: string }>();
  const [doc, setDoc] = useState<ReflectionDocument | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    if (!courseId) return;

    let objectUrl: string | null = null;

    const loadDoc = async () => {
      setLoading(true);
      setError(false);

      const { data, error: dbError } = await supabase
        .from('reflection_documents')
        .select('*')
        .eq('course_id', courseId)
        .maybeSingle();

      if (dbError || !data) {
        setError(true);
        setLoading(false);
        return;
      }

      const docData = data as ReflectionDocument;
      setDoc(docData);

      // Download the PDF as a blob, then create a local object URL.
      // Supabase storage sets X-Frame-Options headers that block iframe embedding,
      // so we can't use the public URL directly in an iframe. A blob URL has no
      // cross-origin restrictions and works reliably.
      const { data: fileData, error: downloadError } = await supabase.storage
        .from(REFLECTION_BUCKET)
        .download(docData.storage_path);

      if (downloadError || !fileData) {
        setError(true);
        setLoading(false);
        return;
      }

      objectUrl = URL.createObjectURL(fileData);
      setPdfUrl(objectUrl);
      setLoading(false);
    };

    loadDoc();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [courseId]);

  if (loading) {
    return (
      <div className="max-w-editorial mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="font-serif text-body text-ink-muted">Memuat dokumen...</p>
      </div>
    );
  }

  if (error || !doc || !pdfUrl || !course) {
    return (
      <div className="max-w-editorial mx-auto px-6 lg:px-10 py-16">
        <p className="font-serif text-xl text-ink font-semibold mb-2">
          Dokumen tidak dapat dibuka
        </p>
        <p className="font-serif text-body text-ink-soft max-w-prose">
          Terjadi masalah saat memuat dokumen. Silakan coba beberapa saat lagi.
        </p>
        <Link
          to="/refleksi"
          className="font-serif text-ppg mt-6 inline-block link-underline"
        >
          ← Kembali ke Refleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 font-serif text-sm text-ink-muted flex-wrap">
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
          <li>
            <Link
              to={`/refleksi/${course.id}`}
              className="hover:text-ppg transition-colors duration-200"
            >
              {course.title}
            </Link>
          </li>
          <li className="text-line">/</li>
          <li className="text-ink">Dokumen</li>
        </ol>
      </nav>

      {/* Document info */}
      <p className="font-serif text-sm text-ppg tracking-widest mb-2">
        {course.number}
      </p>
      <h1 className="font-serif text-2xl md:text-3xl text-ink font-semibold tracking-tight">
        {doc.title}
      </h1>
      {doc.description && (
        <p className="font-serif text-body text-ink-soft mt-3 max-w-prose">
          {doc.description}
        </p>
      )}
      <p className="font-serif text-sm text-ink-muted mt-3">
        {doc.file_name} · {new Date(doc.upload_date).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <hr className="border-line mt-8" />

      {/* PDF viewer using blob URL */}
      <div className="mt-8">
        <iframe
          src={pdfUrl}
          title={doc.title}
          className="w-full h-[75vh] border border-line rounded-sm"
        />
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link
          to={`/refleksi/${course.id}`}
          className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 link-underline"
        >
          ← Kembali ke {course.title}
        </Link>
      </div>
    </div>
  );
}
