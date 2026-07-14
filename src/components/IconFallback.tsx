"use client";

import { useState, useEffect } from "react";

interface IconFallbackProps {
  name: string;
  domain: string;
  failed: boolean;
  onFail: (domain: string) => void;
  size?: number;
}

const SOURCES = [
  (d: string) => `https://icon.horse/icon/${d}`,
  (d: string) => `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_url=ICON&url=https://${d}&size=128`,
  (d: string) => `/logos/${d}.svg`
];

export default function IconFallback({ name, domain, failed, onFail, size = 40 }: IconFallbackProps) {
  const [stage, setStage] = useState(0);
  const [localFailed, setLocalFailed] = useState(false);

  useEffect(() => {
    setStage(0);
    setLocalFailed(false);
  }, [domain]);

  const emoji = name.charAt(0).toUpperCase();

  if (failed || localFailed || !domain) {
    return <span className="icon-fallback" style={{ width: size, height: size }}>{emoji}</span>;
  }

  const handleError = () => {
    if (stage < SOURCES.length - 1) {
      setStage((s) => s + 1);
    } else {
      setLocalFailed(true);
      onFail(domain);
    }
  };

  return (
    <img
      src={SOURCES[stage](domain)}
      width={size}
      height={size}
      alt={name}
      className="tool-icon rounded flex-shrink-0"
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
}
