import React from 'react';
import { Link } from 'react-router-dom';

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const courses: Course[] = [
  {
    id: 'ppl-terbimbing',
    title: 'PPL Terbimbing',
    description: 'maksudnya teori yang dipelajari dengan pengalaman praktik pembelajaran di sekolah melalui proses observasi, perencanaan, pelaksanaan, dan refleksi.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'filosofi-pendidikan',
    title: 'Filosofi Pendidikan dan Pendidikan Nilai',
    description: 'Menelusuri pemikiran Ki Hajar Dewantara, sistem among, pendidikan nilai Pancasila, serta kode etik profesi guru.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pemahaman-peserta-didik',
    title: 'Pemahaman tentang Peserta Didik dan Pembelajaran',
    description: 'Memahami teori perkembangan, profil peserta didik, serta merancang pembelajaran yang inklusif dan responsif.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pembelajaran-berdiferensiasi',
    title: 'Pembelajaran Berdiferensiasi',
    description: 'Memahami bagaimana pembelajaran dapat dirancang berdasarkan kebutuhan, kesiapan, minat, dan karakteristik peserta didik.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pembelajaran-mendalam-asesmen',
    title: 'Pembelajaran Mendalam dan Asesmen Dasar',
    description: 'Memahami pembelajaran yang berkesadaran, bermakna, dan menggembirakan serta penerapan asesmen dalam pembelajaran.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pola-pikir-bertumbuh',
    title: 'Pola Pikir Bertumbuh',
    description: 'Merefleksikan pentingnya growth mindset dalam menghadapi tantangan, proses belajar, dan perkembangan diri sebagai calon guru.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400'
  }
];

export default function Reflections() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-gray-900 mb-8">Refleksi</h1>

      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
              <img
                src={course.image}
                alt={course.title}
                className="w-full sm:w-48 h-32 object-cover rounded-md flex-shrink-0"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
              </div>
            </div>

            <Link
              to={`/refleksi/${course.id}`}
              className="text-gray-700 hover:text-indigo-600 font-medium text-sm flex items-center gap-1 whitespace-nowrap self-end md:self-center"
            >
              Baca Refleksi →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
