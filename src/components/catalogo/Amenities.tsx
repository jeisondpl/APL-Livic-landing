/**
 * Amenities.tsx
 * Grid de amenidades agrupadas por categoría con diseño mejorado.
 * Server Component.
 */

import { 
  Wifi, Wind, Flame, Tv, ChefHat, Bed, Sparkles, Bath,
  Sunrise, Laptop, UtensilsCrossed, Sofa, Lock, Shield,
  Waves, Dumbbell, ShieldCheck, Car, Shirt, Archive,
  Network, Speaker, Microwave, Coffee, Utensils, ArrowUpDown,
  PanelTop, WashingMachine, Store, PawPrint, CigaretteOff, Users,
  Music, Moon, LucideIcon
} from "lucide-react";

import type { ApartmentAmenityCategory } from "@/data/apartments";

const iconMap: Record<string, LucideIcon> = {
  Wifi, Wind, Flame, Tv, ChefHat, Bed, Sparkles, Bath,
  Sunrise, Laptop, UtensilsCrossed, Sofa, Lock, Shield,
  Waves, Dumbbell, ShieldCheck, Car, Shirt, Archive,
  Network, Speaker, Microwave, Coffee, Utensils, ArrowUpDown,
  WashingMachine, Blinds: PanelTop, Blend: Coffee,
  Store, PawPrint, CigaretteOff, Users, Music, Moon
};

interface AmenitiesProps {
  categorias: ApartmentAmenityCategory[];
  /** Color de acento para los iconos y bullets (pink, green, purple, yellow) */
  acento?: "pink" | "green" | "purple" | "yellow";
}

const ACENTO_CLASSES: Record<string, string> = {
  pink:   "bg-livic-pink text-livic-pink",
  green:  "bg-livic-green text-livic-green",
  purple: "bg-livic-purple text-livic-purple",
  yellow: "bg-livic-yellow text-livic-yellow",
};

export default function Amenities({ categorias, acento = "pink" }: AmenitiesProps) {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    // Si no existe el icono en el mapa, intentamos usar Wind como fallback o null
    return Icon ? <Icon className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />;
  };

  const acentoClass = ACENTO_CLASSES[acento] || ACENTO_CLASSES.pink;
  const [bgClass, textClass] = acentoClass.split(" ");

  return (
    <div className="space-y-10">
      {categorias.map((cat) => (
        <div key={cat.titulo}>
          {/* Título de categoría con bullet */}
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${bgClass}`} />
            {cat.titulo}
          </h4>

          {/* Grid de items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.items.map((item) => (
              <div
                key={item.nombre}
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-100 border border-surface-300 hover:border-surface-100 hover:bg-surface-200 transition-all group"
              >
                <span className={`${textClass} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {getIcon(item.icono)}
                </span>
                <span className="text-sm text-text-muted group-hover:text-foreground transition-colors">
                  {item.nombre}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}