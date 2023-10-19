import { dasherize } from "@ember/string";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  const siteSettings = api.container.lookup("service:site-settings");
  siteSettings.desktop_category_page_style = dasherize(
    settings.categories_layout
  );
});
