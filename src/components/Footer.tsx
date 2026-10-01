import { Link } from 'react-router-dom';

const footerNav = [
  { label: 'Beranda', path: '/' },
  { label: 'Tentang', path: '/tentang' },
  { label: 'Refleksi', path: '/refleksi' },
  { label: 'Dokumentasi', path: '/dokumentasi' },
];

export default function Footer() {
  return (
    <footer className="bg-ppg-dark text-white/80 mt-24">
      <div className="max-w-editorial mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-serif text-lg text-white font-semibold">
              Gomos Andreas Sianturi
            </p>
            <p className="font-serif text-sm text-white/60 mt-1">
              PPG Prajabatan · PJOK · Semester 1 · 2026
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {footerNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-serif text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15">
          <p className="font-serif text-sm text-white/50">
            © 2026 Gomos Andreas Sianturi
          </p>
        </div>
      </div>
    </footer>
  );
}
