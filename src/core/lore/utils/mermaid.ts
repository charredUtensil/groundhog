import { filterTruthy } from "../../common/utils";
import { MOCK_FORMAT } from "../mock";
import { PhraseGraph } from "./builder";

export function mermaidify(pg: PhraseGraph<any, any>) {
  const ph = pg.phrases.flatMap((phrase) => {
    const texts = [
      ...phrase.text.map((fn, i) =>
        fn({ chosen: phrase.text, index: i, format: MOCK_FORMAT }).replace(
          /\n/g,
          "\\n",
        ),
      ),
      ...(phrase.requires ? [`[${phrase.requires}]`] : []),
    ];
    const label = texts
      .map((t) => (texts.length > 1 ? `&bull; ${t}` : t))
      .join("<br/>");
    return filterTruthy([
      label && `P${phrase.id}[${JSON.stringify(label)}]`,
      ...phrase.after.map((a) => `P${phrase.id} --> P${a.id}`),
    ]);
  });
  return `\`\`\`mermaid\nflowchart TD;\n${ph.join("\n")}\n\`\`\``;
}
