interface PhotoCreditProps {
  credit?: string | null;
  url?: string | null;
  className?: string;
}

/** Attribution line for a licensed photo (e.g. CC BY-SA via Wikimedia Commons).
 *  Renders nothing when no credit is set, so pages with our own photos are unchanged. */
export default function PhotoCredit({ credit, url, className = "" }: PhotoCreditProps) {
  if (!credit) return null;
  return (
    <p className={`text-[10px] sm:text-[11px] leading-tight text-white/70 drop-shadow ${className}`}>
      Photo:{" "}
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-white">
          {credit}
        </a>
      ) : (
        credit
      )}
    </p>
  );
}
