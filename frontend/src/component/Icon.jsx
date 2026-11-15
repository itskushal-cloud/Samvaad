// Small inline SVG icon set (no extra dependency needed)
function Icon({ name }) {
  const paths = {
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
    ear: <path d="M8 10a4 4 0 1 1 8 0c0 2-2 3-2 5a3 3 0 0 1-5 2M12 10a1.5 1.5 0 0 1 1.5 1.5" />,
    chat: <path d="M4 5h16v11H9l-5 4V5z" />,
    people: <><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.2" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5M15.5 14.3c3 0 5.5 1.6 5.5 4.2" /></>,
    leaf: <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c2-5 5-8 9-10" />,
    home: <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" />,

    /* Call room */
    video: <><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M22 8l-6 4 6 4V8z" /></>,
    videoOff: <path d="M3 3l18 18M10.5 6H14a2 2 0 0 1 2 2v2.5l6-3.5v10l-3.5-2M2 8v8a2 2 0 0 0 2 2h10" />,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" /></>,
    micOff: <><path d="M3 3l18 18M9 9v2a3 3 0 0 0 5.12 2.12M15 9.34V6a3 3 0 0 0-5.68-1.33" /><path d="M5 10a7 7 0 0 0 11.95 4.95M12 17v4M8 21h8" /></>,
    phoneOff: <><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" /><line x1="22" y1="2" x2="2" y2="22" /></>,

    /* Theme toggle */
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,

    /* App area, subscriptions and profile */
    shield: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></>,
    check: <path d="M5 12l5 5L19 7" />,
  }

  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export default Icon