if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("sw registered");
      console.log(registration);
    })
    .catch((err) => {
      console.log("sw failed");
      console.log(err);
    });
}
