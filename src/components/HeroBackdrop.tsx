export default function HeroBackdrop({
  src = "/storm-hero.png",
}: {
  src?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-[position:70%_20%] sm:bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* Readability overlay: dark gradient */}
      <div className="hero-backdrop-overlay absolute inset-0" />

      {/* Vignette to keep edges calm */}
      <div className="hero-backdrop-vignette absolute inset-0" />

      {/* Subtle highlight bloom near lightning area */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_10%,rgba(190,220,255,0.15),transparent_60%)]" />
    </div>
  );
}
