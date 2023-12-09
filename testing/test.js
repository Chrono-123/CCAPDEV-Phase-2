const { default: test, describe, it } = require("node:test");
const { verifyPassword, accountExist, techAccountExist, hashPassword, currentUserStudent, currentUserLabTech, userSearchStudent, userSearchLabTech } = require(`../controllers/testController`);
// const registrationController = require(`../controllers/registrationController`);
// const reservationController = require(`../controllers/reservationController`);
// const { hashPassword, currentUserStudent, currentUserLabTech, userSearchStudent, userSearchLabTech } = require(`../controllers/userController`);
var expect = require('chai').expect

describe('Hashing a password should result in a string with the susbtring "$argon2"', () => {
    it('Hashing a password should result in a string with the susbtring "$argon2"', async function() {
        expect((await hashPassword("sean")).startsWith('$argon2')).to.equal(true);
    });
});

// describe('Searching for the username "sean" in the db as a current student user should be found after logging in as sean as a student user', () => {
//     it('Searching for the username "sean" in the db as a current student user should be found after logging in as sean as a student user', async function() {
//         expect(await currentUserStudent("sean")).to.equal(true);
//     });
// });

// describe('Searching for the username "sean" in the db as a current labtech user should be found after logging in as sean as a labtech user', () => {
//     it('Searching for the username "sean" in the db as a current labtech user should be found after logging in as sean as a labtech user', async function() {
//         expect(await currentUserLabTech("sean")).to.equal(true);
//     });
// });

// describe('Searching for the username "sean" in the db as a student user should be found after registering sean in the db as a student user', () => {
//     it('Searching for the username "sean" in the db as a student user should be found after registering sean in the db as a student user', async function() {
//         expect(await userSearchStudent("sean")).to.equal(true);
//     });
// });

// describe('Searching for the username "sean" in the db as a labtech user should be found after registering sean in the db as a labtech user', () => {
//     it('Searching for the username "sean" in the db as a labtech user should be found after registering sean in the db as a labtech user', async function() {
//         expect(await userSearchLabTech("sean")).to.equal(true);
//     });
// });

describe('Verifying a password should return true if the hashed password is equal to the password', () => {
    it('verifying a password should return true if the hashed password is equal to the password', async function() {
        // var password = "sean";
        // var hashPassword = expect(await hashPassword(password));
        // console.log(hashPassword);
        expect(await verifyPassword((await hashPassword("sean")), "sean")).to.equal(true);
    });
});

// describe('Searching for the username "sean" in the db as a student user should be found after registering sean in the db as a student user', () => {
//     it('Searching for the username "sean" in the db as a student user should be found after registering sean in the db as a student user', async function() {
//         expect(await accountExist("sean")).to.equal(true);
//     });
// });

// describe('Searching for the username "sean" in the db as a labtech user should be found after registering sean in the db as a labtech user', () => {
//     it('Searching for the username "sean" in the db as a labtech user should be found after registering sean in the db as a labtech user', async function() {
//         expect(await techAccountExist("sean")).to.equal(true);
//     });
// });