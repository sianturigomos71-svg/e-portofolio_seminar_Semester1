import React from 'react';
import { Link } from 'react-router-dom';

export interface Course {
  id: string;
  title: string;
  code?: string;
  description: string;
}

export const courses: Course[] = [
  {
    id: 'ppl-terbimbing',
    title: 'PPL Terbimbing',
    description: 'Refleksi pengalaman praktik mengajar terbimbing di SMP Negeri 1 Medan, penerapan deep learning, dan diferensiasi stasiun.'
  },
  {
    id: 'filosofi-pendidikan',
    title: 'Filosofi Pendidikan dan Pendidikan Nilai',
    description: 'Refleksi pemikiran Ki Hajar Dewantara, sistem among, pendidikan nilai Pancasila, serta kode etik profesi guru.'
  },
  {
    id: 'pemahaman-peserta-didik',
    title: 'Pemahaman tentang Peserta Didik dan Pembelajaran',
    description: 'Refleksi profiling peserta didik, teori perkembangan, serta merancang pembelajaran inklusif dan responsif.'
  },
  {
    id: 'pembelajaran-berdiferensiasi',
    title: 'Pembelajaran Berdiferensiasi',
    description: 'Refleksi pemetaan kesiapan, gaya belajar, serta penerapan diferensiasi konten, proses, produk, dan lingkungan.'
  },
  {
    id: 'pembelajaran-mendalam-asesmen',
    title: 'Pembelajaran Mendalam dan Asesmen Dasar',
    description: 'Refleksi alur Understanding by Design (UbD), backward design, Big Idea, serta asesmen autentik tiga ranah.'
  },
  {
    id: 'pola-pikir-bertumbuh',
    title: 'Pola Pikir Bertumbuh (Growth Mindset)',
    description: 'Refleksi penerapan growth mindset, neuroplastisitas, reframing bahasa, dan strategi intervensi pada kelas PJOK.'
  }
];

export default function Reflections() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Refleksi Mata Kuliah</h1>
      <p className="text-gray-600 mb-8">Pilih mata kuliah untuk membaca refleksi 4C, analisis artefak, dan melihat dokumen PDF.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">{course.description}</p>
            </div>
            
            <Link
              to={`/refleksi/${course.id}`}
              className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
            >
              Baca Refleksi →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
