import { ChevronUpIcon } from "../../assets/icons";
import { useState } from "react";
import { clss } from "../../utils";

type Props = {
  defaultOpen?: boolean;
  onChange?(open: boolean): void;
  panelPosition?: "top" | "bottom";
};

export default function OptionsButton({
  defaultOpen,
  onChange,
  panelPosition = "bottom",
}: Props) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const onClick = () => {
    setOpen((open) => !open);
    onChange?.(!open);
  };

  return (
    <button
      className={clss(
        "group",
        "w-full p-1 rounded-lg",
        "border outline-0 outline-1 outline-default disabled:outline-disabled", 
        "focus:outline-active focus:outline",
        "flex justify-between items-center gap-4",
      )}
      onClick={onClick}
    >
      <span className="ml-1 pb-0.5">Options</span>
      <ChevronUpIcon
        className={clss(
          "w-5 h-5 mx-1 transition",
          "text-icon group-hover:text-icon-active group-hover:scale-110",
          open ? "rotate-180" : panelPosition === "top" && "rotate-360"
        )}
      />
    </button>
  );
}
