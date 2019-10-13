import App from "./content/App.svelte";

function setup() {
  console.log("setup");
  const target = document.querySelector("[data-project-hovercards-enabled]");

  if (!target) {
    return;
  }
  console.log("content");

  const app = new App({
    anchor: target.firstChild,
    target
  });

  app.port.onMessage.addListener(function({ type, data }) {
    switch (type) {
      case "templates":
        app.$set({ templates: data });
        break;
      default:
        break;
    }
  });

  app.postMessage({ type: "ready", data: window.location.href });
}

chrome.runtime.onMessage.addListener(function({ type }, sender, sendResponse) {
  switch (type) {
    case "onCompare":
      setup();
      // sendResponse('onCompare received');
      // app.postMessage({ type: 'ready', data: window.location.href });
      break;
  }
});

// export default app;
