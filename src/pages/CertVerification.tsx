import React from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink, ShieldCheck, Award } from "lucide-react";

const TOKEN_TRACK_NAMES: Record<number, string> = {
  1: "Foundation",
  2: "HTML",
  3: "CSS",
  4: "JavaScript",
  5: "JS Advanced",
  6: "Git & GitHub",
  7: "React",
  8: "Next.js",
};

export default function CertVerification() {
  const { tokenId: tokenIdParam } = useParams<{ tokenId: string }>();
  const tokenId = Number(tokenIdParam);
  const trackName = TOKEN_TRACK_NAMES[tokenId];

  if (!tokenIdParam || isNaN(tokenId) || !trackName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-lg font-serif text-foreground mb-2">Invalid Certificate</p>
          <p className="text-sm font-sans text-muted-foreground mb-6">
            Token ID <span className="font-medium">{tokenIdParam}</span> does not correspond to any
            KOOMPI Academy track.
          </p>
          <Link to="/" className="text-sm font-sans text-primary hover:underline">
            ← Back to Academy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col items-center justify-center px-6 py-16">
      {/* Outer card */}
      <div className="w-full max-w-lg bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="px-10 py-10">
          {/* Logo + issuer */}
          <div className="flex items-center gap-3 mb-10">
            <img src="/koompi-black.png" alt="KOOMPI" className="h-7 object-contain" />
            <span className="text-xs font-sans font-medium text-muted-foreground uppercase tracking-widest">
              Academy
            </span>
          </div>

          {/* Certificate label */}
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-primary mb-2">
            Certificate of Completion
          </p>

          {/* Track heading */}
          <h1 className="text-4xl font-serif font-normal text-foreground tracking-tight leading-tight mb-1">
            {trackName}
          </h1>
          <p className="text-sm font-sans text-muted-foreground mb-8">
            KOOMPI Academy — Full Track
          </p>

          {/* On-chain badge */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/15 mb-8">
            <ShieldCheck size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-medium text-foreground mb-0.5">
                Verifiable on-chain
              </p>
              <p className="text-xs font-sans text-muted-foreground">
                This credential is an ERC-1155 NFT issued via the KOOMPI Identity (KID) protocol.
                Anyone can verify its authenticity using the KID Explorer.
              </p>
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl bg-[#faf9f7] border border-border px-4 py-3">
              <p className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground mb-1">
                Token ID
              </p>
              <p className="text-xl font-serif text-foreground">{tokenId}</p>
            </div>
            <div className="rounded-xl bg-[#faf9f7] border border-border px-4 py-3">
              <p className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground mb-1">
                Standard
              </p>
              <p className="text-xl font-serif text-foreground">ERC-1155</p>
            </div>
            <div className="col-span-2 rounded-xl bg-[#faf9f7] border border-border px-4 py-3">
              <p className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground mb-1">
                Issued by
              </p>
              <p className="text-sm font-sans text-foreground">
                KOOMPI Education · KID Protocol · koompi.org
              </p>
            </div>
            <div className="col-span-2 rounded-xl bg-[#faf9f7] border border-border px-4 py-3">
              <p className="text-[10px] font-sans uppercase tracking-wider text-muted-foreground mb-1">
                Issue date
              </p>
              <p className="text-sm font-sans text-muted-foreground">
                Certificate issued — exact date recorded on-chain at the time of minting.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href={`https://explorer.koompi.org/token/${tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-primary text-primary-foreground font-sans text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Award size={15} />
            Verify on KID Explorer
            <ExternalLink size={13} className="opacity-70" />
          </a>
        </div>

        {/* Bottom footer */}
        <div className="px-10 py-4 border-t border-border bg-[#faf9f7] flex items-center justify-between">
          <Link to="/" className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors">
            ← KOOMPI Academy
          </Link>
          <p className="text-xs font-sans text-muted-foreground">
            Token #{tokenId}
          </p>
        </div>
      </div>
    </div>
  );
}
