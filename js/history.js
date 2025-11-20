import { safeParse } from './helpers.js';
export let searchHistory = safeParse('searchHistory', []);
export function addSearch(query){ if(!query) return; if(!searchHistory.includes(query)){ searchHistory.push(query); localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); } }
export function deleteSearch(index){ searchHistory.splice(index,1); localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); }
export function clearHistory(){ searchHistory = []; localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); }
