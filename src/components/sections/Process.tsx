import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  copy: Dictionary["process"];
};

export function Process({ copy }: Props) {
  return (
    <section id="process" className="px-(--gutter) py-28 sm:py-40">
      <SectionLabel index={2} as="p">
        {copy.label}
      </SectionLabel>

      <RevealText
        as="h2"
        by="char"
        className="mt-5 font-display text-[clamp(3.25rem,10vw,10rem)] uppercase leading-[0.9]"
      >
        {copy.title}
      </RevealText>

      {/* A real sequence, so it is an ordered list and the numbers mean order. */}
      <ol className="mt-16 border-t border-line sm:mt-20">
        {copy.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-x-10 gap-y-3 border-b border-line py-8 sm:grid-cols-[3rem_minmax(0,17rem)_minmax(0,1fr)] sm:items-baseline sm:py-10 lg:grid-cols-[5rem_minmax(0,24rem)_minmax(0,1fr)]"
          >
            <span aria-hidden="true" className="font-mono text-sm text-red-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl">
              {step.title}
            </h3>
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
