const logger = require("koa-logger");
const router = require("@koa/router")();
const cors = require("@koa/cors");

const koaBody = require("koa-body");
const offers = require("./responses/offers.json");
const featuredOffers = require("./responses/offers.json");
const notifications = require("./responses/notifications.json");

//more
const languages = require("./responses/languages.json");
const external_data = require("./responses/external_data.json");
const term_of_use = require("./responses/term_of_use.json");
const privacy = require("./responses/privacy_policy.json");
const about_app = require("./responses/about_app.json");
const facilities = require("./responses/facilities.json");
const {
  groupLanguagesResponce,
  groupSizesResponce,
  citiesResponce,
  falilitiesListResponce,
} = require("./controllers/selects");

// const fetch = require("node-fetch");
//
// fetch("https://dev-brussels-historia.epvisits.com/api/v1/visits/data")
//   .then((res) => res.json())
//   .then((text) => console.log(text));

const { translatesResponse } = require("./controllers/translates");

const {
  historyResponse,
  upcomingResponse,
  deleteVisitsResponse,
  setVisitsFeedbackResponse,
} = require("./controllers/visits");
const { pdfResponse } = require("./controllers/pdf");

const {
  registerResponse,
  loginResponce,
  logoutResponce,
  resetPasswordResponse,
  updateUserResponse,
  changePasswordResponse,
  deviceFirebaseResponce,
} = require("./controllers/auth");

const Koa = require("koa");
const app = (module.exports = new Koa());

app.use(cors());
// "database"

const posts = [];

// middleware

// app.use(bodyParser());
app.use(logger());

// app.use(render);

app.use(koaBody());

// route definitions

router
  .get("/", listResponse)
  //auth
  .post("/login", loginResponce)
  .post("/register", registerResponse)
  .get("/logout", logoutResponce)
  .post("/register-device", deviceFirebaseResponce)
  // user
  .get("/user/:id", getUserResponse)
  .get("/users", getUsersResponse)
  .put("/user/:id", putUserResponse)
  .delete("/user/:id", deleteUserResponse)
  .post("/user", postUserResponse)
  //visits
  .get("/history-visits", historyResponse)
  .delete("/delete-visits/:id", deleteVisitsResponse)
  .get("/upcoming-visits", upcomingResponse)
  .put("/set-feedback", setVisitsFeedbackResponse)
  //notifications
  .get("/notifications", notificationsResponse)
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
  .get("/facilities", facilitiesResponse)
  // selects
  .get("/cities", citiesResponce)
  .get("/facilities-list", falilitiesListResponce)
  .get("/group-languages", groupLanguagesResponce)
  .get("/group-sizes", groupSizesResponce)
  .post("/reset-password", resetPasswordResponse)
  .post("/change-password", changePasswordResponse)
  .patch("/update-user", updateUserResponse)
  //translates
  .get("/translations", translatesResponse)
  .post("/pdf", pdfResponse);

app.use(router.routes());

/**
 * Post listing.
 */

let users = [
  { id: 0, firts_name: "John", last_name: "Gold", data: "10.10.2021" },
  { id: 1, firts_name: "Jack", last_name: "Daniels", data: "10.10.2021" },
];

// user/

async function getUsersResponse(ctx) {
  // console.log(ctx.params);
  ctx.body = users;
}
async function getUserResponse(ctx) {
  // console.log(ctx.params);
  ctx.body =
    users.find((item) => item.id == ctx.params.id) || !ctx.params.id
      ? users[0]
      : ctx.throw(400, "Error Message");
}

async function postUserResponse(ctx) {
  users.push({ id: users.length, ...ctx.request.body });
  ctx.body = users;
}

async function putUserResponse(ctx) {
  users = users.map((item) => {
    return item.id == ctx.params.id ? { ...item, ...ctx.request.body } : item;
  });
  ctx.body = users;
}
async function deleteUserResponse(ctx) {
  users = users.filter((item) => {
    return item.id != ctx.params.id;
  });
  ctx.body = users;
}

async function listResponse(ctx) {
  console.log(ctx.request);
  ctx.body = { message: "Covid 19: update for visitors" };
}
async function notificationsResponse(ctx) {
  ctx.body = notifications;
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
    }, 1000);
  });
}

async function featuredOffersResponse(ctx) {
  ctx.body = featuredOffers;
}

if (!module.parent) app.listen(3001);
