import { writable, type Writable } from "svelte/store";

export const stackHistory: Writable<string[]> = writable([
    "C:\\Users\\rumbo"
]);

stackHistory.subscribe((value) => {
    console.log(value);
})