const RADII = [27, 39, 51, 63, 75, 86, 96];
const SEEDS = [2, 11, 23];

export default function MemberCircles({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="landing-member-circles pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible text-theme"
    >
      <defs>
        {SEEDS.map((seed) => (
          <filter
            key={seed}
            id={`${id}-scribble-${seed}`}
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>

      {RADII.map((radius, index) => (
        <g
          key={radius}
          className={`landing-member-circles-ring landing-member-circles-ring-${index}`}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            filter={`url(#${id}-scribble-${SEEDS[index % SEEDS.length]})`}
          />
        </g>
      ))}
    </svg>
  );
}
