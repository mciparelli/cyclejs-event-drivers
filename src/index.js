export const preventDefault = events$ =>
  events$.subscribe(ev => ev.preventDefault());

export const stopPropagation = events$ =>
  events$.subscribe(ev => ev.stopPropagation());
