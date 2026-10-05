export interface Course {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  learningPoints: string[];
  experience: string;
  reflection: string;
  practiceConnection: string;
}

export const courses: Course[] = [
  {
    id: 'filosofi-pendidikan',
    number: '01',
    title: 'Filosofi Pendidikan dan Pendidikan Nilai',
    shortDescription:
      'Memahami landasan filosofis pendidikan dan nilai-nilai yang menjadi dasar dalam menjalankan peran sebagai pendidik.',
    description:
      'Mata kuliah ini membahas landasan filosofis pendidikan, berbagai aliran filsafat pendidikan, serta nilai-nilai yang menjadi dasar dalam menjalankan peran sebagai pendidik. Melalui mata kuliah ini, saya diajak untuk merenungkan apa hakikat pendidikan, untuk apa pendidikan itu dilaksanakan, dan bagaimana nilai-nilai dapat diinternalisasi dalam diri peserta didik.',
    image:
      'https://images.pexels.com/photos/8419491/pexels-photo-8419491.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Guru berinteraksi dengan peserta didik dalam proses diskusi pembelajaran di kelas',
    imageCaption:
      'Memahami pendidikan sebagai proses membentuk manusia dan nilai.',
    learningPoints: [
      'Hakikat pendidikan sebagai proses humanisasi dan transmisi nilai',
      'Aliran-aliran filsafat pendidikan: esensialisme, progresivisme, dan rekonstruksionisme',
      'Pendidikan nilai dan internalisasi nilai dalam praktik pembelajaran',
      'Peran pendidik sebagai agen moral dan transformator sosial',
      'Pendidikan sebagai upaya memanusiakan manusia',
    ],
    experience:
      'Selama mengikuti mata kuliah ini, saya banyak diajak untuk berdiskusi tentang apa arti sebenarnya dari mendidik. Saya menyadari bahwa selama ini saya cenderung memandang pendidikan hanya sebagai transfer pengetahuan, padahal ada dimensi yang lebih dalam — yaitu pembentukan karakter dan nilai. Diskusi-diskusi kelompok membantu saya melihat berbagai perspektif dan merenungkan posisi saya sendiri sebagai calon guru PJOK.',
    reflection:
      'Mata kuliah ini mengubah cara pandang saya tentang profesi guru. Saya belajar bahwa menjadi guru bukan sekadar mengajar materi, tetapi juga membawa nilai. Setiap keputusan yang saya ambil di kelas — dari cara saya berbicara, memberi penilaian, hingga membentuk interaksi antar peserta didik — semuanya membawa pesan nilai. Saya merasa tertantang untuk menjadi pendidik yang tidak hanya cerdas secara akademik, tetapi juga bijaksana secara moral.',
    practiceConnection:
      'Dalam praktik mengajar PJOK nanti, saya ingin menerapkan pendekatan yang menempatkan peserta didik sebagai subjek, bukan objek. Setiap aktivitas fisik dan olahraga yang saya rancang harus memiliki tujuan pendidikan nilai — seperti kerjasama, kejujuran, sportivitas, dan ketahanan. Saya juga ingin menjadi teladan bagi peserta didik, karena nilai tidak hanya diajarkan tetapi juga diteladani.',
  },
  {
    id: 'pemahaman-peserta-didik',
    number: '02',
    title: 'Pemahaman Peserta Didik',
    shortDescription:
      'Mempelajari karakteristik peserta didik serta pentingnya memahami kebutuhan mereka dalam proses pembelajaran.',
    description:
      'Mata kuliah ini membekali saya dengan pemahaman tentang karakteristik peserta didik dari berbagai aspek: kognitif, sosial, emosional, fisik, dan moral. Saya belajar bahwa setiap peserta didik adalah individu yang unik, dengan latar belakang, kebutuhan, dan cara belajar yang berbeda-beda. Pemahaman ini menjadi fondasi penting untuk merancang pembelajaran yang berpihak pada peserta didik.',
    image:
      'https://images.pexels.com/photos/8923363/pexels-photo-8923363.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Guru mengamati dan berinteraksi dengan peserta didik yang sedang bekerja di kelas',
    imageCaption:
      'Mengenali karakteristik, kebutuhan, dan keberagaman peserta didik.',
    learningPoints: [
      'Tahap-tahap perkembangan kognitif, sosial, emosional, dan fisik peserta didik',
      'Teori kecerdasan majemuk dan gaya belajar',
      'Pentingnya memahami latar belakang dan konteks sosial peserta didik',
      'Kebutuhan belajar dan cara mengakomodasi perbedaan individu',
      'Pendekatan pembelajaran yang berpihak pada peserta didik',
    ],
    experience:
      'Mata kuliah ini membuat saya banyak bercermin pada pengalaman saya sendiri sebagai siswa. Saya menyadari bahwa setiap peserta didik membawa cerita dan konteks yang berbeda ke dalam kelas. Saat diskusi, saya diajak untuk menganalisis studi kasus tentang peserta didik dengan berbagai karakteristik, dan ini membuka mata saya bahwa tidak ada satu pendekatan yang cocok untuk semua.',
    reflection:
      'Saya belajar bahwa memahami peserta didik bukan tugas sampingan, tetapi inti dari pekerjaan guru. Tanpa memahami siapa yang saya ajari, semua materi dan metode yang saya kuasai menjadi kurang bermakna. Saya merasa perlu mengubah cara saya memandang kelas — bukan sebagai kelompok homogen, tetapi sebagai kumpulan individu dengan kebutuhan yang beragam.',
    practiceConnection:
      'Sebagai calon guru PJOK, saya akan berusaha mengenali setiap peserta didik secara personal — kemampuan fisiknya, minatnya, tantangannya, dan cara belajarnya. Dalam pembelajaran olahraga, perbedaan kemampuan fisik sangat nyata, dan saya harus merancang aktivitas yang dapat mengakomodasi semua tingkat kemampuan tanpa membuat siapa pun merasa tertinggal atau minder.',
  },
  {
    id: 'pembelajaran-mendalam-asesmen',
    number: '03',
    title: 'Pembelajaran Mendalam dan Asesmen',
    shortDescription:
      'Memahami pembelajaran yang berkesadaran, bermakna, dan menggembirakan serta penerapan asesmen dalam pembelajaran.',
    description:
      'Mata kuliah ini membahas konsep pembelajaran mendalam (deep learning) yang menekankan pada pemahaman, bukan sekadar hafalan. Saya belajar tentang pembelajaran yang berkesadaran, bermakna, dan menggembirakan, serta bagaimana asesmen dapat digunakan sebagai alat untuk mendukung belajar, bukan hanya untuk mengukur hasil.',
    image:
      'https://images.pexels.com/photos/8363771/pexels-photo-8363771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Guru dan peserta didik merayakan pencapaian selama aktivitas pembelajaran di kelas',
    imageCaption:
      'Belajar secara berkesadaran, bermakna, dan menggembirakan.',
    learningPoints: [
      'Konsep pembelajaran mendalam dan perbedaannya dengan pembelajaran permukaan',
      'Prinsip pembelajaran yang berkesadaran, bermakna, dan menggembirakan',
      'Jenis-jenis asesmen: asesmen formatif, sumatif, dan diagnostik',
      'Asesmen autentik dan rubrik penilaian',
      'Pemanfaatan hasil asesmen untuk perbaikan pembelajaran',
    ],
    experience:
      'Mata kuliah ini sangat membuka wawasan saya tentang apa itu belajar yang sebenarnya. Saya menyadari bahwa selama ini banyak pembelajaran yang saya alami berhenti pada level hafalan dan pengenalan, bukan pemahaman. Saat saya mencoba merancang asesmen untuk sebuah skenario pembelajaran, saya merasakan betapa sulitnya membuat asesmen yang benar-benar mengukur pemahaman, bukan sekadar ingatan.',
    reflection:
      'Saya belajar bahwa asesmen bukan akhir dari pembelajaran, tetapi bagian dari prosesnya. Asesmen yang baik membantu peserta didik melihat di mana mereka berada dan ke mana mereka perlu pergi. Saya juga menyadari bahwa pembelajaran yang menggembirakan bukan berarti mudah — tantangan yang tepat dapat membuat pembelajaran terasa bermakna dan menyenangkan.',
    practiceConnection:
      'Dalam pembelajaran PJOK, saya akan menggunakan asesmen tidak hanya untuk menilai keterampilan fisik, tetapi juga pemahaman konsep, sikap, dan perkembangan peserta didik. Saya akan merancang asesmen formatif yang berkelanjutan, sehingga peserta didik mendapatkan umpan balik yang membantu mereka berkembang, bukan sekadar nilai akhir.',
  },
  {
    id: 'ppl-terbimbing',
    number: '04',
    title: 'PPL Terbimbing',
    shortDescription:
      'Menghubungkan teori yang dipelajari dengan pengalaman praktik pembelajaran di sekolah melalui proses observasi, perencanaan, pelaksanaan, dan refleksi.',
    description:
      'PPL Terbimbing adalah mata kuliah yang menghubungkan teori yang dipelajari di kampus dengan pengalaman praktik pembelajaran di sekolah. Melalui proses observasi, perencanaan, pelaksanaan, dan refleksi, saya mendapatkan pengalaman langsung menjadi guru dan menghadapi realitas kelas yang sesungguhnya.',
    image:
      'https://images.pexels.com/photos/7207546/pexels-photo-7207546.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Pelatih PJOK mengajar peserta didik dalam kegiatan olahraga di lapangan sekolah',
    imageCaption:
      'Menghubungkan teori dengan pengalaman nyata di sekolah.',
    learningPoints: [
      'Observasi pembelajaran di kelas nyata',
      'Perencanaan pembelajaran: silabus, RPP, dan modul ajar',
      'Pelaksanaan pembelajaran dan pengelolaan kelas',
      'Refleksi diri sebagai praktik pengembangan profesional',
      'Kolaborasi dengan guru pamong dan dosen pembimbing',
    ],
    experience:
      'PPL Terbimbing adalah pengalaman yang paling berkesan bagi saya selama Semester 1. Berdiri di depan kelas sebagai guru untuk pertama kalinya memberi saya perasaan campuran aduk — gugup, bersemangat, dan khawatir sekaligus. Saya belajar bahwa rencana pembelajaran yang rapi di atas kertas tidak selalu berjalan mulus di kelas nyata. Banyak hal tak terduga: peserta didik yang kurang antusias, waktu yang tidak cukup, atau aktivitas yang ternyata terlalu sulit.',
    reflection:
      'PPL mengajarkan saya kerendahan hati. Saya menyadari bahwa mengajar jauh lebih sulit dari yang saya bayangkan. Tetapi di saat yang sama, melihat peserta didik mulai paham dan menikmati pembelajaran memberi saya kepuasan yang tidak bisa dijelaskan dengan kata-kata. Saya belajar bahwa refleksi setelah mengajar sama pentingnya dengan persiapan sebelum mengajar — karena di situlah saya tumbuh.',
    practiceConnection:
      'Pengalaman PPL ini menjadi bekal paling nyata bagi saya. Saya akan terus mengasih kemampuan merencanakan pembelajaran yang fleksibel, mengelola kelas dengan tegas namun hangat, dan melakukan refleksi setiap kali selesai mengajar. Saya juga akan terus berdiskusi dengan guru-guru senior untuk belajar dari pengalaman mereka.',
  },
  {
    id: 'pola-pikir-bertumbuh',
    number: '05',
    title: 'Pola Pikir Bertumbuh',
    shortDescription:
      'Merefleksikan pentingnya growth mindset dalam menghadapi tantangan, proses belajar, dan perkembangan diri sebagai calon guru.',
    description:
      'Mata kuliah ini mengajak saya untuk merefleksikan pentingnya pola pikir bertumbuh (growth mindset) dalam menghadapi tantangan, proses belajar, dan perkembangan diri sebagai calon guru. Saya belajar bahwa cara saya memandang kesulitan dan kegagalan menentukan apakah saya akan tumbuh atau terjebak.',
    image:
      'https://images.pexels.com/photos/8199652/pexels-photo-8199652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Dua mahasiswa belajar bersama dengan dukungan satu sama lain di perpustakaan',
    imageCaption:
      'Melihat tantangan sebagai bagian dari proses belajar dan berkembang.',
    learningPoints: [
      'Konsep growth mindset vs fixed mindset',
      'Kekuatan kata "belum" dalam proses belajar',
      'Menerima tantangan sebagai kesempatan tumbuh',
      'Merefleksikan kegagalan sebagai sumber pembelajaran',
      'Membangun pola pikir bertumbuh pada peserta didik',
    ],
    experience:
      'Mata kuliah ini sangat personal bagi saya. Saya diajak untuk jujur melihat pola pikir saya sendiri, dan saya menyadari bahwa ada banyak area di mana saya masih terjebak dalam fixed mindset — merasa tidak mampu dalam hal-hal tertentu, atau menghindari tantangan karena takut gagal. Diskusi dan latihan reflektif membantu saya mulai mengubah cara saya memandang kesulitan.',
    reflection:
      'Saya belajar bahwa tumbuh itu pilihan, dan pilihan itu dimulai dari cara berpikir. Saya menyadari bahwa sebagai calon guru, pola pikir saya akan menular pada peserta didik. Jika saya menunjukkan bahwa kesalahan adalah bagian dari belajar, peserta didik akan merasa aman untuk mencoba, gagal, dan mencoba lagi. Ini adalah perubahan yang berawal dari diri sendiri.',
    practiceConnection:
      'Dalam pembelajaran PJOK, saya akan menanamkan pola pikir bertumbuh pada peserta didik dengan cara memberi pujian pada usaha dan proses, bukan hanya pada hasil. Saya akan membantu peserta didik melihat bahwa kemampuan fisik dan keterampilan olahraga dapat dilatih, dan bahwa "belum bisa" bukan berarti "tidak akan pernah bisa".',
  },
  {
    id: 'pembelajaran-berdiferensiasi',
    number: '06',
    title: 'Pembelajaran Berdiferensiasi',
    shortDescription:
      'Memahami bagaimana pembelajaran dapat dirancang berdasarkan kebutuhan, kesiapan, minat, dan karakteristik peserta didik.',
    description:
      'Mata kuliah ini membahas bagaimana pembelajaran dapat dirancang berdasarkan kebutuhan, kesiapan, minat, dan karakteristik peserta didik. Pembelajaran berdiferensiasi bukan berarti membuat banyak rencana berbeda, tetapi membuat satu pembelajaran yang dapat menampung keberagaman di dalam kelas.',
    image:
      'https://images.pexels.com/photos/8423457/pexels-photo-8423457.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt:
      'Peserta didik dari berbagai latar belakang terlibat dalam aktivitas pembelajaran berbeda di kelas',
    imageCaption:
      'Merancang pembelajaran berdasarkan kebutuhan dan karakteristik peserta didik.',
    learningPoints: [
      'Konsep dan prinsip pembelajaran berdiferensiasi',
      'Diferensiasi konten, proses, produk, dan lingkungan belajar',
      'Mengenal profil peserta didik: kesiapan, minat, profil belajar',
      'Strategi diferensiasi dalam praktik pembelajaran',
      'Penerapan diferensiasi dalam pembelajaran PJOK',
    ],
    experience:
      'Mata kuliah ini menantang saya untuk berpikir lebih kreatif dalam merancang pembelajaran. Saya belajar bahwa diferensiasi bukan beban tambahan, tetapi justru cara membuat pembelajaran lebih bermakna untuk semua. Saat saya mencoba merancang pembelajaran berdiferensiasi untuk PJOK, saya menyadari bahwa di kelas olahraga, perbedaan kemampuan fisik sangat nyata dan harus ditangani dengan bijaksana.',
    reflection:
      'Saya belajar bahwa satu ukuran tidak cocok untuk semua. Setiap peserta didik datang dengan kesiapan dan minat yang berbeda, dan tugas saya adalah merancang pembelajaran yang dapat menampung keragaman itu. Saya merasa mata kuliah ini menghubungkan semua mata kuliah sebelumnya — filosofi, pemahaman peserta didik, dan pembelajaran mendalam — menjadi satu praktik yang utuh.',
    practiceConnection:
      'Dalam pembelajaran PJOK, saya akan menerapkan diferensiasi dengan menawarkan beberapa tingkat kesulitan dalam satu aktivitas, memberi pilihan jenis olahraga atau gerakan sesuai minat, dan mengatur kelompok yang fleksibel. Saya akan memastikan bahwa setiap peserta didik, regardless of kemampuan fisiknya, merasa terlibat dan tertantang pada level yang tepat.',
  },
];

export const educationTimeline = [
  { institution: 'SD Lae Parira', period: 'Pendidikan Dasar' },
  { institution: 'SMPN Lae Parira', period: 'Pendidikan Menengah Pertama' },
  { institution: 'SMAN Lae Parira', period: 'Pendidikan Menengah Atas' },
  { institution: 'S1 PJKR Universitas Negeri Medan', period: 'Pendidikan Tinggi' },
  { institution: 'PPG Prajabatan', period: 'Pendidikan Profesi · 2026' },
];

import documentationPhoto01 from '@/assets/documentation/semester1/IMG_20260521_075014.jpg';
import documentationPhoto02 from '@/assets/documentation/semester1/IMG_20260521_074905.jpg';
import documentationPhoto03 from '@/assets/documentation/semester1/IMG-20260401-WA0013.jpg';
import documentationPhoto04 from '@/assets/documentation/semester1/IMG-20260417-WA0035.jpg';
import documentationPhoto05 from '@/assets/documentation/semester1/IMG-20260407-WA0030.jpg';
import documentationPhoto06 from '@/assets/documentation/semester1/IMG-20260424-WA0016.jpg';

export const profilePhoto = '/images/IMG_1546.JPG';

export const profilePhotoSecondary =
  'https://images.pexels.com/photos/31409070/pexels-photo-31409070.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export interface DocumentationPhoto {
  image: string;
  imageAlt: string;
  title: string;
  caption: string;
  category: string;
}

export const documentationPhotos: DocumentationPhoto[] = [
  {
    image: documentationPhoto01,
    imageAlt: 'Peserta PPG mengikuti kegiatan pembelajaran bersama di dalam kelas',
    title: '',
    caption: '',
    category: 'Dokumentasi Semester 1',
  },
  {
    image: documentationPhoto02,
    imageAlt: 'Peserta PPG mengajar dan berinteraksi dengan peserta didik di dalam kelas',
    title: '',
    caption: '',
    category: 'Dokumentasi Semester 1',
  },
  {
    image: documentationPhoto03,
    imageAlt: 'Peserta PPG mengikuti kegiatan pembelajaran di ruang kelas',
    title: '',
    caption: '',
    category: 'Dokumentasi Semester 1',
  },
  {
    image: documentationPhoto04,
    imageAlt: 'Peserta PPG berfoto bersama di lingkungan sekolah',
    title: '',
    caption: '',
    category: 'Dokumentasi Semester 1',
  },
  {
    image: documentationPhoto05,
    imageAlt: 'Peserta PPG mengikuti kegiatan pembelajaran di dalam kelas',
    title: '',
    caption: '',
    category: 'Dokumentasi Semester 1',
  },
  {
    image: documentationPhoto06,
    imageAlt: 'Peserta PPG berfoto bersama di halaman sekolah',
    title: '',
    caption: '',
    category: 'Dokumentasi Semester 1',
  },
];
