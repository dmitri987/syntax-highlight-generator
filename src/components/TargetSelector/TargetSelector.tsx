import { RadioGroup } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

type MaybeClassName = string | false | null | undefined;
const clss = (...classes: (MaybeClassName | MaybeClassName[])[]) =>
  classes.flat().filter(Boolean).join(" ").trim();

export type Target = "HTML" | "JSX";

type Props = {
  defaultValue?: Target;
  value?: Target;
  onChange(v: Target): void;
} & Parameters<typeof RadioGroup>[0];

type SegmentedButtonProps<T extends string | { label: string }> = {
  values: T[];
  defaultValue?: T;
  value?: T;
  onChange(v: T): void;
} & Parameters<typeof RadioGroup>[0];

function SegmentedButtons<T extends string | { label: string } = string>({
  values,
  ...props
}: SegmentedButtonProps<T>) {
  return (
    <RadioGroup
      {...props}
      className={clss(
        // adjust outline to elements with borders
        "relative w-[calc(100%-2px)] translate-x-[1px] rtl:translate-x-[-1px]",
        "flex justify-content-center",
        "group"
      )}
      title="Output format"
    >
      {values.map((value, index) => (
        <RadioGroup.Option
          key={index}
          as="button"
          value={value}
          className={clss(
            "w-full px-2 py-1 z-0 border border-default",
            "border-r-0 last:border-r last:translate-x-[-1px]",
            "first:rounded-l-default last:rounded-r-default",
            "group-focus-within:border-active",
            "ui-checked:bg-dark",
            "ui-active:outline ui-active:outline-1 ui-active:outline-active"
          )}
        >
          {typeof value === "string" ? value : value.label}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default function TargetSelector(props: Props) {
  return <SegmentedButtons values={["JSX", "HTML"]} {...props} />;
}
