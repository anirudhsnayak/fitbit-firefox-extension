
<script lang="ts">
  import { onMount } from "svelte";
  import logo from "~/assets/logo.svg";
  import { FitbitAPI } from "~/lib/FitbitAPI";
  import FitbitGraph from "./FitbitGraph.svelte";

  let urlParams; 
  let username: string;

onMount(()=>{
  let args = window.location.search;
  urlParams = new URLSearchParams(args)
  let code = urlParams.get("code")!
  FitbitAPI.getAccessToken(code);
  (async () => {
    await FitbitAPI.subscribe();
    let profile = await FitbitAPI.getProfile();
    console.log(profile);
    username = "TEST";
  })();
});

async function set_username(){
  await FitbitAPI.subscribe()
}

function print_sleep_data(){
  FitbitAPI.getSleepData("2024-07-16")
}
</script>

<main class="main">
  <button on:click={print_sleep_data}></button>
  <h1>
    Welcome, {username}
  </h1>
  <FitbitGraph/>
</main>


<style>
  .main{
    background-color: #1a1f1a;
    width: 100vw;
    height: 100vh;
  }
</style>
