export function createUsageChart(ctx, labels, data, type='bar'){
  if(window.usageChart) window.usageChart.destroy();
  window.usageChart = new Chart(ctx, {
    type,
    data: { labels, datasets: [{ label:'Tool Usage', data, backgroundColor:['#9B1D64','#2ECC71','#1B4F72','#FF6F61','#FFD700','#8E44AD'], borderColor:['#9B1D64','#2ECC71','#1B4F72','#FF6F61','#FFD700','#8E44AD'], borderWidth:1 }] },
    options:{ responsive:true, maintainAspectRatio:false, scales: type==='bar' ? { y:{ beginAtZero:true } } : {} },
    plugins:[ChartDataLabels]
  });
}
export function createActivityChart(ctx, labels, data){
  if(window.activityChart) window.activityChart.destroy();
  window.activityChart = new Chart(ctx,{ type:'bar', data:{ labels, datasets:[{ label:'Activity', data, backgroundColor:['#9B1D64','#2ECC71','#1B4F72'] }] }, options:{ responsive:true, maintainAspectRatio:false }, plugins:[ChartDataLabels] });
}
export function createEarningsLineChart(ctx, labels, data){
  if(window.earnLine) window.earnLine.destroy();
  window.earnLine = new Chart(ctx,{ type:'line', data:{ labels, datasets:[{ label:'Earnings', data, fill:true, tension:0.3 }] }, options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true } } }, plugins:[ChartDataLabels] });
}
export function createEarningsPie(ctx, labels, data){
  if(window.earnPie) window.earnPie.destroy();
  window.earnPie = new Chart(ctx,{ type:'pie', data:{ labels, datasets:[{ data, backgroundColor:['#9B1D64','#2ECC71','#FFD700','#1B4F72'] }] }, options:{ responsive:true } });
}
