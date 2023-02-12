import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Switch from "./Switch";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Syntax Highlight Generator/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  vertical: false,
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  vertical: false,
  className: "[--w:10rem] [--h:3rem]",
};
CustomSize.argTypes = {
  className: {
    options: [
      "[--w:5rem] [--h:3rem]",
      "[--w:10rem] [--h:5rem]",
      "[--w:20rem] [--h:8rem]",
      "[--w:30rem] [--h:13rem]",
    ],
    control: { type: "select" },
  },
};

export const CustomTrackColor = Template.bind({});
CustomTrackColor.args = {
  className: "[--track:lavender] [--track-checked:rebeccapurple]",
};
CustomTrackColor.argTypes = {
  className: {
    options: [
     "[--track:lavender] [--track-checked:rebeccapurple]",
     "[--track:lightblue] [--track-checked:royalblue]",
     "[--track:lightgray] [--track-checked:maroon]",
    ],
    control: { type: "select" },
  },
};

export const CustomThumbColor = Template.bind({});
CustomThumbColor.args = {
  className: "[--thumb:gray] [--thumb-checked:white] [--track:lightgray]",
};

export const CustomDurationWithCssVar = Template.bind({});
CustomDurationWithCssVar.args = {
  className: "[--duration:300ms]",
};
CustomDurationWithCssVar.argTypes = {
  className: {
    options: [
     "[--duration:300ms]",
     "[--duration:500ms]",
     "[--duration:1s]",
    ],
    control: { type: "select" },
  },
};

export const CustomDurationWithClasses = Template.bind({});
CustomDurationWithClasses.args = {
  className: "duration-1000",
  thumbClass: "duration-1000",
};

export const OtherCustomizationsWithClasses = Template.bind({});
OtherCustomizationsWithClasses.args = {
  vertical: false,
  className: "rounded-lg border-4",
  thumbClass: "rounded-lg",
};
