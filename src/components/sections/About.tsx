import { RevealText } from "@/components/motion/RevealText";
import { Portrait } from "@/components/ui/Portrait";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  copy: Dictionary["about"];
};

export function About({ copy }: Props) {
  return (
    <section id="about" className="px-(--gutter) py-28 sm:py-40">
      <SectionLabel index={1}>{copy.label}</SectionLabel>

      <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-24">
        <Portrait alt={copy.portraitAlt} className="max-w-[21rem]" />

        <div>
          <RevealText
            by="line"
            className="max-w-[26ch] text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
          >
            {copy.lead}
          </RevealText>

          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted">{copy.body}</p>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-8 xl:grid-cols-4">
            {copy.facts.map((fact) => (
              <div key={fact.term}>
                <dt className="font-mono text-sm text-muted">{fact.term}</dt>
                <dd className="mt-1.5 text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
