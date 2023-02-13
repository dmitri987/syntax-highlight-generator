import {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
// import useMask, { Mask, OnInvalidMask } from "../hooks/useMask";

const clss = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export type InputProps = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  debounce?: number;
  // mask?: Mask;
  // onInvalidMask?: OnInvalidMask;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

/*
 * Usage:
 *
 * --- `debounce`
 * Debounce update of external state by 'debounce' ms
 * Update immediately on 'blur' event (when input looses focus)
 *
 * --- Ref
 * Can forward ref to <input> element underneath
 * Pass all attributes to <input> element
 *
 * --- onChange 
 * onChange has HeadlessUI signature:
 * 'onChange(value: any) => void', not 'onChange(e: Event) => void'
 * 
 *
 *
 *
 */

// TODO: rethink onInvalidMask arguments
function Input(
  {
    defaultValue,
    value,
    onChange,
    onBlur,
    debounce,
    className,
    // mask,
    // onInvalidMask,
    ...inputProps
  }: InputProps,
  externalRef: ForwardedRef<HTMLInputElement>
) {
  const [inputElement, setInputElement] =
    useState<HTMLInputElement | null>(null);
  const debounceId = useRef<NodeJS.Timeout>();

  const onChangeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      clearTimeout(debounceId.current);
      debounceId.current = setTimeout(() => {
        onChange(e.target.value);
      }, debounce ?? 0);
    },
    [debounce, onChange]
  );

  const onBlurHandle = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      clearTimeout(debounceId.current);
      if (onChange) onChange(e.target.value);
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  const bindRef = useCallback(
    (instance: HTMLInputElement) => {
      setInputElement(instance);
      if (!externalRef) return;

      if (externalRef instanceof Function) externalRef(inputElement);
      else externalRef.current = inputElement;
    },
    [externalRef, inputElement]
  );

  useEffect(() => {
    if (value !== undefined && inputElement) inputElement.value = value;
  }, [value, inputElement]);

  // useMask(mask, inputElement, onInvalidMask);

  return (
    <input
      ref={bindRef}
      defaultValue={defaultValue}
      onChange={onChangeHandle}
      onBlur={onBlurHandle}
      className={clss("input-1x5jdmq ", className)}
      {...inputProps}
    />
  );
}

export default forwardRef(Input);
