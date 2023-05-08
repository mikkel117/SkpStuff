import { createResource, createSignal, Show, createEffect } from "solid-js";
import LoadingComponent from "./LoadingComponent";
async function fetchUser(id: number) {
  const slow = await new Promise((res) => setTimeout(res, 3000));
  const test = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return await test.json();
}
function Fetch() {
  const [id, setId] = createSignal(1);

  createEffect(() => {
    console.log(user.loading);
  });

  const [user] = createResource(id, fetchUser);
  return (
    <div>
      <input
        type='number'
        min='1'
        placeholder='Enter Numeric Id'
        onInput={(e) => setId(parseInt(e.currentTarget.value))}
      />
      <Show when={!user.loading} fallback={<LoadingComponent />}>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </Show>
    </div>
  );
}
export default Fetch;
