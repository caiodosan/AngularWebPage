$("#prev").click(function () {
  let pageValueDecrement = Number(document.getElementById("pagenum").value) - 1;

  if (pageValueDecrement <= 0) {
    pageValueDecrement = 1;
  }

  localStorage.setItem("pagenum", pageValueDecrement);
  window.location.search = `pagenum=${pageValueDecrement}&pagesize=${limitValue}`;
});

$("#next").click(function() {
  const pageValueIncrement = Number(document.getElementById("pagenum").value) + 1;

  localStorage.setItem("pagenum", pageValueIncrement);
  window.location.search = `pagenum=${pageValueIncrement}&pagesize=${limitValue}`;
});

function carregar() {
  document.getElementById("pagenum").value = localStorage.getItem("pagenum");
  document.getElementById("pagesize").value = localStorage.getItem("pagesize");
}
function submeter() {
  localStorage.setItem("pagenum",document.getElementById("pagenum").value);
  localStorage.setItem("pagesize",document.getElementById("pagesize").value);
}
