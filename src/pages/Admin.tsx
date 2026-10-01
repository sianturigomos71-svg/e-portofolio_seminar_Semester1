import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type ReflectionDocument, REFLECTION_BUCKET, MAX_FILE_SIZE } from '@/lib/supabase';
import { courses } from '@/data/courses';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [documents, setDocuments] = useState<ReflectionDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // Upload form state
  const [selectedCourse, setSelectedCourse] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docDescription, setDocDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    { type: 'success' | 'error'; message: string } | null
  >(null);

  const checkSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) setAuthed(true);
  }, []);

  useEffect(() => {
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => subscription.unsubscribe();
  }, [checkSession]);

  const fetchDocuments = useCallback(async () => {
    setLoadingDocs(true);
    const { data, error } = await supabase
      .from('reflection_documents')
      .select('*')
      .order('course_id');
    if (!error && data) {
      setDocuments(data as ReflectionDocument[]);
    }
    setLoadingDocs(false);
  }, []);

  useEffect(() => {
    if (authed) fetchDocuments();
  }, [authed, fetchDocuments]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message === 'Invalid login credentials'
        ? 'Email atau kata sandi salah.'
        : 'Gagal masuk. Silakan coba lagi.');
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setEmail('');
    setPassword('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (file.type !== 'application/pdf') {
      setUploadStatus({ type: 'error', message: 'Hanya file PDF yang diperbolehkan.' });
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadStatus({
        type: 'error',
        message: `Ukuran file melebihi batas ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)} MB.`,
      });
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setUploadStatus(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !docTitle || !selectedFile) {
      setUploadStatus({ type: 'error', message: 'Pilih mata kuliah, isi judul, dan pilih file PDF.' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const course = courses.find((c) => c.id === selectedCourse);
      if (!course) throw new Error('Mata kuliah tidak ditemukan.');

      const fileExt = selectedFile.name.split('.').pop() || 'pdf';
      const storagePath = `${selectedCourse}/refleksi-${selectedCourse}.${fileExt}`;

      // Check if a document already exists for this course
      const { data: existing } = await supabase
        .from('reflection_documents')
        .select('*')
        .eq('course_id', selectedCourse)
        .maybeSingle();

      // Upload file to storage (upsert)
      const { error: uploadError } = await supabase.storage
        .from(REFLECTION_BUCKET)
        .upload(storagePath, selectedFile, { upsert: true });

      if (uploadError) throw uploadError;

      if (existing) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('reflection_documents')
          .update({
            title: docTitle,
            description: docDescription || null,
            file_name: selectedFile.name,
            file_size: selectedFile.size,
            storage_path: storagePath,
            updated_at: new Date().toISOString(),
          })
          .eq('course_id', selectedCourse);
        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('reflection_documents')
          .insert({
            course_id: selectedCourse,
            title: docTitle,
            description: docDescription || null,
            file_name: selectedFile.name,
            file_size: selectedFile.size,
            storage_path: storagePath,
          });
        if (insertError) throw insertError;
      }

      setUploadStatus({ type: 'success', message: 'Refleksi berhasil disimpan.' });
      setSelectedCourse('');
      setDocTitle('');
      setDocDescription('');
      setSelectedFile(null);
      fetchDocuments();
    } catch {
      setUploadStatus({
        type: 'error',
        message: 'Upload gagal. Dokumen belum berhasil disimpan. Silakan periksa ukuran file dan koneksi kemudian coba kembali.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc: ReflectionDocument) => {
    if (!confirm(`Hapus refleksi "${doc.title}"?`)) return;

    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from(REFLECTION_BUCKET)
        .remove([doc.storage_path]);
      if (storageError) throw storageError;

      // Delete record
      const { error: dbError } = await supabase
        .from('reflection_documents')
        .delete()
        .eq('id', doc.id);
      if (dbError) throw dbError;

      fetchDocuments();
    } catch {
      alert('Gagal menghapus dokumen. Silakan coba lagi.');
    }
  };

  // ===== Login screen =====
  if (!authed) {
    return (
      <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
        <div className="max-w-md mx-auto">
          <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-3">
            Kelola Refleksi
          </p>
          <h1 className="font-serif text-3xl text-ink font-semibold tracking-tight mb-8">
            Masuk
          </h1>

          {authError && (
            <p className="font-serif text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 mb-6">
              {authError}
            </p>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block font-serif text-sm text-ink-soft mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full font-serif text-body border border-line bg-paper-card px-4 py-2 focus:outline-none focus:border-ppg transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block font-serif text-sm text-ink-soft mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full font-serif text-body border border-line bg-paper-card px-4 py-2 focus:outline-none focus:border-ppg transition-colors duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="font-serif text-[15px] text-white bg-ppg px-6 py-3 hover:bg-ppg-dark transition-colors duration-200 disabled:opacity-50"
            >
              {authLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-line-soft">
            <Link
              to="/"
              className="font-serif text-sm text-ppg hover:text-ppg-dark transition-colors duration-200 link-underline"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== Admin dashboard =====
  return (
    <div className="fade-in max-w-editorial mx-auto px-6 lg:px-10 py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
        <div>
          <p className="font-serif text-sm text-ppg tracking-widest uppercase mb-2">
            Kelola Refleksi
          </p>
          <h1 className="font-serif text-3xl text-ink font-semibold tracking-tight">
            Kelola Refleksi
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="font-serif text-sm text-ink-muted hover:text-ppg transition-colors duration-200 link-underline w-fit"
        >
          Keluar
        </button>
      </div>

      {/* Upload form */}
      <div className="mb-16">
        <h2 className="font-serif text-xl text-ink font-semibold mb-6">
          Tambah / Ganti Refleksi
        </h2>

        {uploadStatus && (
          <p
            className={`font-serif text-sm px-4 py-3 mb-6 ${
              uploadStatus.type === 'success'
                ? 'text-green-800 bg-green-50 border border-green-200'
                : 'text-red-700 bg-red-50 border border-red-200'
            }`}
          >
            {uploadStatus.message}
          </p>
        )}

        <form onSubmit={handleUpload} className="max-w-prose space-y-5">
          <div>
            <label className="block font-serif text-sm text-ink-soft mb-1">
              Mata Kuliah
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="w-full font-serif text-body border border-line bg-paper-card px-4 py-2 focus:outline-none focus:border-ppg transition-colors duration-200"
            >
              <option value="">— Pilih mata kuliah —</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.number} — {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-serif text-sm text-ink-soft mb-1">
              Judul Dokumen
            </label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              required
              placeholder="Refleksi Mata Kuliah..."
              className="w-full font-serif text-body border border-line bg-paper-card px-4 py-2 focus:outline-none focus:border-ppg transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block font-serif text-sm text-ink-soft mb-1">
              Deskripsi (opsional)
            </label>
            <textarea
              value={docDescription}
              onChange={(e) => setDocDescription(e.target.value)}
              rows={3}
              className="w-full font-serif text-body border border-line bg-paper-card px-4 py-2 focus:outline-none focus:border-ppg transition-colors duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block font-serif text-sm text-ink-soft mb-1">
              File PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full font-serif text-body text-ink-soft file:mr-4 file:font-serif file:text-sm file:text-white file:bg-ppg file:border-0 file:px-4 file:py-2 file:cursor-pointer"
            />
            {selectedFile && (
              <p className="font-serif text-sm text-ink-muted mt-2">
                {selectedFile.name} — {(selectedFile.size / 1024).toFixed(0)} KB
              </p>
            )}
            <p className="font-serif text-xs text-ink-muted mt-2">
              Batas ukuran: {(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)} MB. Hanya PDF.
            </p>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="font-serif text-[15px] text-white bg-ppg px-6 py-3 hover:bg-ppg-dark transition-colors duration-200 disabled:opacity-50"
          >
            {uploading ? 'Menyimpan...' : 'Simpan Refleksi'}
          </button>
        </form>
      </div>

      {/* Existing documents */}
      <div>
        <h2 className="font-serif text-xl text-ink font-semibold mb-6">
          Refleksi Tersimpan
        </h2>

        {loadingDocs ? (
          <p className="font-serif text-body text-ink-muted">Memuat...</p>
        ) : documents.length === 0 ? (
          <p className="font-serif text-body text-ink-muted">
            Belum ada refleksi yang ditambahkan.
          </p>
        ) : (
          <div>
            {documents.map((doc, i) => {
              const course = courses.find((c) => c.id === doc.course_id);
              return (
                <div key={doc.id}>
                  {i > 0 && <hr className="border-line-soft" />}
                  <div className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <p className="font-serif text-sm text-ppg tracking-wide">
                        {course?.number} — {course?.title}
                      </p>
                      <p className="font-serif text-lg text-ink font-semibold mt-1">
                        {doc.title}
                      </p>
                      {doc.description && (
                        <p className="font-serif text-sm text-ink-soft mt-1 max-w-prose">
                          {doc.description}
                        </p>
                      )}
                      <p className="font-serif text-sm text-ink-muted mt-2">
                        {doc.file_name} — {(doc.file_size / 1024).toFixed(0)} KB ·{' '}
                        {new Date(doc.upload_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(doc)}
                      className="font-serif text-sm text-red-700 hover:text-red-900 transition-colors duration-200 link-underline whitespace-nowrap"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
