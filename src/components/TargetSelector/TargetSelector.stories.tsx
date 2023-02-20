import type { ComponentStory, ComponentMeta } from "@storybook/react";

import TargetSelector from "./TargetSelector";
import "../../index.css";
import { useState } from "react";

export default {
  title: "Syntax Highlight Generator/TargetSelector",
  component: TargetSelector,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof TargetSelector>;

type MaybeClassName = string | false | null | undefined;
const clss = (...classes: (MaybeClassName | MaybeClassName[])[]) =>
  classes.flat().filter(Boolean).join(" ").trim();

export const Default = (args: any) => {
  const [target, setTarget] = useState("HTML");

  return (
    <div
      className={clss(
        "grid gap-4 w-[400px] justify-items-start",
        args.theme === "hljs"
          ? "hljs-theme"
          : args.theme === "prism" && "prism-theme"
      )}
    >
      <TargetSelector onChange={setTarget} />
      <pre className="font-mono">Target: {target}</pre>
    </div>
  );
};

Default.argTypes = {
  theme: {
    control: "select",
    options: ["default", "prism", "hljs"],
  },
};
