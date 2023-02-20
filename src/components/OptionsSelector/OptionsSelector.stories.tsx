import type { ComponentStory, ComponentMeta } from "@storybook/react";

import OptionsButton from "./OptionsButton";
import OptionsPanel, { OptionsWithoutLanguage } from "./OptionsPanel";
import "../../index.css";
import { useState } from "react";
import { clss } from "../../utils";

export default {
  title: "Syntax Highlight Generator/OptionsSelector",
  component: OptionsPanel,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof OptionsPanel>;

export const Default = (args: any) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OptionsWithoutLanguage | null>(null);

  return (
    <div
      className={clss(
        "gap-4 w-full mx-auto h-[500px] items-start justify-items-start",
        args.theme === "hljs"
          ? "hljs-theme"
          : args.theme === "prism" && "prism-theme"
      )}
    >
      <OptionsButton onChange={(open) => setOpen(open)} />
      <OptionsPanel
        open={open}
        onChange={(options) => setOptions(options)}
        className={clss("self-start")}
      />

      <pre className="font-mono">
        Options: {JSON.stringify(options, null, 2)}
      </pre>
    </div>
  );
};

Default.argTypes = {
  theme: {
    control: "select",
    options: ["default", "prism", "hljs"],
  },
};
