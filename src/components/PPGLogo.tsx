import { Link } from 'react-router-dom';

export default function PPGLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {/* Placeholder logo — replace src with official PPG logo asset */}
      <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
        <span className="font-serif text-white text-sm font-bold tracking-wider">PPG</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-serif text-white text-[15px] font-semibold tracking-wide">
          PPG Prajabatan
        </span>
        <span className="font-serif text-white/70 text-[11px] tracking-wider uppercase">
          E-Portofolio · PJOK
        </span>
      </div>
    </Link>
  );
}
