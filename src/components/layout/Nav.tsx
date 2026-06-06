'use client'

/**
 * Nav.tsx
 * Barra de navegación superior. Estados visuales:
 *   - active (rutas)   → comparación con usePathname()
 *   - active (anchors) → IntersectionObserver "scroll spy" sobre #servicios,
 *                        #valor, #beneficios (solo cuando pathname === '/')
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, Mail, Instagram, MapPin } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import { CONFIG } from "@/data/config";

/** Icono inline de TikTok (Lucide no lo trae). */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1Z" />
    </svg>
  );
}

/** IDs de las secciones del homepage que deben tracker scroll spy. */
const HOMEPAGE_SECTION_IDS = ["servicios", "valor", "beneficios"] as const;

export default function Nav() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Sección actualmente visible en el viewport (solo aplica en homepage).
  // Empieza vacío → "Inicio" queda activo cuando estamos al top.
  const [activeSection, setActiveSection] = useState<string>("");

  // Drawer mobile: abierto/cerrado.
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar el drawer al cambiar de ruta (Next router preserva state, sino
  // se quedaba abierto después de navegar).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Bloquear scroll del body cuando el drawer mobile está abierto.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cerrar drawer con tecla Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Scroll spy con IntersectionObserver. Se activa solo en homepage.
  // rootMargin ajusta cuándo se considera una sección "activa":
  //   -30% top: la sección se vuelve activa cuando entra al 70% superior
  //   -60% bottom: y deja de ser activa cuando ya pasó el 40% inferior
  // Resultado: la sección activa es la que ocupa el centro del viewport.
  useEffect(() => {
    if (!isHomepage) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    // Observar cada sección del homepage; ignorar las que no existen aún.
    const observed: Element[] = [];
    for (const id of HOMEPAGE_SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    // Si al cargar ya estamos arriba del todo (scroll = 0), reset
    // para que "Inicio" quede activo en lugar de la primera sección.
    if (window.scrollY < 100) setActiveSection("");

    // También limpiar activeSection cuando scrollea de vuelta al top.
    const onScroll = () => {
      if (window.scrollY < 100) setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      for (const el of observed) observer.unobserve(el);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHomepage]);

  const whatsappUrl = getWhatsAppLink(
    CONFIG.contact.whatsapp.number,
    CONFIG.contact.whatsapp.message,
  );

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Inicio: si ya estamos en "/", scroll suave al top (mismo comportamiento
   * que clickear anchors); si estamos en otra ruta (/pricing, /detras-de-livic,
   * /catalogo), Next navega a "/" normalmente.
   */
  const handleInicioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection(""); // reset inmediato — UX más responsiva
    }
  };

  // ──────────────────────────────────────────────────────────
  //  Computar estado activo para cada link del nav
  // ──────────────────────────────────────────────────────────
  const isInicioActive = isHomepage && activeSection === "";
  const isAnchorActive = (id: string) => isHomepage && activeSection === id;
  const isRouteActive = (route: string) => pathname === route;

  /** Devuelve clase de link según si está activo o no. */
  const linkClass = (active: boolean) =>
    [
      "relative text-sm font-medium transition-colors duration-200",
      active
        ? "text-livic-pink"
        : "text-gray-600 hover:text-livic-pink",
    ].join(" ");

  /** Indicador visual debajo del link activo (punto rosa). */
  const ActiveDot = ({ visible }: { visible: boolean }) => (
    <span
      aria-hidden
      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-livic-pink transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  // Variantes de link para mobile drawer (full-width, más padding).
  const mobileLinkClass = (active: boolean) =>
    [
      "block w-full text-left px-5 py-3 rounded-xl text-base font-semibold transition-colors",
      active
        ? "bg-livic-pink/10 text-livic-pink"
        : "text-livic-black hover:bg-gray-50 hover:text-livic-pink",
    ].join(" ");

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-100">

        {/* Logo */}
        <Link
          href="/"
          onClick={handleInicioClick}
          className="flex items-center hover:opacity-75 transition-opacity"
        >
          <Image
            src="/logo-livic.png"
            alt="LIVIC"
            width={110}
            height={37}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* ════════════════════════════════════════════════
            DESKTOP — Links de navegación centrados (md+)
        ════════════════════════════════════════════════ */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            onClick={handleInicioClick}
            aria-current={isInicioActive ? "page" : undefined}
            className={linkClass(isInicioActive)}
          >
            Inicio
            <ActiveDot visible={isInicioActive} />
          </Link>

          {isHomepage && (
            <>
              <a
                href="#servicios"
                onClick={(e) => handleScrollTo(e, "#servicios")}
                aria-current={isAnchorActive("servicios") ? "location" : undefined}
                className={linkClass(isAnchorActive("servicios"))}
              >
                Servicios
                <ActiveDot visible={isAnchorActive("servicios")} />
              </a>
              <a
                href="#valor"
                onClick={(e) => handleScrollTo(e, "#valor")}
                aria-current={isAnchorActive("valor") ? "location" : undefined}
                className={linkClass(isAnchorActive("valor"))}
              >
                Por qué LIVIC
                <ActiveDot visible={isAnchorActive("valor")} />
              </a>
              <a
                href="#beneficios"
                onClick={(e) => handleScrollTo(e, "#beneficios")}
                aria-current={isAnchorActive("beneficios") ? "location" : undefined}
                className={linkClass(isAnchorActive("beneficios"))}
              >
                Beneficios
                <ActiveDot visible={isAnchorActive("beneficios")} />
              </a>
            </>
          )}

          <Link
            href="/detras-de-livic"
            aria-current={isRouteActive("/detras-de-livic") ? "page" : undefined}
            className={linkClass(isRouteActive("/detras-de-livic"))}
          >
            Detrás de Livic
            <ActiveDot visible={isRouteActive("/detras-de-livic")} />
          </Link>
          <Link
            href="/pricing"
            aria-current={isRouteActive("/pricing") ? "page" : undefined}
            className={linkClass(isRouteActive("/pricing"))}
          >
            Pricing &amp; Plan
            <ActiveDot visible={isRouteActive("/pricing")} />
          </Link>
          <Link
            href="/propuesta-pms"
            aria-current={isRouteActive("/propuesta-pms") ? "page" : undefined}
            className={linkClass(isRouteActive("/propuesta-pms"))}
          >
            Para operadores
            <ActiveDot visible={isRouteActive("/propuesta-pms")} />
          </Link>
        </div>

        {/* ════════════════════════════════════════════════
            ACCIONES DERECHA: WhatsApp + Hamburger (mobile)
        ════════════════════════════════════════════════ */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* WhatsApp link — visible siempre, compacto en mobile */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="inline-flex items-center gap-2 text-sm text-white bg-livic-green hover:bg-livic-green/90 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Hamburger — solo mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-livic-black hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          MOBILE — Backdrop + Drawer (full-screen overlay)
      ════════════════════════════════════════════════ */}
      {/* Backdrop — click cierra el drawer */}
      <div
        aria-hidden
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer — panel deslizable desde la derecha */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <Image
            src="/logo-livic.png"
            alt="LIVIC"
            width={90}
            height={30}
            className="h-7 w-auto"
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-livic-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto" style={{ height: "calc(100% - 60px)" }}>
          <Link
            href="/"
            onClick={(e) => {
              handleInicioClick(e);
              setMenuOpen(false);
            }}
            aria-current={isInicioActive ? "page" : undefined}
            className={mobileLinkClass(isInicioActive)}
          >
            Inicio
          </Link>

          {isHomepage && (
            <>
              <a
                href="#servicios"
                onClick={(e) => {
                  handleScrollTo(e, "#servicios");
                  setMenuOpen(false);
                }}
                aria-current={isAnchorActive("servicios") ? "location" : undefined}
                className={mobileLinkClass(isAnchorActive("servicios"))}
              >
                Servicios
              </a>
              <a
                href="#valor"
                onClick={(e) => {
                  handleScrollTo(e, "#valor");
                  setMenuOpen(false);
                }}
                aria-current={isAnchorActive("valor") ? "location" : undefined}
                className={mobileLinkClass(isAnchorActive("valor"))}
              >
                Por qué LIVIC
              </a>
              <a
                href="#beneficios"
                onClick={(e) => {
                  handleScrollTo(e, "#beneficios");
                  setMenuOpen(false);
                }}
                aria-current={isAnchorActive("beneficios") ? "location" : undefined}
                className={mobileLinkClass(isAnchorActive("beneficios"))}
              >
                Beneficios
              </a>
            </>
          )}

          <Link
            href="/detras-de-livic"
            aria-current={isRouteActive("/detras-de-livic") ? "page" : undefined}
            className={mobileLinkClass(isRouteActive("/detras-de-livic"))}
          >
            Detrás de Livic
          </Link>
          <Link
            href="/pricing"
            aria-current={isRouteActive("/pricing") ? "page" : undefined}
            className={mobileLinkClass(isRouteActive("/pricing"))}
          >
            Pricing &amp; Plan
          </Link>
          <Link
            href="/propuesta-pms"
            aria-current={isRouteActive("/propuesta-pms") ? "page" : undefined}
            className={mobileLinkClass(isRouteActive("/propuesta-pms"))}
          >
            Para operadores
          </Link>

          {/* CTA WhatsApp dentro del drawer (extra utility, además del header) */}
          <div className="pt-4 px-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full bg-livic-green hover:bg-livic-green/90 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors shadow-md shadow-livic-green/20"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </div>

          {/* ════════════════════════════════════════════
              PANEL DE BRAND + CONTACTO + REDES
          ════════════════════════════════════════════ */}
          <div className="relative mt-6 mx-2 rounded-2xl bg-gradient-to-br from-livic-pink/8 via-white to-livic-purple/8 border border-livic-pink/15 overflow-hidden">
            {/* Blob decorativo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-livic-yellow/20 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-livic-purple/15 blur-2xl"
            />

            <div className="relative p-5 space-y-5">
              {/* Tagline / lema */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-livic-purple mb-1.5">
                  La marca
                </p>
                <p className="text-sm font-semibold text-livic-black leading-snug">
                  Hospitalidad con atención real ✨
                </p>
                <p className="mt-1.5 text-xs text-text-muted leading-relaxed">
                  {CONFIG.site.description}
                </p>
              </div>

              {/* Separador */}
              <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-livic-pink/30 to-transparent" />

              {/* Redes sociales */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-livic-purple mb-2.5">
                  Síguenos
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href={CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram de LIVIC"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-100 text-livic-pink hover:bg-livic-pink hover:text-white transition-colors shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={CONFIG.social["tik-tok"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok de LIVIC"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-100 text-livic-black hover:bg-livic-black hover:text-white transition-colors shadow-sm"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${CONFIG.contact.email}`}
                    aria-label="Enviar email a LIVIC"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-100 text-livic-purple hover:bg-livic-purple hover:text-white transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                <p className="mt-2.5 text-[11px] text-text-muted break-all">
                  {CONFIG.contact.email}
                </p>
              </div>

              {/* Separador */}
              <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-livic-pink/30 to-transparent" />

              {/* Ubicación */}
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <MapPin className="w-3.5 h-3.5 text-livic-green flex-shrink-0" />
                <span>Santa Marta · Colombia</span>
              </div>
            </div>
          </div>

          {/* Copyright al fondo */}
          <p className="mt-4 mb-2 text-center text-[10px] text-text-muted tracking-wider">
            © {new Date().getFullYear()} LIVIC · Todos los derechos reservados
          </p>
        </nav>
      </aside>
    </>
  );
}
