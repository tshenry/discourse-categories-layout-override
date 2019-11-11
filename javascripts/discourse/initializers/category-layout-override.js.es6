import { dasherize } from "@ember/string";
import { withPluginApi } from "discourse/lib/plugin-api";
import CategoryList from "discourse/models/category-list";
import discourseComputed from "discourse-common/utils/decorators";

export default {
  name: "category-layout-override",
  initialize() {
    withPluginApi("0.8", api => {
      api.modifyClass("controller:discovery/categories", {
        @discourseComputed("model.parentCategory")
        categoryPageStyle(parentCategory) {
          let value = this._super();
          if (!this.site.mobileView && !parentCategory) {
            return dasherize(settings.categories_layout);
          }
          return value;
        }
      });

      api.modifyClass("route:discovery.categories", {
        findCategories() {
          let style = !this.site.mobileView && settings.categories_layout;

          let parentCategory = this.get("model.parentCategory");
          if (parentCategory) {
            return CategoryList.listForParent(this.store, parentCategory);
          } else if (style === "categories_and_latest_topics") {
            return this._findCategoriesAndTopics("latest");
          } else if (style === "categories_and_top_topics") {
            return this._findCategoriesAndTopics("top");
          }

          return CategoryList.list(this.store);
        }
      });
    });
  }
};
