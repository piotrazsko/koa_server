// const render = require('./lib/render');
const logger = require("koa-logger");
const router = require("@koa/router")();
const koaBody = require("koa-body");
const cities = require("./Responses/cities.json");
const offers = require("./Responses/offers.json");
const featuredOffers = require("./Responses/featuredOffers.json");
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
  .get("/", listResponse)
  .get("/cities", citiesResponse)
  .get("/posts", listResponse)
  .get("/posts", listResponse)
  .get("/featured-offers", featuredOffersResponse)
  .get("/offers", offersResponse)
  .get("/offers-details/:id", offerDetailsResponse)
  .post("book-visit", bookVisitResponse);

app.use(router.routes());

/**
 * Post listing.
 */

async function listResponse(ctx) {
  ctx.body = { message: "Covid 19: update for visitors" };
}
async function citiesResponse(ctx) {
  ctx.body = cities;
}
async function bookVisitResponse(ctx) {
  ctx.body = {
    status: "confirmed",
  };
}
async function offersResponse(ctx) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      ctx.body = offers;
      resolve();
    }, 2000);
  });
}

async function offerDetailsResponse(ctx) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      ctx.body = offers.find((i) => i.id == ctx.params.id);
      resolve();
    }, 2000);
  });
}

async function featuredOffersResponse(ctx) {
  ctx.body = featuredOffers;
}

if (!module.parent) app.listen(3000);
