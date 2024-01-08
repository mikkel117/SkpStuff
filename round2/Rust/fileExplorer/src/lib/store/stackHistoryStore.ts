import { writable, type Writable } from "svelte/store";
import { invoke } from "@tauri-apps/api/tauri";
export const stackHistory: Writable<string[]> = writable(["HomeDir"]);
export const forwardHistory: Writable<string[]> = writable([]);

export function removeLastPath() {
  stackHistory.update((value) => {
    value.pop();
    return value;
  });
}

export function addToStackHistory(path: string) {
  stackHistory.update((value) => {
    value.push(path);
    return value;
  });
}

export function addToForwardHistory(path: string) {
  forwardHistory.update((value) => {
    value.push(path);
    return value;
  });
}

export function removeFromForwardHistory() {
  forwardHistory.update((value) => {
    value.pop();
    return value;
  });
}

/* stackHistory.subscribe((value) => {
    console.log(value);
}) */
