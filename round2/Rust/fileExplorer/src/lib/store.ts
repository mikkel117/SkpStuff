import { writable, type Writable } from "svelte/store";

export const stackHistory: Writable<string[]> = writable([
    "HomeDir"
]);

/* stackHistory.subscribe((value) => {
    console.log(value);
}) */