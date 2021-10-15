const fs = require("fs");
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://europeanvisitong-default-rtdb.europe-west1.firebasedatabase.app",
});

function setUser(data) {
  let rawdata = fs.readFileSync("user.json");
  let users = JSON.parse(rawdata);
  let savedData = JSON.stringify(data);
  fs.writeFileSync("user.json", savedData);
}

function sendNotification(token) {
  // This registration token comes from the client FCM SDKs.
  const registrationToken = token.trim();

  const message = {
    notification: {
      title: "$FooCorp up 1.43% on the day",
      body:
        "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.",
    },

    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

let users = [
  {
    id: 0,
    email: "test@test.com",
    first_name: "John",
    last_name: "Gold",
    data: "10.10.2021",
    hash: "CEC6A5B064436B39D473772B5BF5985D8B02D5D64EF853AC66CD4A6683D605EC",
    contact_phone: "+375256666666",
  },
  {
    email: "test@test.ru",
    id: 1,
    first_name: "Jack",
    last_name: "Daniels",
    data: "10.10.2021",
    hash: "0B1E5B9806824E71F045D07C03DB1E9959F560FC3ED7E117EC2FD05E0E334EBD",
    contact_phone: "+375256666666",
  },
];

module.exports = {
  registerResponse: async function (ctx) {
    const user = {
      ...ctx.request.body,
      hash: "D135B5130CD6B446693ECB1CFE81E3721F66079F",
    };
    users.push(user);
    ctx.body = user;
  },

  updateUserResponse: async function (ctx) {
    const user = {
      ...ctx.request.body,
    };

    ctx.body = user;
  },
  changePasswordResponse: async function (ctx) {
    ctx.status = 201;
    const data = {
      ...ctx.request.body,
    };
    const reg = /^\S+@\S+\.\S+$/;
    if (reg.test(data.email)) {
      ctx.body = { message: "We send you email with instructions" };
    } else {
      ctx.status = 426;
      ctx.body = {
        message: "Wrong email",
      };
    }
  },

  resetPasswordResponse: async function (ctx) {
    const data = {
      ...ctx.request.body,
    };

    const reg = /^\S+@\S+\.\S+$/;
    if (reg.test(data.email)) {
      ctx.body = { message: "We send you email with instructions" };
    } else {
      ctx.status = 426;
      ctx.body = {
        message: "Wrong email",
      };
    }
  },

  loginResponce: async function (ctx) {
    console.log(ctx.request.body.email);
    const user = users.find((i) => i.email === ctx.request.body.email);
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 426;
      ctx.body = {
        email: "User with this email not found",
      };
    }
  },
  logoutResponce: async function (ctx) {
    ctx.body = {};
  },
  deviceFirebaseResponce: async function (ctx) {
    const data = {
      ...ctx.request.body,
    };
    ctx.body = {
      message: "Success",
    };
    sendNotification(data.token);
  },
};
