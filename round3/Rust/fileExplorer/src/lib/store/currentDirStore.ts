
import { writable, type Writable } from "svelte/store";

export const currentDir: Writable<string> = writable("HomeDir");

export function updateCurrentDir(newDir: string) {
currentDir.set(newDir);
}