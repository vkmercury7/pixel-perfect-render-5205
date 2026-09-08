const CHAT_OPEN_EVENT = "thehills:open-chat";

export function openChat() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}

export function onOpenChat(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHAT_OPEN_EVENT, handler);
  return () => window.removeEventListener(CHAT_OPEN_EVENT, handler);
}
