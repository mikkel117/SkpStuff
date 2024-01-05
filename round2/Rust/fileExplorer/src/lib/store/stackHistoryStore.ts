import { writable, type Writable } from "svelte/store";
  import { invoke } from "@tauri-apps/api/tauri";
export const stackHistory: Writable<string[]> = writable([
    "HomeDir"
]);

export function removeLastPath() {
stackHistory.update(value => {
    value.pop();
    return value;
})
}

export function addToStackHistory(path: string) {
    stackHistory.update(value => {
        value.push(path);
        return value;
    })
}

/* stackHistory.subscribe((value) => {
    console.log(value);
}) */