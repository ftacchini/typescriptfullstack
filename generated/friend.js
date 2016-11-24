"use strict";
const person_1 = require('./person');
const callMessage = "caling friend ";
const hugMessage = "hugging friend: ";
class Friend extends person_1.Person {
    constructor(dni) {
        super(dni);
        this.getHugged = (hugger, say) => {
            console.log(hugMessage + say);
            if (hugger.isBoyfriend) {
                let love = true;
            }
            if (hugger.isBestFriend) {
                var love = false;
            }
            return hugger.isBoyfriend || hugger.isBestFriend;
        };
    }
    call() {
        console.log(callMessage + this.fullName());
    }
}
exports.Buddy = Friend;
//# sourceMappingURL=friend.js.map