const TelegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');

const token = '888124199:AAFTqPy2KsoSU1qcFh3pwHiEKGj_ao1kOJk';
bot = new TelegramBot(token, { polling: true });

const firebaseConfig = {
    apiKey: "AIzaSyD6tNJJOsgBzVnaCsmMY629NgsfQg9_nR0",
    authDomain: "crime-detection-hology.firebaseapp.com",
    databaseURL: "https://crime-detection-hology.firebaseio.com",
    projectId: "crime-detection-hology",
    storageBucket: "",
    messagingSenderId: "911497992385",
    appId: "1:911497992385:web:d755e0cb90c938bc065c40"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
var userId = 543048850;
var userIds = [];

database.ref("/").on("value", (snap) => {
    const result = snap.val();
    const date = result["date"];
    const location = result["location"];
    const status = result["status"];
    const time = result["time"];
    const userIds = result["userId"];

    console.log(status);
    console.log(typeof (userIds));
    console.log(userIds);

    for (let userIdObj in userIds) {
        if (userIds.hasOwnProperty(userIdObj)) {

            let userId = userIds[userIdObj].userId;
            console.log(userId)
            if (status == 1) {
                bot.sendMessage(userId, `Warning !! Telah tertangkap kamera sesorang membawa senjata di ${location} pada tanggal ${date} pukul ${time}`);
            }
        }

    }
});

bot.onText(/\/start/, (msg) => {

    var currentId = msg.from.id;
    database.ref("/userId").push({
        "userId": currentId
    });
});