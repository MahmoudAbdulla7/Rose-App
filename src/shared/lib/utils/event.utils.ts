/** Prevents default browser behavior and stops the event from bubbling. */
export function stopEvent(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  event.stopPropagation();
}
