'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', sessionId);
    }

    // Track page view
    const trackPageView = async () => {
      try {
        // Get UTM parameters
        const urlParams = new URLSearchParams(window.location.search);
        const utm_source = urlParams.get('utm_source');
        const utm_medium = urlParams.get('utm_medium');
        const utm_campaign = urlParams.get('utm_campaign');

        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            path: pathname,
            title: document.title,
            referrer: document.referrer || 'Direct',
            utm_source,
            utm_medium,
            utm_campaign,
          }),
        });
      } catch (error) {
        console.error('Tracking error:', error);
      }
    };

    trackPageView();
  }, [pathname]);

  return null; // This component doesn't render anything
}
