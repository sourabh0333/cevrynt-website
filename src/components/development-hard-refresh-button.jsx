"use client";

async function hardRefresh() {
  if ("caches" in window) {
    const keys = await window.caches.keys();
    await Promise.all(keys.map((key) => window.caches.delete(key)));
  }

  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }

  window.location.reload();
}

export function DevelopmentHardRefreshButton() {
  return (
    <button
      type="button"
      className="dev-hard-refresh-button"
      onClick={() => {
        hardRefresh().catch(() => window.location.reload());
      }}
      aria-label="Hard refresh (dev only)"
    >
      Hard refresh
    </button>
  );
}
