type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = true,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-orange-400">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-zinc-950"
        }`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-5 text-base leading-8 sm:text-lg ${
            light ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}