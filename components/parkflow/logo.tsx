export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full" role="img">
        <title>ParkFlow</title>
        <defs>
          <linearGradient id="pf-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f9bff" />
            <stop offset="1" stopColor="#2f6bd6" />
          </linearGradient>
        </defs>
        {/* rounded badge */}
        <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#pf-grad)" />
        {/* location pin drop */}
        <path
          d="M20 8.5c-4.7 0-8.5 3.7-8.5 8.3 0 5.7 7.2 13.4 8 14.2.3.3.7.3 1 0 .8-.8 8-8.5 8-14.2 0-4.6-3.8-8.3-8.5-8.3Z"
          fill="#ffffff"
        />
        {/* flowing road / motion lines inside the pin */}
        <path
          d="M16.6 20.5c1.1-1.7 3.2-2.7 5.2-2.2M17.4 16.2c1.8-1.6 4.6-1.8 6.6-.4"
          stroke="#2f6bd6"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        {/* available-spot dot */}
        <circle cx="20" cy="17" r="2.2" fill="#22c07f" />
      </svg>
    </span>
  )
}
