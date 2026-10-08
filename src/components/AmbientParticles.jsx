import "./AmbientParticles.css";

const particles = [
  { x: 6, y: 14, size: 2.8, tone: "violet", duration: 33, delay: -8, driftX: "52px", driftY: "-16px" },
  { x: 14, y: 38, size: 1.5, tone: "blue", duration: 37, delay: -3, driftX: "-11px", driftY: "13px" },
  { x: 19, y: 77, size: 1.8, tone: "cyan", duration: 34, delay: -14, driftX: "14px", driftY: "11px" },
  { x: 27, y: 24, size: 1.5, tone: "violet", duration: 39, delay: -6, driftX: "-13px", driftY: "-12px" },
  { x: 34, y: 61, size: 2, tone: "blue", duration: 31, delay: -11, driftX: "10px", driftY: "17px" },
  { x: 41, y: 12, size: 1.5, tone: "cyan", duration: 36, delay: -17, driftX: "-15px", driftY: "10px" },
  { x: 48, y: 86, size: 1.8, tone: "violet", duration: 38, delay: -4, driftX: "13px", driftY: "-14px" },
  { x: 56, y: 31, size: 1.5, tone: "blue", duration: 32, delay: -13, driftX: "-10px", driftY: "15px" },
  { x: 63, y: 68, size: 2, tone: "cyan", duration: 40, delay: -9, driftX: "16px", driftY: "-11px" },
  { x: 71, y: 17, size: 1.5, tone: "violet", duration: 35, delay: -19, driftX: "-12px", driftY: "12px" },
  { x: 77, y: 49, size: 1.8, tone: "blue", duration: 37, delay: -2, driftX: "11px", driftY: "-16px" },
  { x: 84, y: 82, size: 1.5, tone: "cyan", duration: 33, delay: -15, driftX: "-16px", driftY: "10px" },
  { x: 91, y: 28, size: 2, tone: "violet", duration: 39, delay: -7, driftX: "13px", driftY: "14px" },
  { x: 96, y: 62, size: 1.5, tone: "blue", duration: 36, delay: -12, driftX: "-11px", driftY: "-13px" },
  { x: 11, y: 91, size: 1.8, tone: "cyan", duration: 38, delay: -5, driftX: "15px", driftY: "-12px" },
  { x: 37, y: 43, size: 1.5, tone: "violet", duration: 34, delay: -16, driftX: "-13px", driftY: "16px" },
  { x: 68, y: 94, size: 1.8, tone: "blue", duration: 40, delay: -10, driftX: "10px", driftY: "-15px" },
  { x: 88, y: 7, size: 1.5, tone: "cyan", duration: 35, delay: -1, driftX: "-14px", driftY: "11px" },
  { x: 51, y: 55, size: 1.8, tone: "violet", duration: 36, delay: -18, driftX: "15px", driftY: "12px" },
  { x: 25, y: 52, size: 1.5, tone: "blue", duration: 32, delay: -20, driftX: "-12px", driftY: "-14px" },
];

const connections = [
  [0, 3, "blue"],
  [3, 5, "violet"],
  [3, 15, "cyan"],
  [15, 1, "blue"],
  [15, 19, "violet"],
  [19, 4, "cyan"],
  [4, 2, "blue"],
  [2, 14, "violet"],
  [4, 18, "cyan"],
  [18, 7, "blue"],
  [18, 8, "violet"],
  [8, 10, "cyan"],
  [10, 12, "blue"],
  [12, 9, "violet"],
  [12, 17, "cyan"],
  [10, 13, "violet"],
  [13, 11, "blue"],
  [11, 16, "cyan"],
  [7, 9, "violet"],
];

function amplifyDrift(distance) {
  const value = Number.parseFloat(distance);
  const scaled = Math.sign(value) * Math.min(Math.abs(value) * 2, 40);
  return `${scaled}px`;
}

function particleVariation(index, seed) {
  const value = Math.sin((index + 1) * seed) * 43758.5453;
  return value - Math.floor(value);
}

export default function AmbientParticles() {
  return (
    <div className="ambient-particles" aria-hidden="true">
      <svg className="ambient-network" preserveAspectRatio="none" viewBox="0 0 100 100">
        {connections.map(([from, to, tone], index) => {
          const start = particles[from];
          const end = particles[to];

          return (
            <line
              className={`ambient-connection ambient-connection-${tone}`}
              key={`${from}-${to}`}
              style={{ animationDelay: `${index * -0.7}s` }}
              vectorEffect="non-scaling-stroke"
              x1={start.x}
              x2={end.x}
              y1={start.y}
              y2={end.y}
            />
          );
        })}
      </svg>
      {particles.map((particle, index) => (
        <span
          className={`ambient-particle ambient-particle-${particle.tone}`}
          key={`${particle.x}-${particle.y}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size + 1}px`,
            height: `${particle.size + 1}px`,
            "--particle-drift-duration": `${Math.min(particle.duration * 0.5, 20)}s`,
            "--particle-drift-delay": `${particle.delay}s`,
            "--particle-drift-x": amplifyDrift(particle.driftX),
            "--particle-drift-y": amplifyDrift(particle.driftY),
            "--particle-sparkle-duration": `${3 + particleVariation(index, 12.9898) * 4}s`,
            "--particle-sparkle-delay": `${-particleVariation(index, 78.233) * 6}s`,
          }}
        />
      ))}
    </div>
  );
}
