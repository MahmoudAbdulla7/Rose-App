'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

import { cn } from 'shared/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  /** Grow the textarea to fit its content instead of scrolling. */
  autoResize?: boolean;
};

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    (ref as React.RefObject<T | null>).current = value;
  }
}

function Textarea({
  className,
  autoResize = false,
  maxLength,
  value,
  defaultValue,
  onChange,
  ref,
  ...props
}: TextareaProps) {
  const t = useTranslations('common.textarea');
  const innerRef = React.useRef<HTMLTextAreaElement>(null);

  const lengthOf = React.useCallback(
    (v: typeof value | typeof defaultValue) =>
      v == null ? 0 : String(Array.isArray(v) ? v.join('') : v).length,
    [],
  );

  // Track the count for the uncontrolled case; when controlled, derive it
  // from `value` during render so we never mirror props into state.
  const isControlled = value !== undefined;
  const [uncontrolledCount, setUncontrolledCount] = React.useState(() => lengthOf(defaultValue));
  const count = isControlled ? lengthOf(value) : uncontrolledCount;

  const mergedRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      setRef(ref, node);
    },
    [ref],
  );

  const resize = React.useCallback(() => {
    const el = innerRef.current;
    if (!el || !autoResize) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize]);

  // Keep the auto-resized height in sync with controlled value changes.
  React.useEffect(() => {
    resize();
  }, [resize, value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Safety net on top of the native maxLength attribute (covers programmatic
    // value changes); native enforcement already truncates typing and paste.
    if (maxLength != null && event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
    if (!isControlled) setUncontrolledCount(event.target.value.length);
    resize();
    onChange?.(event);
  };

  const showCount = maxLength != null;

  return (
    <div className="relative w-full">
      <textarea
        ref={mergedRef}
        data-slot="textarea"
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={t('placeholder')}
        className={cn(
          // Layout & Sizing
          'peer flex min-h-37.5 w-full px-2.5 py-2',

          // Border & Background
          'border-ds-border-soft bg-ds-plain rounded-lg border',

          // Typography
          'text-ds-text-plain text-base md:text-sm',

          // Transitions & Outline
          'transition-colors outline-none',

          // Placeholder
          'placeholder:text-ds-text-muted',

          // Hover State
          'hover:border-ds-border-default',

          // Focus State
          'focus-visible:border-ds-primary focus-visible:ring-ds-ring focus-visible:ring',

          // Validation States
          'aria-invalid:border-ds-danger aria-invalid:ring-ds-ring-danger focus-visible:aria-invalid:border-ds-danger focus-visible:aria-invalid:ring-ds-ring-danger aria-invalid:ring',

          // Disabled State
          'disabled:bg-ds-muted disabled:text-ds-text-muted disabled:placeholder:text-ds-text-muted disabled:cursor-not-allowed',

          // Resize Behavior
          autoResize ? 'resize-none overflow-hidden' : 'field-sizing-content',

          // Count Padding
          showCount && 'pb-7',
          className,
        )}
        {...props}
      />
      {showCount && (
        <span
          data-slot="textarea-count"
          aria-hidden="true"
          className="text-ds-text-muted peer-aria-invalid:text-ds-danger pointer-events-none absolute inset-e-2.5 bottom-2 text-xs tabular-nums peer-disabled:opacity-50"
        >
          {t('charCount', { current: count, max: maxLength })}
        </span>
      )}
    </div>
  );
}

export { Textarea };
