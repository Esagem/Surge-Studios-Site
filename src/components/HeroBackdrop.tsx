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
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.58)_38%,rgba(0,0,0,0.82)_100%)]" />

      {/* Vignette to keep edges calm */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.85)]" />

      {/* Subtle highlight bloom near lightning area */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_10%,rgba(190,220,255,0.15),transparent_60%)]" />
    </div>
  );
}
