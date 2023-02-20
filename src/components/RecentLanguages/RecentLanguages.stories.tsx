import type { ComponentStory, ComponentMeta } from "@storybook/react";

import RecentLanguages from "./RecentLanguages";
import "../../index.css";
import { useState } from "react";
import {Language} from "../../hooks/useLanguages/useLanguages";

export default {
  title: "Syntax Highlight Generator/RecentLanguages",
  component: RecentLanguages,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof RecentLanguages>;

const languages: Language[] = [
  { name: "cpp", engine: "prism" as const },
  { name: "java", engine: "hljs" as const },
  { name: "rust", engine: "prism" as const },
  { name: "typescript", engine: "hljs" as const },
];

export const Default = (args: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language|null>(null);

  return (
    <div className="grid gap-4">
      <RecentLanguages
        recentLanguages={languages}
        selectedLanguage={selectedLanguage}
        onChange={setSelectedLanguage}
      />
      <pre className="font-mono">{`
Selected index: 
${JSON.stringify(selectedLanguage, null, 2)}
      `}</pre>
    </div>
  );
};
