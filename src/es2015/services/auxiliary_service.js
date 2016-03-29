logger = () => {
  console.log(`time.h = ${data.time.h}`);
  console.log(`time.m = ${data.time.m}`);
  console.log(`time.s = ${data.time.s}`);
  console.log(`timeInSec = ${data.timeInSec}`);
};
classFnc = {
  add(o, c) {
    let re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    if (re.test(o.className)) return
    o.className = (`${o.className} ${c}`).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
  },
  remove(o, c) {
    let re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
  }
};
addEvent = (object, type, callback) => {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent(`on${type}`, callback);
  } else {
    object[`on${type}`] = callback;
  }
};
addZero = (i) => {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
};