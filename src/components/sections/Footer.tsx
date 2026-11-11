import type { AssetMap } from "@/lib/assets";
import { nav, site } from "@/lib/site";
import Pic from "@/components/ui/Pic";
import { Wordmark } from "./Nav";

export default function Footer({ a }: { a: AssetMap }) {
  return (
    <footer className="bg-paper">
      {/* Hanuman in namaskar, rising from behind the footer line */}
      {!a.hanumanRising.placeholder && (
        <div className="mx-auto -mb-px w-[min(78vw,460px)] pt-16 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
          <Pic asset={a.hanumanRising} sizes="460px" />
        </div>
      )}
      <div className="container-x border-t border-line py-20 text-center">
        <p className="font-script text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-saffron">Jai Hanuman.</p>
        <p className="mt-4 text-sm text-muted">See you at dawn. Until then, follow the shale on Instagram.</p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-block rounded-full bg-paper px-7 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(43,34,29,0.45)] transition-colors hover:text-saffron"
        >
          Instagram
        </a>

        <div className="mt-16 flex flex-col items-center gap-6">
          <Wordmark />
          <p className="font-kn text-sm text-muted">{site.kannadaName}</p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-[0.8rem] font-semibold text-maroon hover:text-saffron">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="bg-sand py-4 text-center text-[0.72rem] text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
