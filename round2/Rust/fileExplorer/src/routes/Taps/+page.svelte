<!-- a prosesbar https://svelte.dev/tutorial/tweened  -->

<script>
  import Tab from "./Test.svelte";
  import Taps from "./Taps.svelte";

  let items = [
    {
      label: "tab1",
      value: 1,
      component: Tab,
    },
    {
      label: "tab2",
      value: 2,
      component: Tab,
    },
  ];
</script>

<Taps {items} />
