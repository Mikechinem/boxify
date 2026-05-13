type SectionWrapperProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({
  id,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}