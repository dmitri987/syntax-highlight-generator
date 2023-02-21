import { useCallback, useEffect, useRef, useState } from "react";
import { html, jsx, Options, prism } from "../libs/syntax-highlight";
import Code from "./components/Code/Code";
import Toolbar, { Settings } from "./components/Toolbar/Toolbar";

import "../libs/syntax-highlight/themes/prism/default.css";
import jsxSyntax from "refractor/lang/jsx";
import { clss } from "./utils";
import {
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon,
} from "./assets/icons";
import Input from "./components/Input/Input";
prism.registerLanguage(jsxSyntax);


const exampleText = `// https://google.com
function example() {
  console.log('Hello world');
}`;

const useCopyToClipboard = (
  timeout: number
): [copied: boolean, copy: (text: string) => void] => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const timeoutRef = useRef(0);
  const copyToClipboard = useCallback((text: string) => {
    if (!text || getSelection()?.type === "Range") return;

    navigator.clipboard.writeText(text);
    setCopiedToClipboard(true);
    clearTimeout(timeoutRef.current);
    setTimeout(() => setCopiedToClipboard(false), timeout);
  }, []);

  return [copiedToClipboard, copyToClipboard];
};

function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [rawText, setRawText] = useState(exampleText);
  const [highlightedText, setHighlightedText] = useState("");
  const [copiedToClipboard, copyToClipboard] = useCopyToClipboard(1000);
  const [showTips, setShowTips] = useState(true);

  useEffect(
    function highlight() {
      if (!settings) return;

      const {
        target = "JSX",
        autocopyToClipboard = false,
        ...options
      } = settings;

      const highlighted =
        target === "HTML" ? html(rawText, options) : jsx(rawText, options);

      setHighlightedText(highlighted);

      if (autocopyToClipboard) copyToClipboard(highlighted);
    },
    [settings, rawText]
  );

  return (
    <div dir="ltr">
      <p className="text-lg mb-4 ">
        Create markup, highlighted with{" "}
        <a
          href="https://prismjs.com/"
          className="text-teal-700 font-medium underline"
          tabIndex={-1}
        >
          Prism.js
        </a>{" "}
        or{" "}
        <a
          href="https://highlightjs.org/"
          className="text-sky-700 font-medium underline"
          tabIndex={-1}
        >
          Highlight.js
        </a>{" "}
        for inlining in React project (JSX) or in a web page (HTML)
      </p>

      {!navigator.onLine && (
        <span
          className={clss(
            "flex gap-4 justify-start items-center",
            "w-full rounded-default text-red-700 p-3 mb-4",
            "border border-1 border-red-700",
            "opacity-75"
          )}
        >
          <ExclamationCircleIcon className="w-6 h-6 fill-transparent stroke-red-700 stroke-1" />
          <span>
            {" "}
            No network connection. You can use only already registered languages
          </span>
        </span>
      )}

      <div
        className={clss(
          "grid gap-x-4 gap-y-6",
          "grid-cols-1 grid-rows-[auto_minmax(400px,auto)_minmax(400px,auto)]",
          "md:grid-cols-2 md:grid-rows-[auto_minmax(500px,55vh)]",
          (settings as Options)?.parsingEngine === "hljs"
            ? "hljs-theme"
            : "prism-theme"
        )}
      >
        <Toolbar onChange={setSettings} className="md:col-span-2" />
        <Input
          as="textarea"
          className={`
        resize-none p-4 rounded-default font-mono
        border border-default focus:border-active
        scrollbar-thin scrollbar-rounded
        bg-light text-gray-800 caret-gray-800
      `}
          debounce={500}
          onChange={setRawText}
          defaultValue={exampleText}
        />
        <div className="relative ">
          {showTips && (
            <span
              className={clss(
                "absolute inset-0 grid place-items-center z-[1]",
                "text-xl bg-gray-100/60 text-amber-900 rounded-default",
                "cursor-pointer"
              )}
              onClick={() => setShowTips(false)}
            >
              Click to copy to Clipboard
            </span>
          )}
          <Code
            language={settings?.target === "HTML" ? "markup" : "jsx"}
            className={clss(
              "w-full h-full",
              "border border-default rounded-default overflow-auto",
              "transition duration-200",
              highlightedText && "cursor-pointer"
            )}
            preClass="h-full overflow-x-hidden scrollbar-thin scrollbar-rounded"
            codeClass="whitespace-pre-wrap break-words"
            onClick={() => copyToClipboard(highlightedText)}
            title="Click to copy to clipboard"
          >
            {highlightedText}
          </Code>
          <ClipboardDocumentCheckIcon
            className={clss(
              "absolute right-4 top-2 w-8 h-8 p-1",
              "bg-default fill-active stroke-transparent",
              "border border-active rounded-default",
              copiedToClipboard ? "opacity-50" : "opacity-0",
              "transition duration-700"
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
