export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden sanctuary-bg">
      {/* Floating gradient orbs */}
      <div
        className="absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-50 float-slow"
        style={{ background: "radial-gradient(circle at center, oklch(0.55 0.24 290 / 0.55), transparent 60%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 float-slow"
        style={{ background: "radial-gradient(circle at center, oklch(0.65 0.18 200 / 0.5), transparent 60%)", animationDelay: "-5s" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-40 float-slow"
        style={{ background: "radial-gradient(circle at center, oklch(0.70 0.14 305 / 0.5), transparent 60%)", animationDelay: "-9s" }}
      />
      {/* Subtle particle dots */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="20" r="0.6" fill="white" />
            <circle cx="60" cy="80" r="0.4" fill="white" />
            <circle cx="100" cy="40" r="0.5" fill="white" />
            <circle cx="30" cy="100" r="0.35" fill="white" />
            <circle cx="80" cy="10" r="0.45" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
      {/* Faint noise via gradient overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "3px 3px" }} />
    </div>
  );
}
