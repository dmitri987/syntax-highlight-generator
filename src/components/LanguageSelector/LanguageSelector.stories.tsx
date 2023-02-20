import type { ComponentStory, ComponentMeta } from "@storybook/react";

import LanguageSelector, {Language} from "./LanguageSelector";
import "../../index.css";
import {useState} from "react";

export default {
  title: "Syntax Highlight Generator/LanguageSelector",
  component: LanguageSelector,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof LanguageSelector>;


type MaybeClassName = string | false | null | undefined;
const clss = (...classes: (MaybeClassName | MaybeClassName[])[]) =>
  classes.flat().filter(Boolean).join(" ").trim();

export const Default = (args: any) => {
  const [lang, setLang] = useState<Language | null>(null);

  return (
      <div className={clss(
        "grid gap-4",
        lang?.engine === 'hljs' ? 'hljs-theme' : lang?.engine && 'prism-theme'
          )}>
      <LanguageSelector
        onChange={setLang}
      />
      <p className="">Selected language: {lang?.name} - {lang?.engine}</p>
    </div>
  );
};
