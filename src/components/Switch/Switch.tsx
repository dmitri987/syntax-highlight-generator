import { Switch } from "@headlessui/react";
import "./Switch.css";

export const clss = (...classes: (string | string[] | false | undefined)[]) =>
  classes.flat().filter(Boolean).join(" ").trim();

type Props = {
  /* pass this to root element */
  className?: string;
  /* Pass this to 'className' of the thumb */
  thumbClass?: string;
  /* In vertical mode switch 'height' and 'width'.
   * Also in inactive state thumb is always down
   */
  vertical?: boolean;
} & Parameters<typeof Switch>[0];

/* Usage:
 *
 * - Styling
 * Dimensions, transition duration and background colors must be
 * set with CSS variables from the following table:
 
  | Full name (use in theme)       | Shortcut (use in `className`) | Default Value |
  |--------------------------------|-------------------------------|---------------|
  | `--switch-width`               | `[--w:3rem]`                  | `3rem`        |
  | `--switch-height`              | `[--h:2rem]`                  | `1.7rem`      |
  | `--switch-transition-duration` | `[--duration:0.5s]`           | `200ms`       |
  | `--switch-track-color`         | `[--track:light-gray]`        | `#888`        |
  | `--switch-track-color-checked` | `[--track-checked:blue]`      | `#2b8a91`     |
  | `--switch-thumb-color`         | `[--thumb:white]`             | `white`       |
  | `--switch-thumb-color-checked` | `[--thumb-checked:#fff]`      | `white`       |

 * Rest of the styles can be set directly in 'className' or 'thumbClass' props.
 *
 * 'vertical' prop will swap 'height' and 'width', 
 * transition direction will become vertical.
 * Active state is always on top.
 *
 * - RTL
 * When `dir="rtl"`, active state is on the left (by default on the right).
 *
 * - State
 * See HeadlessUI Switch component API here: https://headlessui.com/react/switch#switch
 */

export default function MySwitch(
  { vertical, className, thumbClass, ...huiProps }: Props = {} as Props
) {
  return (
    <Switch
      className={clss(
        "switch track-ctwgsjd",
        vertical && "vertical",
        className
      )}
      {...huiProps}
    >
      {({ checked }) => (
        <span
          className={clss(
            "switch thumb-lsujhhbw",
            checked &&
              (vertical
                ? [`-translate-y-[calc(var(--inline-size)-var(--block-size))]`]
                : [
                    `translate-x-[calc(var(--inline-size)-var(--block-size))]`,
                    `rtl:-translate-x-[calc(var(--inline-size)-var(--block-size))]`,
                  ]),
            thumbClass
          )}
        />
      )}
    </Switch>
  );
}
