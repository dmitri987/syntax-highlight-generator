import { ChevronUpIcon } from "@heroicons/react/20/solid";
import type { Options } from "../../libs/syntax-highlight";

import { Disclosure } from "@headlessui/react";
import Switch from "./Switch/Switch";
import { useEffect, useMemo, useState } from "react";
import Input from "./Input/Input";

export type OptionsPickerProps = {
  onChange(options: Omit<Options, "parsingEngine" | "language">): void;
};

export default function OptionsPicker({ onChange }: OptionsPickerProps) {
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

  useEffect(() => onChange?.(options), [options])

  return (
    <Disclosure>
      <Disclosure.Button className="flex justify-content-between items-center p-1 border rounded gap-8">
        <span>Options</span>
        <ChevronUpIcon className="w-5 h-5 transition ui-open:rotate-180" />
      </Disclosure.Button>
      <Disclosure.Panel className="mt-2 p-2 border rounded">
        <div className="grid grid-cols-[auto_3rem_1fr] items-center gap-4 w-full">
          <span className="">
            Wrap Lines in{" "}
            <code className="bg-slate-100 text-blue-500 p-0.5 rounded">
              &lt;span&gt;
            </code>
          </span>
          <Switch
            className=""
            thumbClass=""
            checked={wrapLinesChecked}
            onChange={setWrapLinesChecked}
          />
          <Input
            className="bg-white p-2 rounded outlne disabled:bg-gray-100 disabled:outline-gray-300 transition placeholder:italic"
            disabled={!wrapLinesChecked}
            value={wrapLinesClass}
            onChange={setWrapLinesClass}
            placeholder="Enter classes, which will be applied on every line (optional)"
          />

          <span className="">
            Turn URLs, emails, `tel:` to links (
            <code className="bg-slate-100 text-blue-500 p-0.5 rounded">
              &lt;a&gt;
            </code>
            )
          </span>
          <Switch
            className=""
            thumbClass=""
            checked={autolinkChecked}
            onChange={setAutolinkChecked}
          />
          <Input
            className="bg-white p-2 rounded outlne disabled:bg-gray-100 disabled:outline-gray-300 transition placeholder:italic"
            disabled={!autolinkChecked}
            value={autolinkClass}
            onChange={setAutolinkClass}
            placeholder="Enter classes, which will be applied on every link (optional)"
          />

          <span className="">
            Classes for{" "}
            <code className="bg-slate-100 text-blue-500 p-0.5 rounded">
              &lt;pre&gt;
            </code>{" "}
            element
          </span>
          <span></span>
          <Input
            className="bg-white p-2 rounded outlne disabled:bg-gray-100 disabled:outline-gray-300 transition placeholder:italic"
            value={preClass}
            onChange={setPreClass}
            placeholder="Enter classes for <pre> element at the top (optional)"
          />
          <span className="">
            Classes for{" "}
            <code className="bg-slate-100 text-blue-500 p-0.5 rounded">
              &lt;code&gt;
            </code>{" "}
            element
          </span>
          <span></span>
          <Input
            className="bg-white p-2 rounded outlne disabled:bg-gray-100 disabled:outline-gray-300 transition placeholder:italic"
            value={codeClass}
            onChange={setCodeClass}
            placeholder="Enter classes for <code> element under <pre> (optional)"
          />
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
