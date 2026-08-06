export function openNativePicker(event) {
  const input = event.currentTarget;

  if (input.disabled || input.readOnly || typeof input.showPicker !== "function") {
    return;
  }

  try {
    input.showPicker();
  } catch {
    input.focus();
  }
}
