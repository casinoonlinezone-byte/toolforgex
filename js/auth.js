import { uid } from './helpers.js';
const _users = JSON.parse(localStorage.getItem('users') || '{}');
export function registerUser(email, username, password){
  if(_users[email]) throw new Error('Email already registered');
  _users[email] = { username, password, id: uid() };
  localStorage.setItem('users', JSON.stringify(_users));
}
export function loginUser(email, password, remember=false){
  const user = _users[email];
  if(!user || user.password !== password) throw new Error('Invalid credentials');
  const token = btoa(JSON.stringify({ username: user.username, expiry: Date.now() + (remember?7:1)*24*60*60*1000 }));
  if(remember) localStorage.setItem('authToken', token); else sessionStorage.setItem('authToken', token);
  return user.username;
}
export function getLoggedInUsername(){
  const localToken = localStorage.getItem('authToken');
  const sessionToken = sessionStorage.getItem('authToken');
  try{
    if(localToken){ const dec=JSON.parse(atob(localToken)); if(dec.expiry>Date.now()) return dec.username; localStorage.removeItem('authToken'); }
    if(sessionToken){ const dec=JSON.parse(atob(sessionToken)); if(dec.expiry>Date.now()) return dec.username; sessionStorage.removeItem('authToken'); }
  }catch(e){}
  return 'Guest';
}
export function logout(){ localStorage.removeItem('authToken'); sessionStorage.removeItem('authToken'); }
