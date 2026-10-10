import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface ReflectionDetail {
  id: string;
  title: string;
  pdfUrl?: string;
  connection: string;
  challenge: string;
  concept: string;
  change: string;
  analisisArtefak: string;
}

const detailsData: Record<string, ReflectionDetail> = {
  'ppl-terbimbing': {
    id: 'ppl-terbimbing',
    title: 'PPL Terbimbing',
    pdfUrl: '/LK2_PPL_Terbimbing.pdf',
    connection: 'Pengalaman perkuliahan PPL Terbimbing mempertemukan saya secara langsung dengan peran nyata sebagai calon guru PJOK di SMP Negeri 1 Medan, dimulai dari kegiatan orientasi hingga observasi ekosistem sekolah. Melalui proses ini, saya memahami bahwa merancang pembelajaran bukan pekerjaan yang berdiri sendiri, melainkan harus sejalan dengan visi sekolah yang menempatkan pembelajaran mendalam (deep learning) dan pembentukan karakter sebagai arah utama. Ketika mempraktikkan pembelajaran berdiferensiasi dan pendekatan deep learning (mindful, meaningful, joyful) pada materi passing bola basket, lay-up shoot, lompat jauh, dan gerak berirama di kelas VIII, seluruh pengetahuan teoretis mengenai asesmen diagnostik dan scaffolding diuji secara langsung pada murid nyata. Pengalaman ini membuka kesadaran saya bahwa peran guru PJOK bukan sekadar menyampaikan materi gerak, melainkan membaca kebutuhan unik setiap murid dan merancang pengalaman belajar yang relevan.',
    challenge: 'Tantangan terbesar yang saya hadapi adalah mengubah kebiasaan lama saat membuka dan merancang pembelajaran, di mana pada awal PPL saya hanya membuat satu jenis latihan statis yang sama untuk semua murid karena khawatir diferensiasi terlalu rumit. Akibatnya, murid yang sudah mahir merasa bosan sementara murid yang kesulitan menjadi frustrasi. Selain itu, keterbatasan sarana seperti jumlah bola basket yang hanya dua buah, perangkat video analisis yang terbatas, jaringan wifi yang belum merata, serta suara yang kurang memadai untuk musik berirama menjadi hambatan nyata saat mengelola tiga kelompok sekaligus. Evaluasi Guru Pamong pada Siklus 1 juga menjadi bahan perbaikan penting bagi saya untuk lebih sering berkeliling, menjaga arah pandang menghadap murid saat menerangkan, serta menata ruang kelas terbuka dengan lebih efektif.',
    concept: 'Konsep kunci pertama yang saya pelajari adalah pelaksanaan pembelajaran berdiferensiasi berbasis stasiun, di mana penyesuaian konten, proses, produk, dan lingkungan belajar didasarkan pada hasil asesmen diagnostik. Pengelompokan ini bersifat dinamis dan dipantau melalui asesmen formatif seperti lembar observasi, kartu tugas, dan exit ticket. Konsep penting kedua adalah pendekatan deep learning dalam PJOK yang diwujudkan melalui elemen mindful (slow-motion drill dan jeda reflektif), meaningful (analogi gerak dan keterkaitan dengan kebugaran), serta joyful (sistem poin, tantangan bertingkat, dan musik populer). Kedua konsep ini saling menopang karena diferensiasi membuat tantangan terasa adil, sementara deep learning menjadikan aktivitas gerak tidak sekadar diulang tetapi dipahami dan dirasakan.',
    change: 'Setelah menuntaskan mata kuliah ini, saya berkomitmen melakukan perubahan konkret pada pengelolaan waktu stasiun secara proporsional (pemula 10-12 menit, menengah/mahir 8-10 menit) dengan jeda reflektif 3-5 menit, serta menyediakan kartu kemajuan agar murid dapat naik level secara mandiri. Saya juga akan mengoptimalkan asesmen awal 5 menit, menyediakan portofolio video singkat untuk merekam perkembangan gerak individu, serta meningkatkan intensitas kehadiran saya di sekitar kelompok pemula. Untuk aspek inklusi dan sarana, saya akan menerapkan teknik latihan bertahap, memodifikasi alat, menyediakan stasiun "Analis" bagi murid yang cedera agar tetap terlibat, serta memanfaatkan playlist musik dengan tiga tempo berbeda demi menciptakan pembelajaran PJOK yang inklusif dan berpusat pada murid.',
    analisisArtefak: 'Artefak pembelajaran yang dipilih terdiri dari enam kelompok dokumen, meliputi LK 1 Orientasi dan Observasi Manajemen Sekolah, LK 2 Observasi Lingkungan Belajar, LK 3 Refleksi Praktik Asistensi, LK 4 Refleksi Praktik Terbimbing (1-3), Modul Ajar dan LKPD beserta Analisis Produk Pembelajaran, serta Lembar Penilaian Praktik Mengajar dari Guru Pamong (Lampiran 8). Seluruh artefak ini dipilih karena merunut secara runtut perjalanan PPL saya dari mengenal sekolah hingga mengajar secara mandiri di SMP Negeri 1 Medan. Bagian-bagian spesifik seperti analisis keterlibatan murid yang meningkat dari 60% menjadi 92% pada LK 3, perbandingan apersepsi pada LK 4, hingga catatan umpan balik Guru Pamong dengan nilai 3,8 menjadi bukti objektif adanya peningkatan kompetensi pedagogik dan manajerial saya.'
  },
  'filosofi-pendidikan': {
    id: 'filosofi-pendidikan',
    title: 'Filosofi Pendidikan dan Pendidikan Nilai',
    pdfUrl: '/LK2_Filosofi_Pendidikan.pdf',
    connection: 'Mata kuliah ini menyentuh secara mendalam cara pandang saya terhadap peran sebagai calon guru PJOK melalui pemikiran Ki Hajar Dewantara, Pancasila, dan orientasi pendidikan nasional yang menuntun peserta didik sesuai kodrat alam dan kodrat zamannya. Jika sebelumnya saya lebih menitikberatkan pembelajaran pada pencapaian keterampilan fisik semata, kini saya menyadari bahwa setiap aktivitas olahraga merupakan sarana strategis untuk menanamkan nilai sportivitas, disiplin, kerja sama, dan tanggung jawab. Pembelajaran dari kisah Sokola Rimba bersama Butet Manurung mengajarkan pentingnya hadir dengan rendah hati, mendengar lebih dulu, dan memahami konteks budaya peserta didik. Sementara itu, analisis kasus pelanggaran etika menegaskan bahwa guru adalah teladan utama yang setiap tindakan dan respon emosionalnya diamati secara langsung oleh murid.',
    challenge: 'Tantangan terbesar yang saya hadapi adalah mengubah pola pikir bahwa pendidikan nilai bukan hanya tanggung jawab guru Agama, PPKn, atau BK, melainkan tugas melekat seluruh pendidik termasuk guru PJOK. Saya juga menyadari bahwa menanamkan nilai tidak cukup melalui ceramah atau poster kata bijak, melainkan harus dihidupi secara konsisten. Dalam praktiknya, nilai-nilai yang diajarkan di sekolah sering kali bertabrakan dengan kenyataan di lingkungan keluarga maupun masyarakat. Selain itu, mengelola emosi pendidik di tengah padatnya tuntutan kurikulum dan menghadapi siswa yang bermasalah menuntut kesabaran ekstra untuk mendengarkan alih-alih memberikan hukuman fisikal.',
    concept: 'Konsep utama yang saya pelajari meliputi landasan filosofis Ki Hajar Dewantara mengenai sistem among dan peran guru (Ing Ngarso Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani) serta pola pikir bertumbuh yang kontekstual. Saya juga mendalami tahapan internalisasi nilai yang berlangsung dari transformasi, transaksi, hingga trans-internalisasi melalui diskusi dilema moral dan pembiasaan. Keempat konsep tersebut disempurnakan oleh Kode Etik Profesi Guru berdasarkan Permendikbudristek No. 67 Tahun 2024 Pasal 8 dan 9, di mana etika terhadap ilmu, peserta didik, dan profesi menjadi batas hukum dan moral agar keteladanan pendidik tidak berhenti sebatas slogan.',
    change: 'Langkah perubahan yang ingin saya wujudkan berfokus pada keseimbangan antara pencapaian kompetensi gerak dan pembentukan karakter Pancasila dengan mengintegrasikan ruang refleksi di setiap sesi PJOK. Secara personal, saya melatih kontrol emosi melalui teknik jeda napas serta berkomitmen menerapkan disiplin positif tanpa kekerasan fisik maupun psikis. Dalam tindakan nyata, saya merancang aksi nyata berupa penulisan jurnal refleksi nilai harian berbasis lima nilai Pancasila, pelaksanaan kegiatan "Sapa Pagi Nilai" selama 10 menit, penginisiasian "Pojok Refleksi Guru" di sekolah, serta pembentukan komunikasi positif yang erat bersama orang tua peserta didik.',
    analisisArtefak: 'Kumpulan artefak yang dipilih meliputi Jurnal Refleksi Topik 1 (Aktivitas 1.6), Peta Konsep "I Used to Think..., Now I Think..." dan Manifesto Pola Pikir Bertumbuh (Aktivitas 2.4.1 & 2.5), Diskusi The 4 C\'s (Aktivitas 3.3.1), Proyek Modul Ajar Berbasis Nilai (Aktivitas 3.5.2), Refleksi Pelanggaran Etika Profesi (LK 4.C & 4.D), serta Rancangan Aksi Nyata (LK 4.E). Artefak-artefak ini dipilih karena secara runtut menggambarkan perjalanan perkembangan filosofis saya dari pemahaman teoretis awal hingga penyusunan aksi nyata. Bagian pergeseran pola pikir fixed ke growth mindset, analisis kasus pencukuran rambut paksa, serta tiga skenario aksi nyata pada LK 4.E menjadi bukti valid bahwa refleksi ini telah menghasilkan komitmen tindakan yang konkret.'
  },
  'pemahaman-peserta-didik': {
    id: 'pemahaman-peserta-didik',
    title: 'Pemahaman tentang Peserta Didik dan Pembelajaran',
    pdfUrl: '/LK2_Pemahaman_Peserta_Didik.pdf',
    connection: 'Mata kuliah ini menjawab pertanyaan paling fundamental mengenai siapa peserta didik yang dihadapi dan bagaimana melayani kebutuhan belajar mereka secara tepat di dalam kelas. Melalui analisis kasus nyata seperti situasi kelas Pak Purnomo di SMP Negeri 1 Medan, saya melihat jelas bagaimana kesiapan fisik dan tingkat kecemasan memengaruhi partisipasi siswa. Siswa yang atletis seperti Bella cenderung membentuk kelompok eksklusif, sementara siswa seperti Andi dan Cici menyingkir atau berpura-pura sakit karena takut terkena bola dan takut malu. Pengalaman ini menyadarkan saya bahwa ketidakaktifan siswa di lapangan sering kali bukan disebabkan oleh rasa malas, melainkan oleh pendekatan pembelajaran yang belum mengenali kebutuhan dan rasa aman mereka.',
    challenge: 'Tantangan terbesar yang saya rasakan adalah menerjemahkan berbagai teori perkembangan yang kompleks menjadi tindakan mengajar nyata bagi siswa yang berbeda-beda secara bersamaan. Saya harus mengubah kebiasaan lama yang memandang teori belajar secara terpisah-pisah dan menganggap aspek emosional siswa hanya sebagai pelengkap. Mengubah pola mengajar konvensional "demonstrasi lalu praktik bebas" yang rentan memperlebar kesenjangan menjadi rancangan yang fleksibel membutuhkan penguasaan strategi yang matang, termasuk dalam mengatasi empat akar masalah pembelajarannya Bu Sinta.',
    concept: 'Konsep-konsep utama yang saya pelajari mencakup teori perkembangan kognitif Piaget (tahap operasional konkret vs abstrak) dan Vygotsky mengenai Zone of Proximal Development serta scaffolding. Saya juga mendalami perkembangan sosial-emosional Erikson (industry vs inferiority), tahapan moral Kohlberg dan Gilligan, perkembangan fisik Malina & Gabbard, serta kecerdasan majemuk Gardner. Seluruh konsep ini dipadukan dengan tiga teori belajar utama (konstruktivisme, humanisme, dan belajar sosial) untuk melakukan profiling peserta didik dan merancang pembelajaran berdiferensiasi Tomlinson berdasarkan asesmen diagnostik awal.',
    change: 'Rencana pembaruan yang akan saya terapkan meliputi pelaksanaan asesmen diagnostik awal dan profiling secara berkala sebelum menyusun modul ajar. Saya akan membangun kesepakatan kelas yang menjamin rasa aman emosional (seperti aturan "kita boleh salah"), menyediakan kotak complaint anonim, merancang scaffolding bertahap melalui LKPD tiga level, serta membentuk kelompok heterogen dengan aturan inklusi yang tegas (seperti seluruh anggota wajib menyentuh bola). Penilaian juga akan dialihkan agar tidak hanya melihat hasil akhir keterampilan fisik, melainkan menghargai proses, keberanian, dan sikap kerja sama siswa.',
    analisisArtefak: 'Artefak pendukung yang dipilih mencakup Laporan UTS PPDP (analisis kasus Rizky, Zahra, Beno, Nurul), Laporan UAS PPDP (analisis kasus SMPN 1 Medan dengan diagram fishbone), serta LK 1, LK 3, dan LK 4. Artefak ini dipilih karena merekam secara utuh alur perkembangan belajar saya dalam memecahkan masalah pembelajaran PJOK di lapangan. Bagian tabel akar masalah, profil peserta didik, instrumen asesmen diagnostik, serta desain permainan small-sided games 3v3 pada LK 4E menjadi bukti kuat bahwa saya telah mampu menerapkan konsep perkembangan peserta didik ke dalam desain pedagogis nyata.'
  },
  'pembelajaran-berdiferensiasi': {
    id: 'pembelajaran-berdiferensiasi',
    title: 'Pembelajaran Berdiferensiasi',
    pdfUrl: '/LK2_Pembelajaran_Berdiferensiasi.pdf',
    connection: 'Materi perkuliahan ini terhubung erat dengan pengalaman nyata saya saat mengajar kelas VIII Kiras Bangun di SMP Negeri 1 Medan yang berisi 28 peserta didik dengan karakteristik sangat beragam. Data angket asesmen awal yang saya rancang menunjukkan bahwa kesiapan belajar mereka terbagi menjadi 36% tinggi, 43% sedang, dan 21% rendah, dengan dominasi gaya belajar kinestetik sebesar 50%. Pengalaman menyusun instrumen, menganalisis kasus Pak Budi yang mengajar basket pada 36 siswa, serta simulasi mengajar kebugaran dan lay-up memperkuat kesadaran saya bahwa guru PJOK bertugas memastikan setiap anak tetap memiliki ruang belajar yang adil.',
    challenge: 'Hambatan terbesarnya adalah melepaskan kebiasaan lama bahwa mengajar cukup dengan memberikan instruksi dan contoh gerak yang sama kepada seluruh siswa. Melalui analisis kasus Pak Darso, saya memahami bahwa memberikan tambahan 10 soal bagi siswa yang cepat selesai bukanlah diferensiasi, melainkan hanya menambah beban tanpa tantangan berpikir. Saat mensimulasikan diferensiasi di lapangan terbuka, saya merasa kesulitan dalam membagi perhatian ke tiga stasiun latihan sekaligus, memantau risiko keselamatan fisik, serta menjaga agar siswa di kelompok pemula tidak merasa terlabel atau berkecil hati.',
    concept: 'Konsep utama yang saya kuasai mencakup empat elemen diferensiasi Tomlinson yaitu penyesuaian konten, proses, produk, dan lingkungan belajar berdasarkan kesiapan, minat, dan profil siswa. Konsep ini ditopang oleh asesmen diagnostik sebagai dasar pengelompokan fleksibel, prinsip Universal Design for Learning (UDL), serta kerangka Understanding by Design dan pendekatan deep learning (mindful, meaningful, joyful). Pengintegrasian konsep-konsep ini menghasilkan alur pembelajaran yang adil, di mana tingkat kesulitan latihan dan pilihan unjuk kerja disesuaikan tanpa mengurangi standar penilaian.',
    change: 'Perubahan utama yang akan saya wujudkan adalah mengawali setiap unit materi dengan asesmen diagnostik yang terstruktur serta menetapkan sistem kelompok dinamis agar siswa dapat berpindah level secara mandiri. Dalam praktik mengajar, saya akan mengoperasionalkan stasiun belajar, memodifikasi peralatan olahraga (seperti bola lebih ringan dan ring lebih rendah), serta menyediakan variasi bentuk laporan tugas seperti video atau poster. Saya juga akan menerapkan aturan kelas anti-ejekan, membagikan rubrik penilaian yang transparan di awal, memanfaatkan "Jurnal Cek Denyut" di akhir sesi, serta menguasai prosedur PRICE untuk keselamatan.',
    analisisArtefak: 'Artefak yang dijadikan bukti dukung meliputi Refleksi LK 1.1, Laporan UTS berupa data pemetaan siswa PPL, analisis kasus Pak Darso (LK 1.C), dokumen Prototype Simulasi (LK 2.D), RPP Bola Basket/Modul Ajar Lay-up (LK 4.C), serta Refleksi Compass Points (LK 4.E). Pemilihan artefak ini didasarkan pada keberadaannya yang merepresentasikan bukti langsung penerapan diferensiasi di kelas PPL nyata. Tabel pemetaan kesiapan belajar, modul stasiun bertingkat, serta rekomendasi diferensiasi dalam artefak secara jelas menunjukkan transformasi pemikiran dan keterampilan mengajar saya.'
  },
  'pembelajaran-mendalam-asesmen': {
    id: 'pembelajaran-mendalam-asesmen',
    title: 'Pembelajaran Mendalam dan Asesmen Dasar',
    pdfUrl: '/LK2_Pembelajaran_Mendalam_dan_Asesmen.pdf',
    connection: 'Mata kuliah ini berkaitan langsung dengan pekerjaan utama saya sebagai calon guru PJOK dalam merancang, melaksanakan, dan menilai pembelajaran di lapangan. Pemahaman saya teruji ketika mengevaluasi pengalaman mengajar passing bawah bola voli di kelas IX, di mana siswa mampu lulus tes keterampilan tetapi bingung menggunakannya secara taktis dalam permainan utuh. Pengalaman menyusun ulang kasus kasti Pak Arif berbasis Big Idea dan pertanyaan esensial menyadarkan saya bahwa peran pendidik bukan sekadar pelatih gerak, melainkan fasilitator yang membantu siswa menemukan makna mendalam dari setiap aktivitas fisik yang dilakukan.',
    challenge: 'Tantangan terbesar yang saya hadapi adalah menggeser kebiasaan merancang kegiatan belajar terlebih dahulu sebelum menentukan asesmen, serta kesulitan merumuskan pertanyaan esensial yang tidak cukup dijawab "ya" atau "tidak". Menyusun modul ajar berbasis alur backward design sering kali menghasilkan alokasi waktu yang terlalu padat saat diterapkan di lapangan. Selain itu, analisis kasus Pak Roni mengingatkan saya bahwa memberikan umpan balik individual secara cepat kepada jumlah siswa yang banyak di lapangan terbuka memerlukan strategi pengelolaan yang sangat cermat.',
    concept: 'Konsep mendasar yang dipelajari adalah kerangka Understanding by Design (UbD) dengan alur backward design yang menyelaraskan tujuan, bukti asesmen, dan kegiatan belajar. Konsep ini dipadukan dengan tiga prinsip pembelajaran mendalam (berkesadaran, bermakna, menggembirakan) melalui empat tahap kegiatan bermakna: eksplorasi, investigasi, kolaborasi, dan refleksi. Selain itu, dipelajari pula sistem asesmen utuh yang mencakup asesmen diagnostik, formatif, sumatif, dan autentik berbasis rubrik tiga ranah serta siklus evaluasi berkelanjutan untuk tindakan remedial maupun pengayaan.',
    change: 'Langkah perbaikan yang akan saya jalankan adalah selalu merumuskan Big Idea dan pertanyaan esensial di awal unit materi untuk memandu pemahaman taktis siswa. Saya akan melengkapi setiap sesi mengajar dengan asesmen diagnostik singkat, memanfaatkan stasiun belajar dan tutor sebaya, serta menjadwalkan 3-5 menit di akhir pertemuan untuk refleksi menggunakan exit ticket. Penilaian akan dilengkapi dengan rubrik sikap, jurnal, dan penilaian antarteman, lalu hasilnya dimanfaatkan secara langsung sebagai dasar perbaikan proses pembelajaran berikutnya.',
    analisisArtefak: 'Artefak yang dipilih terdiri dari analisis kasus bola voli kelas IX, Lembar Aktivitas UbD (LK 1.4), tugas restruturisasi kasus kasti Pak Arif, analisis kasus Pak Roni, Laporan UTS dribbling sepak bola, dan Modul Ajar UAS bola basket berbasis UbD. Seluruh artefak ini dipilih karena merekam secara bertahap transformasi cara berpikir saya dari pendekatan tradisional menuju kerangka UbD. Tabel perbandingan tujuan pembelajaran, instrumen rubrik tiga ranah, serta skenario station learning dalam artefak menjadi bukti nyata keberhasilan penyelarasan antara tujuan, asesmen, dan aktivitas belajar.'
  },
  'pola-pikir-bertumbuh': {
    id: 'pola-pikir-bertumbuh',
    title: 'Pola Pikir Bertumbuh (Growth Mindset)',
    pdfUrl: '/LK2_Pola_Pikir_Bertumbuh.pdf',
    connection: 'Mata kuliah ini memperluas pemahaman saya bahwa pola pikir bertumbuh harus dibangun oleh pendidik terlebih dahulu sebelum ditanamkan kepada peserta didik. Dalam konteks PJOK, siswa SMP sering kali merasa cemas atau takut gagal saat mencoba gerakan olahraga baru yang berisiko, seperti jatuh saat senam lantai atau kalah dalam permainan. Melalui pemahaman tentang neuroplastisitas (analogi otak seperti plastisin dan jalan tol) serta filosofi Ki Hajar Dewantara, saya menyadari bahwa keyakinan siswa seperti "saya sudah dari sananya tidak bisa" dapat dibimbing bergeser melalui cara guru memberikan umpan balik dan intervensi yang tepat.',
    challenge: 'Tantangan nyata yang saya temui adalah mengikis pola pikir tetap yang sudah mengakar kuat pada siswa akibat kebiasaan lingkungan dan sistem pendidikan yang terlalu menekankan hasil akhir dan angka hafalan. Saya juga menghadapi kesulitan teknis dalam merancang bentuk scaffolding yang adaptif bagi siswa dengan keterbatasan fisik atau obesitas. Selain itu, membiasakan diri memberikan umpan balik spesifik pada proses dan strategi, alih-alih sekadar memberikan pujian umum seperti "good job", membutuhkan konsistensi dan latihan berkelanjutan dari guru.',
    concept: 'Konsep utama yang dipelajari adalah perbedaan Fixed dan Growth Mindset di lima area (tantangan, hambatan, usaha, kritik, keberhasilan orang lain) yang didukung oleh bukti ilmiah neuroplastisitas otak dan prinsip "The Power of Yet". Saya juga mendalami pemikiran berbasis peluang (Opportunity-Based Thinking), pemetaan pola pikir melalui Mindset Assessment Profile (MAP) dalam empat kategori, serta kerangka intervensi empat langkah. Kerangka tersebut menggabungkan cognitive framing, penyediaan scaffolding bertahap, reframing bahasa dengan kata "belum", serta asesmen formatif berbasis proses.',
    change: 'Perubahan yang ingin saya lakukan dimulai dengan memandang setiap kegagalan belajar siswa sebagai data untuk memperbaiki strategi mengajar saya. Pada pembelajaran PJOK seperti senam lantai, saya akan mengawali kelas dengan cognitive framing dan video inspiratif, menyediakan alat bantu keamanan seperti matras ekstra tebal dan papan miring, serta memberikan minimal lima kesempatan mencoba tanpa penilaian langsung. Saya juga akan mengidentifikasi kemajuan siswa melalui "Growth Goal Card", menghadirkan "Wall of Awesome Fails", dan membangun suasana kelas yang mengapresiasi setiap proses belajar.',
    analisisArtefak: 'Artefak yang dipilih meliputi Lembar Kerja Refleksi Diri (LK 1.1), Analisis Data PISA (LK 1.3), tugas neuroplastisitas dan OBT (LK 2.1-2.3), analisis kasus Bagas dan MAP (LK 3.1), lembar intervensi reframing bahasa (LK 3.2 & 3.3), analisis peran guru (LK 4.1), serta Desain Pembelajaran Senam Lantai (LK 4.3). Rangkaian artefak ini dipilih karena membuktikan pemahaman konseptual ilmiah hingga penerapannya dalam modul PJOK. Tabel reframing kata, jurnal mingguan, dan lembar refleksi pada LK 4.3 menjadi bukti sahih komitmen pembaruan pembelajaran yang saya rancang.'
  }
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const data = courseId ? detailsData[courseId] : null;

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mata Kuliah Tidak Ditemukan</h2>
        <Link to="/refleksi" className="text-slate-600 hover:text-slate-900 font-medium text-sm">
          ← Kembali ke Daftar Refleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Navigasi Kembali */}
      <Link 
        to="/refleksi" 
        className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium text-sm mb-6 transition-colors"
      >
        ← Kembali ke Daftar Refleksi
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
        {/* Judul Mata Kuliah */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 border-b border-gray-100 pb-4">
          {data.title}
        </h1>

        {/* BAGIAN 1: REFLEKSI MODEL 4C */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-6 bg-slate-800 rounded-full"></span>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
              Bagian 1: Refleksi Model 4C
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-2">1. Connection (Keterkaitan)</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{data.connection}</p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-2">2. Challenge (Tantangan)</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{data.challenge}</p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-2">3. Concept (Konsep Utama)</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{data.concept}</p>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-2">4. Change (Perubahan)</h3>
              <p className="text-gray-700 leading-relaxed text-justify">{data.change}</p>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: ANALISIS ARTEFAK PEMBELAJARAN */}
        <div className="pt-6 border-t border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-6 bg-emerald-700 rounded-full"></span>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
              Bagian 2: Analisis Artefak Pembelajaran
            </h2>
          </div>

          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
            <p className="text-gray-700 leading-relaxed text-justify">{data.analisisArtefak}</p>
          </div>
        </div>

        {/* DOKUMEN PDF LAMA */}
        {data.pdfUrl && (
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-6 bg-blue-700 rounded-full"></span>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Dokumen Refleksi (PDF)
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50/40 p-4 rounded-xl border border-blue-100 gap-4">
              <span className="text-sm font-medium text-slate-800">📄 File Dokumen Lembar Kerja 2 (LK 2)</span>
              
              <Link
                to={`/refleksi/${data.id}/dokumen`}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Lihat PDF Selengkapnya →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
