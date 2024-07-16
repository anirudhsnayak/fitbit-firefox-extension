<script lang="ts">
      import { onMount } from "svelte";
import PageContent from "~/lib/PageContent.svelte";
import { FitbitAPI } from "~/lib/FitbitAPI";

let urlParams; 
let stored = window.localStorage.getItem("token");
if (stored == null){
  window.localStorage.setItem("token", "test")
}
onMount(()=>{
  let args = window.location.search;
  urlParams = new URLSearchParams(args)
})
function test(){
  FitbitAPI.initializeOAuth()
}
</script>

<main>
  <PageContent> Popup </PageContent>
  <button on:click={test}></button>
  <div>{stored}</div>
</main>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
