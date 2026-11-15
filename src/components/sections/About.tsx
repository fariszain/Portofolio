import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  copy: Dictionary["about"];
};

/**
 * Text-led: the portrait lives in the hero, so this section is carried by
 * one large statement, with the detail set in a narrower column beside it.
 */
export function About({ copy }: Props) {
  return (
    <section id="about" className="about px-(--gutter) py-(--section-y)">
      <SectionLabel index={1}>{copy.label}</SectionLabel>

      <RevealText
        by="line"
        className="mt-10 max-w-[22ch] text-[clamp(2.25rem,5.6vw,6rem)] leading-[1.04] tracking-[-0.03em] sm:mt-14"
      >
        {copy.lead}
      </RevealText>

      <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-10">
        <p className="max-w-[58ch] text-xl leading-relaxed text-muted lg:col-span-6 lg:col-start-6 xl:text-2xl xl:leading-relaxed">
          {copy.body}
        </p>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 lg:col-span-7 lg:col-start-6 xl:grid-cols-4">
          {copy.facts.map((fact) => (
            <div key={fact.term}>
              <dt className="font-mono text-sm text-muted">{fact.term}</dt>
              <dd className="mt-2 text-xl leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
