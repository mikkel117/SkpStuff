import { writable, type Writable } from "svelte/store";


type arrayType = {
    id: number,
    checked: boolean,
}


export const arrayTest: Writable<arrayType[]> = writable([]);

arrayTest.update = (value) => console.log("test ", value);
