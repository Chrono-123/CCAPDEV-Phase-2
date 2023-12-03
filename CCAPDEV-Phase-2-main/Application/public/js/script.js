//button pressed tag
// const toLoginBtn = document.querySelector('#toLoginBtn'); //Goes to Login page (account)
// const toRegBtn = document.querySelector('#toRegBtn'); //goes to register page (account)
const login = document.querySelector('#login'); //logs into account
const register = document.querySelector('#register'); //registers account
// const lab = document.querySelector('.Lab');
// const lab1 = document.querySelector('#lab1'); //goes to lab 1
// const lab2 = document.querySelector('#lab2'); //goes to lab 2
// const lab3 = document.querySelector('#lab3'); //goes to lab 3
// const back = document.querySelector('#back'); //goes back a page (basing on history)
// const reserveOptions = document.querySelector('.Reservation'); //goes to reserve options (reserve, edit, delete, view, etc.)
// const reserve = document.querySelector('#reserveBtn'); //goes to page to reserve slots
// const confirmReservation = document.querySelector('#reserveSlot'); //confirms reservation

// for hiding and showing password field
const eye = document.querySelector('#eye');
const pw = document.querySelector('#profilePassword');

//error message tag
const loginError = document.querySelector('#loginError'); //error if user logs in with invalid information (account)
const regError = document.querySelector('#regError'); //error if user registers with invalid information (account)
// const reserveError = document.querySelector('#reserveError'); //error if reserving with invalid information (reservation)

//form tag
const logForm = document.forms.loginForm; //Login Form
const regForm = document.forms.regForm; //Registration Form
// const reserveForm = document.forms.reserveForm; //Reservation Form

login?.addEventListener("click", async function(e){ //confirms login
    e.preventDefault();
    const formData = new FormData(logForm);
    const data = {};
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1];
    };
    console.log(data);
    const json = JSON.stringify(data);
    try{
        const response = await fetch('/checkUser', {
            method: 'POST',
            body: json,
            headers: {

                'Content-Type': 'application/json'

            }
        });
        console.log(response);
        console.log(response.statusText);
        if(response.status === 200){
            if(response.statusText == "student") {
                console.log("i am the student");
                location.href = 'http://localhost:3000/home';
            } else if(response.statusText == "labTech") {
                location.href = 'http://localhost:3000/labTechHome';
            }
            console.log("Logged in.");
        } else if(response.status === 400){
            loginError.innerText = 'Invalid Username or password';
        }
    }catch(err){
        console.error(err);
        console.log('No Accounts Existing');
    }
});

register?.addEventListener("click", async function(e){ //confirms registration
    e.preventDefault();
    const formData = new FormData(regForm);
    const data = {};
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1];
    };
    console.log(data);
    const json = JSON.stringify(data);
    try{
        const response = await fetch('/registerUser',{
            method:'POST',
            body: json,
            headers: {

                'Content-Type': 'application/json'

            }
        });
        console.log(response);
        if (response.status == 200){
            console.log("Account Added.");
            location.href = 'http://localhost:3000/';
        }else{
            regError.innerText = 'You are missing one or more required item/s.';
        }
    }catch(err){
        console.error(err);
        console.log('Unable to make Account.');
    }
});

eye.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash")
    const type = pw.getAttribute("type") === "password" ? "text" : "password"
    pw.setAttribute("type", type)
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// lab2?.addEventListener("click", async function(e){ 
//     e.preventDefault();
//     const formData = new FormData(logForm);
//     const data = {};
//     for (let entry of formData.entries()) {
//         data[entry[0]] = entry[1];
//     };
//     console.log(data);
//     console.log("in lab 2 event listener");
//     const json = JSON.stringify(data);
//     try{
//         const response = await fetch('/reserve', {
//             method: 'POST',
//             body: json,
//             headers: {

//                 'Content-Type': 'application/json'

//             }
//         });
//         console.log(response);
//         console.log(response.statusText);
//         if(response.status === 300){
//             loginError.innerText = 'One or more missing fiels';
//         } else if(response.status === 400){
//             loginError.innerText = 'Seat already taken';
//         }
//     }catch(err){
//         console.error(err);
//         console.log('No Accounts Existing');
//     }
// });
// confirmReservation?.addEventListener("click", async function(e){
//     e.preventDefault();
//     const formData = new formData(reserveForm);
//     const data = {};
//     for (let entry of formData.entries()){
//         data[entry[0]] = entry[1];
//     };
//     console.log(data);
//     const json = JSON.stringify(data);
    
//     try{
//         const response = await fetch('/ReserveSlot', {
//             method: 'POST',
//             body: json
//         });
//     }catch(err){
//         console.error(err);
//         console.log('Unable to reserve.');
//     }
// });
