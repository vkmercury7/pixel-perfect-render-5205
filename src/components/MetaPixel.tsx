import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

const PIXEL_ID = "2193578378235425";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export function MetaPixel() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.fbq) {
      /* eslint-disable */
      (function (f: any, b: any, e: string, v: string) {
        let n: any, t: any, s: any;
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq("init", PIXEL_ID);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.fbq("track", "PageView");
  }, [pathname]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
