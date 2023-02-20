import type { Options } from "../../../libs/syntax-highlight";
import Switch from "../Switch/Switch";
import { useEffect, useMemo, useState } from "react";
import Input from "../Input/Input";
import Collapse from "../Transitions/Collapse/Collapse";
import { clss } from "../../utils";

export type OptionsWithoutLanguage = Omit<
  Options,
  "parsingEngine" | "language"
>;

export type OptionsPanelProps = {
  open: boolean;
  onChange(options: OptionsWithoutLanguage): void;
  className?: string;
};

const INPUT_DEBOUNCE = 500;

export default function OptionsPanel({
  open,
  onChange,
  className,
}: OptionsPanelProps) {
  const [wrapLinesChecked, setWrapLinesChecked] = useState(false);
  const [wrapLinesClass, setWrapLinesClass] = useState("");
  const [autolinkChecked, setAutolinkChecked] = useState(false);
  const [autolinkClass, setAutolinkClass] = useState("");
  const [preClass, setPreClass] = useState("");
  const [codeClass, setCodeClass] = useState("");

  const options = useMemo(
    () => ({
      wrapLines: (wrapLinesChecked && wrapLinesClass) || wrapLinesChecked,
      autolink: (autolinkChecked && autolinkClass) || autolinkChecked,
      preClass,
      codeClass,
    }),
    [
      wrapLinesChecked,
      wrapLinesClass,
      autolinkChecked,
      autolinkClass,
      preClass,
      codeClass,
    ]
  );

  useEffect(() => onChange?.(options), [options]);

  return (
    <Collapse open={open} className={clss("duration-200 w-[101%]", className)}>
      <div
        className={clss(
          "md:grid md:grid-cols-[auto_1fr] gap-4  py-1 rounded items-center w-full",
          "w-[99%]"
        )}
      >
        <div className="flex justify-between gap-4 mb-2 md:mb-0">
          <label htmlFor="wrap-lines-toggle" className="">
            Wrap Lines in <code className="text-purple-500">&lt;span&gt;</code>
          </label>
          <Switch
            id="wrap-lines-toggle"
            className="ui-checked:bg-accent outline-transparent focus:outline-active outline-offset-1"
            thumbClass=""
            checked={wrapLinesChecked}
            onChange={setWrapLinesChecked}
          />
        </div>
        <Input
          className={clss(
            "w-full mb-5 md:mb-0 p-2 rounded-default transition placeholder:italic",
            "bg-white disabled:bg-disabled",
            "border outline-0 outline-default disabled:outline-disabled",
            "focus:outline-1 focus:outline-active"
          )}
          debounce={INPUT_DEBOUNCE}
          disabled={!wrapLinesChecked}
          value={wrapLinesClass}
          onChange={setWrapLinesClass}
          placeholder="Enter classes for lines (optional)"
          autoComplete="off"
        />

        <div className="flex justify-between gap-4 mb-2 md:mb-0">
          <label htmlFor="autolink-toggle" className="">
            Turn URLs, emails, `tel:` to links (
            <code className="text-purple-500">&lt;a&gt;</code>)
          </label>
          <Switch
            id="autolink-toggle"
            className="ui-checked:bg-accent outline-transparent focus:outline-active outline-offset-1"
            thumbClass=""
            checked={autolinkChecked}
            onChange={setAutolinkChecked}
          />
        </div>
        <Input
          className={clss(
            "w-full mb-5 md:mb-0 p-2 rounded-default transition placeholder:italic",
            "bg-white disabled:bg-disabled",
            "border outline-0 outline-default disabled:outline-disabled",
            "focus:outline-1 focus:outline-active"
          )}
          debounce={INPUT_DEBOUNCE}
          disabled={!autolinkChecked}
          value={autolinkClass}
          onChange={setAutolinkClass}
          placeholder="Enter classes for links (optional)"
          autoComplete="off"
        />

        <label htmlFor="preclass-input" className="inline-block mb-2 md:mb-0">
          Classes for <code className="text-purple-500">&lt;pre&gt;</code>{" "}
          element
        </label>
        <Input
          id="preclass-input"
          className={clss(
            "w-full mb-5 md:mb-0 p-2 rounded-default transition placeholder:italic",
            "bg-white disabled:bg-disabled",
            "border outline-0 outline-default disabled:outline-disabled",
            "focus:outline-1 focus:outline-active"
          )}
          debounce={INPUT_DEBOUNCE}
          value={preClass}
          onChange={setPreClass}
          placeholder="Enter classes for <pre> (optional)"
          autoComplete="off"
        />

        <label htmlFor="codeclass-input" className="inline-block mb-2 md:mb-0">
          Classes for <code className="text-purple-500">&lt;code&gt;</code>{" "}
          element
        </label>
        <Input
          id="codeclass-input"
          className={clss(
            "w-full md:mb-0 p-2 rounded-default transition placeholder:italic",
            "bg-white disabled:bg-disabled",
            "border outline-0 outline-default disabled:outline-disabled",
            "focus:outline-1 focus:outline-active"
          )}
          debounce={INPUT_DEBOUNCE}
          value={codeClass}
          onChange={setCodeClass}
          placeholder="Enter classes for <code> (optional)"
          autoComplete="off"
        />
      </div>
    </Collapse>
  );
}
