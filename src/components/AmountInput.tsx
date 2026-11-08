import {
  useRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type FormEvent,
} from "react";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "value"
  | "defaultValue"
  | "min"
  | "max"
  | "step"
  | "onChange"
  | "onInput"
> & {
  name: string;
  defaultValue?: number;
  min?: number;
  max?: number;
};

const format = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function AmountInput({
  name,
  defaultValue,
  min = 0,
  max = 1_000_000_000_000,
  ...props
}: Props) {
  const initial = defaultValue === undefined ? "" : String(defaultValue);

  const raw = useRef(initial);
  const hidden = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const start = input.selectionStart ?? 0;

    if (start !== input.selectionEnd || input.readOnly) {
      return;
    }

    if (event.key === "Backspace" && input.value[start - 1] === ",") {
      input.setSelectionRange(start - 2, start);
    }
    if (event.key === "Delete" && input.value[start] === ",") {
      input.setSelectionRange(start, start + 2);
    }
  }

  function handleInput(event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;

    if (!/^[\d,]*$/.test(input.value)) {
      input.value = format(raw.current);
      return;
    }

    let count = input.value
      .slice(0, input.selectionStart ?? 0)
      .replace(/,/g, "").length;

    let digits = input.value.replace(/,/g, "");
    const inputType = (event.nativeEvent as InputEvent).inputType;

    if (
      digits === raw.current &&
      input.value !== format(raw.current) &&
      ["deleteContentBackward", "deleteContentForward"].includes(inputType)
    ) {
      const index = count - (inputType === "deleteContentBackward" ? 1 : 0);
      digits = digits.slice(0, index) + digits.slice(index + 1);
      count = Math.max(0, index);
    }

    const normalized = digits.replace(/^0+(?=\d)/, "");

    count = Math.max(0, count - (digits.length - normalized.length));

    raw.current = normalized;

    if (hidden.current) {
      hidden.current.value = normalized;
    }

    input.value = format(normalized);

    let cursor = 0;

    let seen = 0;

    while (cursor < input.value.length && seen < count) {
      if (input.value[cursor] !== ",") {
        seen++;
      }

      cursor++;
    }

    input.setSelectionRange(cursor, cursor);

    const number = Number(normalized);

    const valid =
      !normalized ||
      (Number.isSafeInteger(number) && number >= min && number <= max);

    input.setCustomValidity(
      valid
        ? ""
        : `Nominal harus antara ${format(String(min))} dan ${format(String(max))}.`,
    );
  }

  return (
    <>
      <input
        {...props}
        type="text"
        inputMode="numeric"
        defaultValue={format(initial)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />

      <input
        ref={hidden}
        type="hidden"
        name={name}
        defaultValue={initial}
        disabled={props.disabled}
      />
    </>
  );
}
