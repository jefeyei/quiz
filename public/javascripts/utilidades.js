function formatearFecha(milliseconds) {
  if (milliseconds) {
    var date = new Date(+milliseconds);
    var fec = date.getFullYear() + "-" +
              dosCifras(date.getMonth() + 1) + "-" +
              dosCifras(date.getDate()) + " " +
              dosCifras(date.getHours()) + ":" +
              dosCifras(date.getMinutes()) + ":" +
              dosCifras(date.getSeconds());
    return fec;
  } else {
    return "";
  }
};

function dosCifras(cifra) {
  if (cifra < 10) {
    return "0" + cifra;
  }
  return cifra;
}
