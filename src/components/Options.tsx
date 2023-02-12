import { ChevronUpIcon } from "@heroicons/react/20/solid";

// export type Options = {
//   parsingEngine?: ParsingEngine;
//   language?: string;
//   wrapLines?: boolean | ClassName;
//   autolink?: boolean | ClassName;
//   preClass?: ClassName;
//   codeClass?: ClassName;
// };

import { Disclosure } from "@headlessui/react";
import Switch from "./Switch/Switch";

type Props = {};

export default function Options(props: Props) {
  return (
    <Disclosure>
      <Disclosure.Button className="flex justify-content-between items-center p-1 border rounded gap-8">
        <span>Options</span>
        <ChevronUpIcon className="w-5 h-5 transition ui-open:rotate-180" />
      </Disclosure.Button>
      <Disclosure.Panel className="mt-2 p-2 border rounded">
        <div className="flex items-center gap-4">
          <span>Wrap Lines</span>
          <Switch
            className="[--switch-width:8rem] [--h:5rem] "
            vertical
            thumbClass=""
          />
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
