var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://in-vitro-470ae.firebaseio.com"
});

const db = admin.firestore()

const Users = require('../components/users/controller')

module.exports = {
    users: new Users(db)
}