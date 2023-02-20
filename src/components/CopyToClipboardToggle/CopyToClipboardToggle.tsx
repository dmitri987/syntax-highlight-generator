import { clss } from "../../utils";
import Switch from "../Switch/Switch";

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
};
export default function CopyToClipboardToggle(props: Props) {
  return (
    <div className={clss("flex gap-2 items-center")}>
      <label htmlFor="autocopy-to-clipboard" className="grow"
        title="Auto copy to clipboard on any change of text or settings. Allow reading clipboard content in the browser when asked">
        Auto Copy to Clipboard <br />
        <span className="text-sm italic">
          (allow in browser when asked)
        </span>
      </label>
      <Switch
        id="autocopy-to-clipboard"
        className="ui-checked:bg-accent"
        title="Auto copy to clipboard on any change of text or settings. Allow reading clipboard content in the browser when asked"
        {...props}
      />
    </div>
  );
}
