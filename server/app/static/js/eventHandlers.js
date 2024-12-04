import { loadChart } from "./chart.js";

export function addChartTypeChangeHandler(chart, chartTypeSelect, endpoint) {
    chartTypeSelect.addEventListener('change', async (event) => {
        const selectedType = event.target.value;

        chart.config.type = selectedType;
        chart.update();

        await loadChart(chart, endpoint);
    });
}