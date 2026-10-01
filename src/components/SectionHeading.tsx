interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className="font-serif text-2xl md:text-3xl text-ink font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-serif text-ink-muted mt-3 max-w-prose mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
