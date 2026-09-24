import type { PortableTextBlock } from "@portabletext/react";

let keySeq = 0;
const key = () => `k${(keySeq++).toString(36)}`;

/** Convertit des sections { title, text } en Portable Text (h2 + paragraphe). */
export function sectionsToPortableText(
  sections: { title: string; text: string }[],
): PortableTextBlock[] {
  return sections.flatMap(({ title, text }) =>
    [
      { style: "h2", text: title },
      { style: "normal", text },
    ].map(
      ({ style, text }) =>
        ({
          _type: "block",
          _key: key(),
          style,
          markDefs: [],
          children: [{ _type: "span", _key: key(), text, marks: [] }],
        }) as PortableTextBlock,
    ),
  );
}
