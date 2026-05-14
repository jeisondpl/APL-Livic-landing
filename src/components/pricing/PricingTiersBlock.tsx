/**
 * PricingTiersBlock.tsx
 *
 * Renderiza los 3 tiers de pricing en grid horizontal (md:3-cols).
 * Mobile: stack vertical. El tier "recomendado" queda en el centro y
 * sobresale visualmente.
 */

import { PRICING_CONTENT } from "@/data/pricing-content";
import { CONFIG } from "@/data/config";
import { getWhatsAppLink } from "@/lib/utils";
import PricingCard from "./PricingCard";

export default function PricingTiersBlock() {
  const { tiers } = PRICING_CONTENT;

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-7 lg:gap-8 items-stretch pt-6 md:pt-8">
      {tiers.map((tier) => {
        // Cada tier tiene su propio CTA con mensaje de WhatsApp pre-relleno
        const whatsappUrl = getWhatsAppLink(
          CONFIG.contact.whatsapp.number,
          tier.cta.whatsappMessage,
        );
        return (
          <PricingCard
            key={tier.id}
            tier={tier}
            whatsappUrl={whatsappUrl}
          />
        );
      })}
    </div>
  );
}
