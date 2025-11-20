import { safeParse, downloadBlob } from './helpers.js';
import { logActivity } from './activity.js';
import { createEarningsLineChart, createEarningsPie } from './charts.js';
export let earnings = safeParse('earnings', []);
export function addEarning(entry){ entry.id = entry.id || Date.now().toString(36); earnings.unshift(entry); if(earnings.length>500) earnings.length = 500; localStorage.setItem('earnings', JSON.stringify(earnings)); logActivity('settings', Added earning  ()); }
export function deleteEarning(id){ earnings = earnings.filter(e => e.id !== id); localStorage.setItem('earnings', JSON.stringify(earnings)); }
export function clearEarnings(){ earnings=[]; localStorage.setItem('earnings', JSON.stringify(earnings)); }
export function exportEarningsCSV(){ let csv='Date,Source,Category,Clicks,Conversions,Amount\n'; earnings.forEach(e=>{ csv += ${e.date},"",,,,\n; }); downloadBlob('earnings.csv', csv); }
export function getMonthlyTotals(){ const map = {}; earnings.forEach(e=>{ const m = e.date.slice(0,7); map[m] = (map[m]||0) + Number(e.amount); }); const labels = Object.keys(map).sort(); const data = labels.map(k=>map[k]); return { labels, data }; }
export function getCategoryTotals(){ const map = {}; earnings.forEach(e=>{ map[e.category] = (map[e.category]||0) + Number(e.amount); }); const labels = Object.keys(map); const data = labels.map(k=>map[k]); return { labels, data }; }
export function renderEarningsTable(tbody){ tbody.innerHTML=''; earnings.forEach(e => { const tr = document.createElement('tr'); tr.innerHTML = <td></td><td></td><td></td><td></td><td></td><td></td><td><button class="btn btn-secondary small" data-id="">Delete</button></td>; tbody.appendChild(tr); }); }
export function updateEarningsCharts(lineCtx, pieCtx){ const monthly = getMonthlyTotals(); const cat = getCategoryTotals(); createEarningsLineChart(lineCtx, monthly.labels, monthly.data); createEarningsPie(pieCtx, cat.labels, cat.data); }
