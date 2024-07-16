import renderContent from "../renderContent";
import App from "./App.svelte";

document.body.innerHTML=""

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
  new App({
    target: appRoot,
  });
});
