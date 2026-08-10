"use client";

import { useEffect } from "react";

export function DevelopmentCacheReset() {
  useEffect(() => {
    const clearDevelopmentCaches = async () => {
      if ("caches" in window) {
        const keys = await window.caches.keys();
        await Promise.all(keys.map((key) => window.caches.delete(key)));
      }

      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }
    };

    clearDevelopmentCaches().catch(() => {});
  }, []);

  return null;
}
