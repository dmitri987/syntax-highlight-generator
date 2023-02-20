


type MaybeClassName = string | false | null | undefined;
export const clss = (...classes: (MaybeClassName | MaybeClassName[])[]) =>
  classes.flat().filter(Boolean).join(" ").trim();
