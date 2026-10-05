import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Maximize2, Minimize2, Download } from 'lucide-react';
import { supabase, type ReflectionDocument, REFLECTION_BUCKET } from '@/lib/supabase';
import { courses } from '@/data/courses';

export default function PdfViewer() {
  const { courseId } = useParams<{ courseId: string }>();
  const [doc, setDoc] = useState<ReflectionDocument | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const course = courses.find((item) => item.id === courseId);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const enterFullscreen = async () => {
    if (!viewerRef.current) return;

    if (viewerRef.current.requestFullscreen) {
      await viewerRef.current.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

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
      {!isFullscreen && (
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
      )}

      {!isFullscreen && (
        <>
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
        </>
      )}

      <div
        ref={viewerRef}
        className={`${isFullscreen ? 'fixed inset-0 z-[60] bg-paper p-4 md:p-6 flex flex-col' : 'mt-8'}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          {isFullscreen && (
            <p className="font-serif text-base text-ink font-semibold truncate">
              {doc.title}
            </p>
          )}
          
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={doc.file_name}
            className="inline-flex items-center gap-2 font-serif text-sm text-ppg border border-ppg px-4 py-2 hover:bg-ppg hover:text-white transition-colors duration-200"
          >
            <Download size={17} />
            Buka / Unduh PDF
          </a>

          <button
            type="button"
            onClick={isFullscreen ? exitFullscreen : enterFullscreen}
            className="ml-auto inline-flex items-center gap-2 font-serif text-sm text-white bg-ppg px-4 py-2 hover:bg-ppg-dark transition-colors duration-200"
          >
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            {isFullscreen ? 'Keluar dari Layar Penuh' : 'Baca Layar Penuh'}
          </button>
        </div>

        <iframe
          src={pdfUrl}
          title={doc.title}
          className={`${isFullscreen ? 'flex-1 min-h-0' : 'w-full h-[75vh]'} border border-line rounded-sm`}
        />
      </div>

      {!isFullscreen && (
        <div className="mt-8">
          <Link
            to={`/refleksi/${course.id}`}
            className="font-serif text-[15px] text-ppg hover:text-ppg-dark transition-colors duration-200 link-underline"
          >
            ← Kembali ke {course.title}
          </Link>
        </div>
      )}
    </div>
  );
}
