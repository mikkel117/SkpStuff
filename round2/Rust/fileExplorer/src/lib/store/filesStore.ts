import { writable, type Writable } from "svelte/store";
import type { dirsType } from "$lib/Types";
export const files: Writable<dirsType[]> = writable([]);



export function updateFiles(fs: dirsType[]){
    files.set(fs)
    
}