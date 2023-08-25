"use strict";
(() => {
  // packages/engine/src/public-api.ts
  var createEngine = () => {
    const engine = document.createElement("div");
    engine.innerText = "ENGINE";
    return engine;
  };

  // packages/builder/src/public-api.ts
  var logBuilder = () => {
    const engine = createEngine();
    console.log(engine.innerText);
    ;
    console.log("HELLO FROM BUILDER!! I Have imported engine with innerText: " + engine.innerText);
  };

  // example/src/example-app.ts
  var e = createEngine();
  var root = document.getElementById("root");
  root.appendChild(e);
  console.log("Update??");
  logBuilder();
})();
//# sourceMappingURL=example-app.js.map
