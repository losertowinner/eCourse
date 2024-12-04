import { createChart, loadChart } from "./chart.js";
import { addChartTypeChangeHandler } from "./eventHandlers.js";

window.onload = () => {
    loadAllChart();
    addChartTypeChangeHandler(postCtx, chartTypeSelect, postEndpoint);
    addChartTypeChangeHandler(rankCtx, chartTypeSelect, rankEndpoint);
};

let chartTypeSelect = document.getElementById('chartType');

let postEndpoint = '/statistics/posts/';
let rankEndpoint = '/statistics/rank/';
let postId = document.getElementById('postsChart');
let rankId = document.getElementById('rankChart');
let postCtx = createChart(postId, 'pie');
let rankCtx = createChart(rankId, 'bar');

function loadAllChart() {
    loadChart(postCtx, postEndpoint);
    loadChart(rankCtx, rankEndpoint);
}