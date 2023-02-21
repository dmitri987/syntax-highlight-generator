import useFilter from "../../hooks/useFilter";
import { useCallback, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ArrowDownCircleIcon,
  ExclamationCircleIcon,
} from "../../assets/icons";
import { clss } from "../../utils";
import useLanguages, {
  Language,
  loadLanguage,
} from "../../hooks/useLanguages/useLanguages";
import useScroll from "../../hooks/useScroll/useScroll";

type EngineBadgeProps = {
  engine?: "prism" | "hljs";
  className?: string;
};

function EngineBadge({ engine, className }: EngineBadgeProps) {
  if (!engine) return null;

  return (
    <span
      className={clss(
        `rounded px-2 pt-0 pb-0.5`,
        engine === "hljs" ? "bg-hljs-dark" : "bg-prism-dark",
        className
      )}
    >
      {engine}
    </span>
  );
}

type LanguageSelectorProps = {
  language?: Language | null;
  onChange: (newLanguage: Language | null) => void;
};

const ITEMS_PER_PAGE = 12;

let online = true;
let languages: Language[];

function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const allLanguages = useLanguages();
  const [inputElement, setInputElement] =
    useState<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [innerLanguage, setInnerLanguage] = useState<Language | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [optionsElement, setOptionsElement] =
    useState<HTMLUListElement | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const { yProgress = 0 } = useScroll({
    container: optionsElement,
    axis: "y",
    throttle: 100,
  });

  useEffect(() => {
    if (yProgress > 0.9) {
      setPageCount((pageCount) => pageCount + 1);
    }
  }, [yProgress]);

  useEffect(() => setPageCount(1), [query]);

  useEffect(() => {
    const hotKey = (e: KeyboardEvent) => {
      if (e.code === "Slash" && e.ctrlKey) {
        inputElement?.focus();
      }
    };
    window.addEventListener("keyup", hotKey);
    return () => window.removeEventListener("keyup", hotKey);
  }, [inputElement]);

  useEffect(() => {
    if (!language || language === innerLanguage) return;

    setInnerLanguage(language);
  }, [language]);

  useEffect(() => {
    if (innerLanguage !== language) onChange(innerLanguage);
  }, [innerLanguage]);

  const selectLanguage = useCallback((lang: Language | null) => {
    loadLanguage(lang)
      .then((language) => {
        setInnerLanguage(language);
        setShowOptions(!language);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // setShowOptions(true);
  };

  if (navigator.onLine) {
    languages = allLanguages;
    online = true;
  } else {
    languages = online
      ? allLanguages.filter((lng) => lng.registered)
      : languages;
    online = false;
  }

  let filteredList = useFilter(query, languages, {
    stringifyFn: (lang) => lang.name,
  });

  return (
    <Combobox value={innerLanguage} onChange={selectLanguage}>
      <div
        className={clss("relative grid items-center min-w-[40%] w-full z-20")}
      >
        <div className="relative grid items-center">
          <Combobox.Input
            ref={setInputElement}
            className={clss(
              "w-full p-2 text-left rounded-lg",
              "border outline-0 outline-default disabled:outline-disabled",
              "bg-white text-gray-800 caret-gray-800",
              "focus:outline-1 focus:outline-active"
            )}
            displayValue={() => query}
            onChange={onInputChange}
            onFocus={() => {
              setShowOptions(true);
              setLoadingError(false);
            }}
            onClick={() => setShowOptions(true)}
            onBlur={() => setShowOptions(false)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.code === "ArrowDown" && !showOptions) {
                e.preventDefault();
                setShowOptions(true);
                return;
              }

              if (e.code === "Escape") {
                e.preventDefault();
                if (showOptions) {
                  setShowOptions(false);
                } else {
                  setQuery("");
                }
                return;
              }
            }}
            placeholder="Press 'Ctrl + /' to search language"
            autoComplete="off"
          />
          <div className="absolute flex content-center items-center gap-2 right-2 justify-right">
            {isLoading && (
              <span
                className={clss(
                  "inline-block w-5 h-5 mx-2 rounded-full",
                  "border-2 border-t-0 border-r-0 animate-spin",
                  innerLanguage?.engine === "hljs"
                    ? "outline-hljs-active"
                    : "outline-prism-active"
                )}
              ></span>
            )}
            {loadingError && (
              <ExclamationCircleIcon
                className="w-5 h-5 mx-2 fill-transparent stroke-red-700 stroke-1"
                title="Language loading error. See Console Log (F12) for details"
              />
            )}
            {query && (
              <>
                <XMarkIcon
                  className={clss(
                    "w-5 h-5 cursor-pointer",
                    "text-icon-muted hover:text-icon-active hover:scale-110"
                  )}
                  aria-hidden="true"
                  onClick={() => {
                    setQuery("");
                    inputElement?.focus();
                  }}
                />
              </>
            )}
          </div>
        </div>

        {filteredList && (
          <Transition
            show={showOptions}
            unmount={false}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options
              ref={setOptionsElement}
              static
              className={clss(
                "absolute translate-y-1 rounded-default w-full bg-default",
                "scrollbar-thin scrollbar-rounded",
                "border-2 outline-0 outline-active",
                "h-[200px] overflow-auto"
              )}
            >
              {filteredList.slice(0, pageCount * ITEMS_PER_PAGE).map((lang) => (
                <Combobox.Option
                  key={lang.name + "-" + lang.engine}
                  className={clss(
                    "grid grid-cols-[1fr_2rem_5rem] items-center px-2 py-1 border-b",
                    "text-gray-800 cursor-pointer",
                    lang.engine === "hljs"
                      ? [
                          lang.registered && "bg-hljs-light",
                          "hover:bg-hljs ui-active:bg-hljs-dark",
                        ]
                      : [
                          lang.registered && "bg-prism-light",
                          "hover:bg-prism ui-active:bg-prism-dark",
                        ]
                  )}
                  value={lang}
                >
                  <span className="">{lang.name}</span>
                  {!lang.registered ? (
                    <ArrowDownCircleIcon
                      className={clss("w-5 h-5", "text-icon-muted")}
                      aria-hidden="true"
                    />
                  ) : (
                    <span></span>
                  )}
                  <EngineBadge
                    engine={lang.engine}
                    className="justify-self-end"
                  />
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        )}
      </div>
    </Combobox>
  );
}

export default LanguageSelector;
