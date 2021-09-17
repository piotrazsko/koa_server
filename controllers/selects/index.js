const group_languages = require("./group_languages.json");
const groupSizes = require("./group_sizes.json");
const cities = require("./cities.json");

module.exports = {
  groupLanguagesResponce: async function (ctx) {
    ctx.body = group_languages;
  },
  groupSizesResponce: async function (ctx) {
    ctx.body = groupSizes;
  },
  citiesResponce: async function (ctx) {
    ctx.body = cities;
  },
};
