import { safeParse } from './helpers.js';
export let feedback = safeParse('feedback', []);
export function submitFeedback(item){ feedback.unshift(item); if(feedback.length>500) feedback.length = 500; localStorage.setItem('feedback', JSON.stringify(feedback)); }
export function clearFeedback(){ feedback=[]; localStorage.setItem('feedback', JSON.stringify(feedback)); }
