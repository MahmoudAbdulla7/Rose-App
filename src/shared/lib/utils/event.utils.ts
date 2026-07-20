/** Prevents default browser behavior and stops the event from bubbling. */
export function stopEvent(event: React.SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}
