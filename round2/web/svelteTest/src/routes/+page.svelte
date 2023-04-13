<script lang="ts">
    import { shapes }  from "./Info.svelte";
    import Info from "./Info.svelte";
    console.log(shapes); 
</script>

<Info color="blue" />


<style>
    :global(body) {
        background-color: #232946;
        color: white;
    }
</style>