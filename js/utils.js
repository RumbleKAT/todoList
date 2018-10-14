function ascendingDate(prev, next) {
  let prevDate = new Date(prev.date).getTime();
  let nextDate = new Date(next.date).getTime();
  return prevDate > nextDate ? 1 : -1;
}

function descendingDate(prev, next) {
  let prevDate = new Date(prev.date).getTime();
  let nextDate = new Date(next.date).getTime();
  return prevDate < nextDate ? 1 : -1;
}

function idSorting(prev,next){
  return prev.id < next.id ? 1 : -1;
}
