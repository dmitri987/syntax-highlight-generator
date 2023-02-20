import { RadioGroup, Tab } from "@headlessui/react";
import type {Language} from "../../hooks/useLanguages/useLanguages";
import { clss } from "../../utils";


type Props = {
  recentLanguages: Language[];
  selectedLanguage: Language | null;
  onChange(selectedLanguage: Language): void;
};

export default function RecentLanguages(props: Props) {
  const { recentLanguages, selectedLanguage, onChange } = props;

  return (
    <RadioGroup
      value={selectedLanguage}
      onChange={onChange}
      className={clss(
        "w-[calc(100%-4px)] translate-x-[2px] rtl:translate-x-[-2px]",
        "w-full min-h-[2rem]",
        "flex gap-x-6 gap-y-2 items-center justify-content-start",
        "flex-wrap",
      )}
    >
      {recentLanguages.map((lang) => (
        <RadioGroup.Option
          as="button"
          key={lang.name + lang.engine}
          value={lang}
          className={clss(
            "flex items-center justify-content-between",
            "px-4 pt-1 pb-1.5 rounded",
            "border-0 outline outline-2 outline-transparent",

            lang.engine === "prism"
              ? [
                  "bg-prism-dark outline-prism",
                  "ui-active:outline-prism-active",
                  "ui-checked:outline-prism-checked",
                ]
              : [
                  "bg-hljs-dark outline-hljs",
                  "ui-active:outline-hljs-active",
                  "ui-checked:outline-hljs-checked",
                ]
          )}
        >
          {lang.name} - {lang.engine}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
