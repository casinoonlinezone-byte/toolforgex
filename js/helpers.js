export function formatCurrency(amount){
  return Number(amount).toLocaleString('en-US',{style:'currency',currency:'USD'});
}

export function uid(){ 
  return Math.random().toString(36).slice(2,9); 
}

export function downloadBlob(filename, content, type='text/csv;charset=utf-8;'){
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function safeParse(key, fallback){
  try{ return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch(e){ return fallback; }
}
