"use strict";
const express = require("express");
const friend_1 = require("./friend");
const person_1 = require("./person");
var app = express();
var matias = new friend_1.Buddy("434333");
matias.name = "Matias";
matias.lastName = "Berlot";
matias.isBestFriend = false;
matias.age = 1233;
console.log(matias.fullName());
var gise = new friend_1.Buddy("434333");
gise.name = "Gisela";
gise.lastName = "Tromer";
gise.isBestFriend = true;
gise.age = 29;
gise.call();
gise.getHugged(matias, "thanks for the food");
var randomGuyWalkingDownTheStreet = new person_1.Person("How would I know?");
randomGuyWalkingDownTheStreet.age = 60;
randomGuyWalkingDownTheStreet.lastName = "How would I know?";
randomGuyWalkingDownTheStreet.name = "How would I know?";
var friends = [matias, gise, randomGuyWalkingDownTheStreet];
app.get('/people', function (req, res) {
    res.send(friends);
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=index.js.map