<script lang="ts">
  import { Line } from 'svelte-chartjs'
  import type { ChartData } from "chart.js";
  import type { Point } from "node_modules/chart.js/dist/types";
  import { FitbitAPI } from "~/lib/FitbitAPI";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  
  let data: ChartData<"line", (number | Point)[], unknown>;
  $: data;

  let sleep_data : any[] = [];
  FitbitAPI.subscribe(() => {
    loadSleepData(5).then((loaded_data) => {
        sleep_data = loaded_data;
        data = renderTotalTimeAsleep();
        console.log(data)
    });
  });

async function loadSleepData(tracked_days: number){
    let sleep_data = new Array(tracked_days);
    let date = new Date();
    for(let i = 0; i < tracked_days; i++){
        let date_string = FitbitAPI.dateString(date);
        let sleep_data_day = await FitbitAPI.getSleepData(date_string);
        sleep_data[i] = [date_string, sleep_data_day];
        date.setDate(date.getDate() - 1);
    }
    console.log(sleep_data)
    return sleep_data;
}

function renderTotalTimeAsleep(){
    for(let x of sleep_data){
        console.log(x);
    }
    return {
        labels: sleep_data.map((tuple) => tuple[0]),
        datasets: [
            {
                data: sleep_data.map((tuple) => tuple[1]["summary"]["totalMinutesAsleep"]),
            }
        ],
    } as ChartData<"line", (number | Point)[], unknown>;;
}
</script>

<Line
  {data}
  options={{ responsive: true }}
/>
