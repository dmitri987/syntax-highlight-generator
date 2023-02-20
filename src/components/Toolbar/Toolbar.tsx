import { useCallback, useEffect, useState } from "react";
import { Options } from "../../../libs/syntax-highlight";
import useLanguages, {Language} from "../../hooks/useLanguages/useLanguages";
import { clss } from "../../utils";
import CopyToClipboardToggle from "../CopyToClipboardToggle/CopyToClipboardToggle";
import LanguageSelector, {
} from "../LanguageSelector/LanguageSelector";
import OptionsButton from "../OptionsSelector/OptionsButton";
import OptionsPanel, {
  OptionsWithoutLanguage,
} from "../OptionsSelector/OptionsPanel";
import RecentLanguages from "../RecentLanguages/RecentLanguages";
import TargetSelector, { Target } from "../TargetSelector/TargetSelector";

export type Settings = Options & {
  target: Target;
  autocopyToClipboard: boolean;
};

type Props = {
  onChange(settings: Settings): void;
  className?: string;
};

// const exampleLanguages = useLanguages()
//   .filter(lng => lng.registered)
//   .filter(lng => lng.name === 'javascript')

export default function Toolbar({ onChange, className }: Props) {
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);
  const [optionsWithoutLanguage, setOptionsWithoutLanguage] =
    useState<OptionsWithoutLanguage>({});
  const [currentLanguage, setCurrentLanguage] = useState<Language|null>(null);
  const [recentLanguages, setRecentLanguages] = useState<Language[]>([]);
  const [target, setTarget] = useState<"JSX" | "HTML">("JSX" as const);
  const [autocopyToClipboard, setAutocopyToClipboard] = useState(false);

  const enterLanguage = useCallback((language: Language | null) => {
    if (!language) return;
    setCurrentLanguage(language);

    const RECENTS_SIZE = 8;
    setRecentLanguages((recentLanguages) =>
      [language, ...recentLanguages.filter((lang) => lang !== language)].slice(
        0,
        RECENTS_SIZE
      )
    );
  }, []);

  useEffect(
    function returnNewSettings() {
      onChange({
        parsingEngine: currentLanguage?.engine,
        language: currentLanguage?.name,
        ...optionsWithoutLanguage,
        target,
        autocopyToClipboard
      });
    },
    [currentLanguage, optionsWithoutLanguage, target, autocopyToClipboard]
  );

  return (
    <div className={clss("grid gap-6", className)}>
      <OptionsPanel
        open={showOptionsPanel}
        onChange={setOptionsWithoutLanguage}
        className={clss("")}
      />
      <div
        className={clss(
          "w-full px-0 mx-0 z-10",
          "grid grid-cols-1 md:grid-cols-[auto_minmax(280px,1fr)_auto_auto] gap-5 justify-between",
          "items-center"
        )}
      >
        <OptionsButton
          defaultOpen={false}
          onChange={setShowOptionsPanel}
          panelPosition="top"
        />
        <LanguageSelector language={currentLanguage} onChange={enterLanguage} />
        <TargetSelector value={target} onChange={setTarget} />
        <CopyToClipboardToggle
          checked={autocopyToClipboard}
          onChange={setAutocopyToClipboard}
        />
      </div>
      <RecentLanguages
        recentLanguages={recentLanguages}
        selectedLanguage={currentLanguage}
        onChange={setCurrentLanguage}
      />
    </div>
  );
}
