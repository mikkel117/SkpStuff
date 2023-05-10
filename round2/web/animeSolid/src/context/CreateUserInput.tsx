import { createRoot, createSignal } from "solid-js";

function CreateUserInput() {
  const [userInput, setUserInput] = createSignal<string>("");
  return { userInput, setUserInput };
}
export default createRoot(CreateUserInput);
