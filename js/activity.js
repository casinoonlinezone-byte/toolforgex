import { safeParse } from './helpers.js';
export let activityLog = safeParse('activityLog', []);
export function logActivity(type, details){
  const now=new Date().toLocaleString('en-US',{timeZone:'Asia/Karachi'});
  activityLog.unshift({type,details,timestamp:now});
  if(activityLog.length>500) activityLog.length=500;
  localStorage.setItem('activityLog', JSON.stringify(activityLog));
}
export function clearActivity(){ activityLog=[]; localStorage.setItem('activityLog', JSON.stringify(activityLog)); }
