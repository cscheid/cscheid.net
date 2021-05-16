let baseURL = "https://cscheid.net/js/xss/";

let rules = [
  {
    match: /17lands.com/,
    handler: "17l/main.js"
  }
];

rules.forEach(rule => {
  if (document.URL.match(rule.match)) {
    addScript(baseURL + rule.handler);
  }
});
