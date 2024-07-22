
<script lang="ts">
  import { onMount } from "svelte";
  import logo from "~/assets/logo.svg";
  import { FitbitAPI } from "~/lib/FitbitAPI";
  import FitbitGraph from "./FitbitGraph.svelte";

  const logoImageUrl = new URL(logo, import.meta.url).href;

  let urlParams; 

onMount(()=>{
  let args = window.location.search;
  urlParams = new URLSearchParams(args)
  let code = urlParams.get("code")!
  renderGraph(code)
})

async function renderGraph(code: any){
  await FitbitAPI.getAccessToken(code);
}

function print_sleep_data(){
  FitbitAPI.getSleepData("2024-07-16")
}
</script>

<button on:click={print_sleep_data}></button>

<FitbitGraph/>

<style>
  .logo {
    z-index: 99999;
    position: fixed;
    bottom: 20px;
    right: 10px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid #c72a21;
    border-radius: 50%;
    background-color: #fff;
  }

  img {
    position: absolute;
    top: 7px;
  }
</style>
