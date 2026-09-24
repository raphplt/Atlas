import { Reveal } from "./Reveal";

/** La méthode, tracée comme un itinéraire balisé. */
export function Path({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="path">
      {steps.map((step) => (
        <li key={step.title}>
          <Reveal>
            <h3 className="h3">{step.title}</h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="body">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
