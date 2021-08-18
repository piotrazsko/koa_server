// const render = require('./lib/render');
const logger = require("koa-logger");
const router = require("@koa/router")();
const koaBody = require("koa-body");
const cities = require("./responces/cities.json");
const offers = require("./responces/offers.json");
const featuredOffers = require("./responces/featuredOffers.json");
const Koa = require("koa");
const app = (module.exports = new Koa());

// "database"

const posts = [];

// middleware

app.use(logger());

// app.use(render);

app.use(koaBody());

// route definitions

router
  .get("/", listResponce)
  .get("/cities", citiesResponce)
  .get("/posts", listResponce)
  .get("/posts", listResponce)
  .get("/featured-offers", featuredOffersResponce)
  .get("/offers", offersResponce);

app.use(router.routes());

/**
 * Post listing.
 */

async function listResponce(ctx) {
  ctx.body = { message: "Covid 19: update for visitors" };
}
async function citiesResponce(ctx) {
  ctx.body = cities;
}
async function offersResponce(ctx) {
  ctx.body = offers;
}
async function featuredOffersResponce(ctx) {
  ctx.body = featuredOffers;
}

if (!module.parent) app.listen(3000);
