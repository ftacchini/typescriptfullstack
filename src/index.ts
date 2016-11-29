import * as express from "express";
import { Buddy, IPerson } from "./friend";
import { Person } from "./person";

var app = express();

var matias = new Buddy("434333");
matias.name = "Matias";
matias.lastName = "Berlot";
matias.isBestFriend = false;
matias.age = 1233;
console.log(matias.fullName());

var gise = new Buddy("434333");
gise.name = "Gisella";
gise.lastName = "Tromer";
gise.isBestFriend = true;
gise.age = 29;
gise.call();

gise.getHugged(matias, "thanks for the food");

var randomGuyWalkingDownTheStreet = new Person("How would I know?");
randomGuyWalkingDownTheStreet.age = 60;
randomGuyWalkingDownTheStreet.lastName = "How would I know?";
randomGuyWalkingDownTheStreet.name = "How would I know?";


var friends: IPerson[] = [matias, gise, randomGuyWalkingDownTheStreet];


app.get('/people', function (req: express.Request, res: express.Response) {
  res.send(friends)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
