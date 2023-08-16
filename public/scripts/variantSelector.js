const selectRoute = document.getElementById("select-route");

selectRoute.addEventListener("change", function (event) {
  const selectedRoute = event.target.value;

  if (selectedRoute) {
    window.location.href = selectedRoute;
  }
});