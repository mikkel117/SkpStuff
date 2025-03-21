import { createResource, createSignal, Show, createEffect } from "solid-js";
import LoadingComponent from "~/components/LoadingComponent";
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
      <Show when={!user.loading} fallback={<LoadingComponent />}>
        <div>Name : {user().name}</div>
        <div>Username : {user().username}</div>
        <div>Email : {user().email}</div>
        <div>Phone : {user().phone}</div>
        <div>Website : {user().website}</div>
      </Show>
    </div>
  );
}
export default Fetch;
