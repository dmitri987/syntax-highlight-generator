import prismLanguages from "./prism-languages";
import hljsLanguages from "./hljs-languages";
import { hljs, prism } from "../useSyntaxHighlight";

export type Language = {
  name: string;
  engine: "prism" | "hljs";
  registered?: boolean;
};

const allLanguages: Language[] = [
  ...prismLanguages.map((name) => ({
    name,
    engine: "prism" as const,
    registered: prism.registered(name),
  })),
  ...hljsLanguages.map((name) => ({
    name,
    engine: "hljs" as const,
    registered: hljs.registered(name),
  })),
];
allLanguages.sort((a, b) => a.name.localeCompare(b.name));
allLanguages.forEach((item) => {
  Object.defineProperties(item, {
    name: {
      configurable: false,
      writable: false,
    },
    engine: {
      configurable: false,
      writable: false,
    },
  });
});
Object.freeze(allLanguages);

export default function useLanguages() {
  return allLanguages;
}

export async function loadLanguage(
  language: Language | null
): Promise<Language | null> {
  if (!language || language.registered) return language;

  try {
    if (language.engine === "prism") {
      const { default: syntax } = await import(
        /* @vite-ignore */ `../../../node_modules/refractor/lang/${language.name}.js`
      );
      prism.registerLanguage(syntax);
    } else if (language.engine === "hljs") {
      const { default: syntax } = await import(
        /* @vite-ignore */
        `../../../libs/syntax-highlight/languages/hljs/${language.name}.js`
      );
      hljs.registerLanguage(syntax, language.name);
    }
  } catch (err) {
    throw language;
  }

  language.registered = true;
  Object.freeze(language);
  return language;
}
