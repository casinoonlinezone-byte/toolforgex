import { safeParse } from './helpers.js';
export const tools = [
  {name: 'Inventra', category: 'amazon', description: 'Inventory management tool', icon: 'fa-box'},
  {name: 'PriceNovaX', category: 'amazon', description: 'Price tracking tool', icon: 'fa-tags'},
  {name: 'SEORank', category: 'seo', description: 'SEO ranking tool', icon: 'fa-chart-line'},
  {name: 'AdVanta', category: 'amazon', description: 'Advanced ad optimization tool', icon: 'fa-bullhorn'},
  {name: 'Trendoria', category: 'marketing', description: 'Trend analysis tool', icon: 'fa-line-chart'},
  {name: 'MarketInsight', category: 'research', description: 'Market research tool', icon: 'fa-search'}
];
export let usageCounts = safeParse('usageCounts', tools.reduce((acc,t)=>{acc[t.name]=0;return acc;},{}));
export let favorites = safeParse('favorites', []);
export function saveUsage(){ localStorage.setItem('usageCounts', JSON.stringify(usageCounts)); }
export function saveFavorites(){ localStorage.setItem('favorites', JSON.stringify(favorites)); }
