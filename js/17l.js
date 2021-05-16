function installXSSTools()
{
  var s = document.createElement("script");
  s.src = "https://cscheid.net/js/xss/bootstrap.js";
  document.body.appendChild(s);
}

installXSSTools();

