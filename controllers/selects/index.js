const group_languages = require("./group_languages.json");
const groupSizes = require("./group_sizes.json");
const cities = require("./cities.json");
const facilities = require("./facilities.json");

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
  falilitiesListResponce: async function (ctx) {
    ctx.body = facilities;
  },
};
