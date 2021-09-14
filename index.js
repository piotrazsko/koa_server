// const render = require('./lib/render');
const logger = require("koa-logger");
const router = require("@koa/router")();
const koaBody = require("koa-body");
const cities = require("./responses/cities.json");
const offers = require("./responses/offers.json");
const featuredOffers = require("./responses/offers.json");
const notifications = require("./responses/notifications.json");
const history = require("./responses/history.json");
const upcoming = require("./responses/upcoming.json");

//more
const languages = require("./responses/languages.json");
const external_data = require("./responses/external_data.json");
const term_of_use = require("./responses/term_of_use.json");
const privacy = require("./responses/privacy_policy.json");
const about_app = require("./responses/about_app.json");
const facilities = require("./responses/facilities.json");

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
  .get("/user", getUserResponse)
  .post("/user", getUserResponse)
  .get("/notifications", notificationsResponse)
  .get("/history-visits", historyResponse)
  .get("/upcoming-visits", upcomingResponse)
  .get("/cities", citiesResponse)
  .get("/posts", listResponse)
  .get("/posts", listResponse)
  .get("/featured-offers", featuredOffersResponse)
  .get("/offers", offersResponse)
  .get("/offers-details/:id", offerDetailsResponse)
  .post("/book-visit", bookVisitResponse)
  .get("/languages", languagesResponse)
  .get("/about-app", aboutAppResponse)
  .get("/privacy-policy", privacyResponse)
  .get("/terms-of-use", termOfUseResponse)
  .get("/external-data", extternalResponse)
  .get("/facilities", facilitiesResponse);

app.use(router.routes());

/**
 * Post listing.
 */

const user = {};

async function getUserResponse(ctx) {
  ctx.body = user;
}
async function postUserResponse(ctx) {
  console.log(ctx);
  ctx.body = user;
}
async function listResponse(ctx) {
  ctx.body = { message: "Covid 19: update for visitors" };
}
async function notificationsResponse(ctx) {
  ctx.body = notifications;
}
async function historyResponse(ctx) {
  ctx.body = history;
}
async function upcomingResponse(ctx) {
  ctx.body = upcoming;
}
async function citiesResponse(ctx) {
  ctx.body = cities;
}
async function languagesResponse(ctx) {
  ctx.body = languages;
}
async function aboutAppResponse(ctx) {
  ctx.body = about_app;
}
async function privacyResponse(ctx) {
  ctx.body = privacy;
}
async function termOfUseResponse(ctx) {
  ctx.body = term_of_use;
}
async function extternalResponse(ctx) {
  ctx.body = external_data;
}
async function facilitiesResponse(ctx) {
  ctx.body = facilities;
}

async function bookVisitResponse(ctx) {
  console.log(ctx, ctx.params);
  ctx.body = {
    status: "confirmed",
  };
}
async function offersResponse(ctx) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      ctx.body = offers;
      resolve();
    }, 1000);
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
