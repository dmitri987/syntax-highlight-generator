import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Toolbar, { Settings } from "./Toolbar";
import "../../index.css";
import { useCallback, useState } from "react";
import { clss } from "../../utils";

export default {
  title: "Syntax Highlight Generator/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof Toolbar>;

export const Default = (args: any) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  return (
    <div
      className={clss(
        settings?.parsingEngine === 'hljs' ? 'hljs-theme'
        : settings?.parsingEngine === 'prism' && 'prism-theme'
        // args.theme === "hljs"
        //   ? "hljs-theme"
        //   : args.theme === "prism" && "prism-theme"
      )}
    >
      <Toolbar onChange={setSettings} />
      <pre className="font-mono">
        Settings: {JSON.stringify(settings, null, 2)}
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

// export const TryUseCallback = () => {
//   const [values, setValues] = useState<string[]>(['initial value']);

//   const getValues = useCallback(() => values, [values]);

//   return (
//     <div>
//       <button
//         className="border rounded px-2 py-1"
//         onClick={() => setValues((values) => ["foo", ...values])}
//       >
//         Add
//       </button>

//       <p>Values from getValues: {getValues().join(', ')}</p>
//       <p>Values from inline values: {values.join(', ')}</p>
//     </div>
//   );
// };
