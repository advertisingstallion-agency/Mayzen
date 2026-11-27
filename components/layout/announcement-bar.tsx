import { announcements } from "@/config/site";

function Group() {
  // Repeat the messages so one group is wider than the screen.
  const items = [...announcements, ...announcements];
  return (
    <div className="flex min-w-[100vw] shrink-0 items-center justify-around">
      {items.map((text, i) => (
        <span key={i} className="flex items-center">
          <span className="px-14">{text}</span>
          <span className="h-3 w-px bg-wine-700/25" />
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="h-10 overflow-hidden border-b border-line bg-white text-[11px] font-medium uppercase tracking-[0.14em] text-wine-700">
      <p className="sr-only">{announcements.join(". ")}.</p>
      <div aria-hidden="true" className="flex h-full w-max animate-marquee items-center whitespace-nowrap">
        <Group />
        <Group />
      </div>
    </div>
  );
}
