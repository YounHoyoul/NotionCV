
export const scrollSmoothlyTo = (id: string) => {
  if(id.startsWith("#")) id = id.replace("#", '');
  const element = document.getElementById(id) as HTMLElement;
  window.scrollTo({
    top: getCoords(element).top,
    left: 0,
    behavior: 'smooth'
  });
}

export const getCoords = (elem: HTMLElement) => { // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}