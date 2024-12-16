import { fetchData, generateRandomColor, options } from "./utils.js";

export function createChart(ctx, type) {
    return new Chart(ctx, {
        type: type,
        options: options,
    });
}


export async function loadChart(chart, endpoint) {
    const jsonResponse = await fetchData(endpoint);

    if (!jsonResponse) return;

    console.log(jsonResponse);

    const title = jsonResponse.title;
    const labels = jsonResponse.data.labels;
    const datasets = jsonResponse.data.datasets;

    chart.data.datasets = [];
    chart.data.labels = [];

    chart.options.plugins.title.text = title;
    chart.options.plugins.title.display = true;

    chart.data.labels = labels;

    datasets.backgroundColor = generateRandomColor();
    datasets.borderColor = generateRandomColor(0.7);

    datasets.forEach((dataset) => {
        chart.data.datasets.push(dataset);
    });

    chart.update();
}