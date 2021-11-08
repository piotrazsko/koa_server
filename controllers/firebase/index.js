const fs = require("fs");
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://europeanvisitong-default-rtdb.europe-west1.firebasedatabase.app",
});
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

module.exports = {
  deviceFirebaseResponce: async function (ctx) {
    const data = {
      ...ctx.request.body,
    };
    ctx.body = {
      message: "Success",
    };
    console.log(data.token);
    sendNotification(data.token);
    setTimeout(() => {
      sendNotification(data.token);
    }, 10000);
  },
};
