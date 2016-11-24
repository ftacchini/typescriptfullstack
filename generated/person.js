"use strict";
class Person {
    constructor(dni) {
        this.dni = dni;
    }
    get lastName() {
        return this.lastNameValue;
    }
    set lastName(value) {
        this.lastNameValue = value;
    }
    fullName() {
        return this.lastName + ", " + this.name;
    }
}
exports.Person = Person;
//# sourceMappingURL=person.js.map