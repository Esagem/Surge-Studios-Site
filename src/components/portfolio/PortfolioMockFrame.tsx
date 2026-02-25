import type { CSSProperties } from "react";
import type { PortfolioMediaItem, PortfolioPalette } from "@/content/portfolio";

type Props = {
  item: PortfolioMediaItem;
  palette: PortfolioPalette;
  className?: string;
  compact?: boolean;
};

type StyleBlockProps = {
  palette: PortfolioPalette;
  compact: boolean;
};

function Panel({
  className,
  background,
  borderColor,
}: {
  className?: string;
  background?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={`rounded-xl border ${className ?? ""}`}
      style={{
        background: background ?? "rgba(255,255,255,0.03)",
        borderColor: borderColor ?? "rgba(255,255,255,0.06)",
      }}
    />
  );
}

function DashboardMock({ palette, compact }: StyleBlockProps) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Panel className="h-10" background="rgba(255,255,255,0.03)" />
        <Panel className="h-10 w-24" background={palette.panel} borderColor={palette.ring} />
      </div>
      <div className={`grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-[1.25fr_1fr]"}`}>
        <div className="grid grid-rows-[auto_1fr] gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Panel className="h-16" background="rgba(255,255,255,0.035)" />
            <Panel className="h-16" background={palette.panel} borderColor={palette.ring} />
          </div>
          <Panel className="relative min-h-[6rem] overflow-hidden">
            <div className="absolute inset-x-4 bottom-4 top-4">
              <div className="absolute inset-0 opacity-60">
                {[14, 38, 56, 74].map((left) => (
                  <div
                    key={left}
                    className="absolute bottom-0 w-3 rounded-sm"
                    style={{
                      left: `${left}%`,
                      height: `${26 + (left % 30)}%`,
                      background: `linear-gradient(to top, ${palette.accentSoft}, ${palette.accent})`,
                      boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 18px ${palette.glow}`,
                    }}
                  />
                ))}
              </div>
              <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                  d="M0,30 C12,24 18,25 28,20 C38,14 44,15 52,19 C63,24 70,10 80,12 C88,13 94,8 100,10"
                  fill="none"
                  stroke={palette.accent}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Panel>
        </div>
        <div className="grid gap-3">
          <Panel className="h-24" background="rgba(255,255,255,0.03)" />
          <Panel className="flex-1" background="rgba(255,255,255,0.025)" />
        </div>
      </div>
    </div>
  );
}

function MarketingMock({ palette }: StyleBlockProps) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="h-2 w-20 rounded-full bg-white/10" />
      </div>
      <div className="grid gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div
            className="absolute inset-0 opacity-85"
            style={{
              background: `radial-gradient(65% 90% at 18% 10%, ${palette.glow}, transparent 72%),
                radial-gradient(45% 55% at 84% 25%, ${palette.glow}, transparent 70%)`,
            }}
          />
          <div className="relative grid gap-3">
            <div className="h-3 w-20 rounded-full" style={{ background: palette.accent, boxShadow: `0 0 14px ${palette.glow}` }} />
            <div className="h-6 w-2/3 rounded-lg bg-white/12" />
            <div className="h-3 w-4/5 rounded-full bg-white/10" />
            <div className="h-3 w-3/5 rounded-full bg-white/8" />
            <div className="mt-2 flex gap-2">
              <div className="h-8 w-24 rounded-lg border" style={{ borderColor: palette.ring, background: palette.panel }} />
              <div className="h-8 w-20 rounded-lg border border-white/10 bg-white/5" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Panel
              key={i}
              className="h-20"
              background={i === 1 ? palette.panel : "rgba(255,255,255,0.03)"}
              borderColor={i === 1 ? palette.ring : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMock({ palette }: StyleBlockProps) {
  return (
    <div className="grid h-full place-items-center">
      <div className="relative h-full max-h-[18rem] w-[9.5rem] rounded-[1.5rem] border border-white/15 bg-[rgba(9,11,16,0.95)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="absolute left-1/2 top-1 -translate-x-1/2 rounded-b-xl bg-white/10 px-4 py-0.5 text-[10px] text-white/40">
          app
        </div>
        <div className="mt-4 grid h-[calc(100%-1rem)] grid-rows-[auto_auto_1fr_auto] gap-2 rounded-[1rem] border p-2" style={{ borderColor: palette.ring, background: "rgba(255,255,255,0.02)" }}>
          <div className="h-2.5 w-14 rounded-full" style={{ background: palette.accent }} />
          <div className="h-7 rounded-lg border border-white/10 bg-white/5" />
          <div className="grid gap-2">
            <div className="h-12 rounded-lg border" style={{ borderColor: palette.ring, background: palette.panel }} />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg border border-white/10 bg-white/5" />
              <div className="h-10 rounded-lg border border-white/10 bg-white/5" />
            </div>
            <div className="h-10 rounded-lg border border-white/10 bg-white/4" />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded-md border"
                style={{
                  borderColor: i === 1 ? palette.ring : "rgba(255,255,255,0.08)",
                  background: i === 1 ? palette.panel : "rgba(255,255,255,0.03)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsMock({ palette }: StyleBlockProps) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Panel className="h-11" background={palette.panel} borderColor={palette.ring} />
        <Panel className="h-11 w-28" />
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <Panel className="relative min-h-[10rem] overflow-hidden p-0">
          <div className="absolute inset-0 opacity-75" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)" }} />
          <div className="absolute inset-4 grid grid-cols-6 items-end gap-2">
            {[38, 55, 42, 76, 62, 88].map((h, i) => (
              <div key={i} className="relative h-full">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, ${palette.accentSoft}, ${palette.accent})`,
                    boxShadow: `0 0 12px ${palette.glow}`,
                  }}
                />
              </div>
            ))}
          </div>
        </Panel>
        <div className="grid gap-3">
          {[0, 1, 2].map((i) => (
            <Panel
              key={i}
              className="h-[4.15rem]"
              background={i === 0 ? palette.panel : "rgba(255,255,255,0.03)"}
              borderColor={i === 0 ? palette.ring : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorMock({ palette }: StyleBlockProps) {
  return (
    <div className="grid h-full grid-cols-[auto_1fr] gap-3">
      <div className="grid w-20 grid-rows-[auto_1fr_auto] gap-3 rounded-xl border border-white/10 bg-white/4 p-2">
        <div className="h-8 rounded-lg border" style={{ borderColor: palette.ring, background: palette.panel }} />
        <div className="grid gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 rounded-md bg-white/8" />
          ))}
        </div>
        <div className="h-6 rounded-md bg-white/8" />
      </div>
      <div className="grid grid-rows-[auto_1fr_auto] gap-3">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <Panel className="h-10" />
          <Panel className="h-10 w-24" background={palette.panel} borderColor={palette.ring} />
        </div>
        <Panel className="relative min-h-[9rem] overflow-hidden p-0">
          <div className="absolute inset-0 p-4">
            <div className="mb-3 h-3 w-1/3 rounded-full bg-white/12" />
            <div className="grid gap-2">
              {["72%", "86%", "61%", "79%", "68%"].map((w) => (
                <div key={w} className="h-2.5 rounded-full bg-white/8" style={{ width: w }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Panel className="h-16" background={palette.panel} borderColor={palette.ring} />
              <Panel className="h-16" />
            </div>
          </div>
        </Panel>
        <div className="grid grid-cols-3 gap-3">
          <Panel className="h-12" />
          <Panel className="h-12" background={palette.panel} borderColor={palette.ring} />
          <Panel className="h-12" />
        </div>
      </div>
    </div>
  );
}

function renderStyle(item: PortfolioMediaItem, palette: PortfolioPalette, compact: boolean) {
  switch (item.placeholderStyle) {
    case "marketing":
      return <MarketingMock palette={palette} compact={compact} />;
    case "mobile":
      return <MobileMock palette={palette} compact={compact} />;
    case "analytics":
      return <AnalyticsMock palette={palette} compact={compact} />;
    case "editor":
      return <EditorMock palette={palette} compact={compact} />;
    case "dashboard":
    default:
      return <DashboardMock palette={palette} compact={compact} />;
  }
}

export default function PortfolioMockFrame({ item, palette, className = "", compact = false }: Props) {
  const outerStyle: CSSProperties = {
    borderColor: palette.ring,
    background: `linear-gradient(165deg, rgba(255,255,255,0.035) 0%, ${palette.panel} 38%, rgba(10, 12, 16, 0.88) 100%)`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.28), 0 0 0 1px ${palette.ring}`,
  };

  return (
    <div className={`relative overflow-hidden rounded-[1.35rem] border p-3 ${className}`} style={outerStyle}>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(70% 80% at 12% 8%, ${palette.glow}, transparent 70%),
            radial-gradient(40% 45% at 88% 84%, ${palette.glow}, transparent 78%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: compact ? "18px 18px" : "22px 22px",
        }}
      />
      <div className="relative grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/35" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
          </div>
          <div className="truncate text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
            {item.title}
          </div>
        </div>
        <div className={`${compact ? "min-h-[9rem]" : "min-h-[14rem] sm:min-h-[18rem]"} rounded-xl border border-white/10 bg-[rgba(8,10,14,0.8)] p-3`}>
          {renderStyle(item, palette, compact)}
        </div>
      </div>
    </div>
  );
}
