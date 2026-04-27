import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/navigation";
import { Separator } from "@/components/ui/Separator";
import { layout } from "@/content";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  "https://wa.me/message/PWFG7DRODCD6I1";

const atuacaoLinks = navigation.filter((n) =>
  ["/areas-de-atuacao", "/provas-digitais", "/equipe"].includes(n.href),
);
const conteudoLinks = navigation.filter((n) =>
  ["/artigos", "/publicacoes"].includes(n.href),
);

const { brand, footer } = layout;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Image
              src={brand.logoFooter.src}
              alt={brand.logoFooter.alt}
              width={200}
              height={60}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {footer.tagline}
            </p>
            <p className="text-white/50 text-xs mt-3 font-sans">
              {footer.oabLine}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {footer.social.map(({ href, label, path }) => {
                const finalHref = href === "__WHATSAPP__" ? WHATSAPP_URL : href;
                return (
                  <a
                    key={label}
                    href={finalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/50 hover:text-gold transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-[18px] h-[18px]"
                      aria-hidden="true"
                    >
                      <path d={path} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              {footer.columns.institucionalLabel}
            </p>
            <ul className="space-y-2">
              {navigation
                .filter((n) => ["/", "/sobre", "/contato"].includes(n.href))
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              {footer.columns.atuacaoLabel}
            </p>
            <ul className="space-y-2">
              {atuacaoLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 text-sm hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-widest text-white/50 mb-4">
              {footer.columns.contatoLabel}
            </p>
            <ul className="space-y-3">
              {conteudoLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 text-sm hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-white/70 text-sm hover:text-gold transition-colors"
                >
                  {footer.contatoExtras.faqLabel}
                </Link>
              </li>
              <li>
                <Link
                  href="/imprensa"
                  className="text-white/70 text-sm hover:text-gold transition-colors"
                >
                  {footer.contatoExtras.imprensaLabel}
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="text-white/70 text-sm hover:text-gold transition-colors"
                >
                  {footer.contatoExtras.eventosLabel}
                </Link>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm hover:text-gold transition-colors"
                >
                  {footer.contatoExtras.whatsappLabel}
                </a>
              </li>
            </ul>
            <p className="text-white/40 text-xs mt-6">
              {footer.citiesLine}
            </p>
          </div>
        </div>

        <Separator light />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-white/40 text-xs">
          <p>{footer.copyright.replace("{year}", String(year))}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/politica-de-privacidade"
              className="hover:text-white/70 transition-colors"
            >
              {footer.legal.privacyLabel}
            </Link>
            <Link
              href="/politica-de-cookies"
              className="hover:text-white/70 transition-colors"
            >
              {footer.legal.cookiesLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
