import { ComponentStory, ComponentMeta } from "@storybook/react";
import useRipple, {RippleOptions} from "./useRipple";
import "../index.css";
import { useState } from "react";

const clss = (...classes: (string | string[] | false | undefined)[]) =>
  classes.flat().filter(Boolean).join(" ").trim();

const Button = (props: RippleOptions) => {
  const [element, setElement] = useState<HTMLButtonElement | null>(null);
  useRipple(element, props);

  return (
    <button
      ref={setElement}
      className="relative overflow-hidden bg-blue-300 border rounded p-2"
      onClick={() => console.log('button onClick')}
    >
      With Ripple
    </button>
  );
};

export default {
  title: "Syntax Highlight Generator/hooks/useRipple",
  component: Button,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button />;

export const Default = (args: RippleOptions) => (
  <div className="">
    <Button {...args} />
    <pre className="mt-4 bg-gray-800 text-white rounded p-4">
      <code>{`
1. Should cancel previous ripple, when new ripple is created
2. Should ripple when clicked with keyboard
3. Clicking on target before ripple animation is finished,
   should trigger 'click' event on the target (see console log)
    `}</code>
    </pre>
  </div>
);

Default.args = {
  color: "rgba(255, 255, 255, 0.4)",
  duration: 500,
  maxScale: 1,
  from: 'cursor',
}
Default.argTypes = {
  
}
