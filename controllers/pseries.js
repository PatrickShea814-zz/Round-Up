module.exports = function pseries(list) {
    var p = Promise.resolve();
    return list.reduce(function (pacc, fn) {
      return pacc = pacc.then(fn);
    }, p);
  }