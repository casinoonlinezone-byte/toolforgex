import { safeParse } from './helpers.js';
export let notifications = safeParse('notifications', []);
export function addNotification(message){
  const now=new Date().toLocaleString('en-US',{timeZone:'Asia/Karachi'});
  notifications.unshift({message,timestamp:now,read:false});
  if(notifications.length>50) notifications.pop();
  localStorage.setItem('notifications', JSON.stringify(notifications));
}
export function clearAllNotifications(){ notifications=[]; localStorage.setItem('notifications', JSON.stringify(notifications)); }
export function markRead(i){ if(notifications[i]) notifications[i].read = true; localStorage.setItem('notifications', JSON.stringify(notifications)); }
