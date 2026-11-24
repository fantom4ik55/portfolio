export default function Bg() {
  return ( 
    <div className="bg-lines" aria-hidden="true"> 
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none">
        <defs>
          <linearGradient id="bg-line-g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff006e" stopOpacity="0"/>
            <stop offset="0.4" stopColor="#ff006e" stopOpacity="0.45"/>
            <stop offset="0.7" stopColor="#8338ec" stopOpacity="0.45"/>
            <stop offset="1" stopColor="#8338ec" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="bg-line-g2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3a86ff" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#3a86ff" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#8338ec" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="bg-line-g3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#06ffa5" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#06ffa5" stopOpacity="0.35"/>
            <stop offset="1" stopColor="#ff006e" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="bg-line-g4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8338ec" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#8338ec" stopOpacity="0.4"/>
            <stop offset="1" stopColor="#3a86ff" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="bg-line-g5" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffbe0b" stopOpacity="0"/>
            <stop offset="0.5" stopColor="#ffbe0b" stopOpacity="0.3"/>
            <stop offset="1" stopColor="#ff006e" stopOpacity="0"/>
          </linearGradient>
        </defs>

        <path d="M -100 200 C 200 100 400 400 800 400 S 1300 100 1700 400" stroke="url(#bg-line-g1)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
        <path d="M -100 500 C 300 400 600 700 1000 500 S 1400 700 1700 500" stroke="url(#bg-line-g2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
        <path d="M -100 800 C 250 700 500 900 900 800 S 1400 500 1700 700" stroke="url(#bg-line-g3)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
        <path d="M 300 -100 C 400 250 200 500 400 800 S 600 1100 400 1100" stroke="url(#bg-line-g4)" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/>
        <path d="M 1100 -100 C 1000 250 1200 500 1000 800 S 800 1100 1000 1100" stroke="url(#bg-line-g5)" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/>
      </svg>
    </div>
  );
} ;