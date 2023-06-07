const form = document.getElementById('form')
const username = document.getElementById('Username')
const mail = document.getElementById('Mail')
const phone = document.getElementById('Phone')
const password = document.getElementById('Password')
const re_password = document.getElementById('Re-Password')
const allCorrect = document.getElementById('correct')
const inCorrect = document.getElementById('incorrect')


function error(e, message) {
    // e.classList.add('is-invalid')
    e.className = 'form-control is-invalid';
    const div = e.nextElementSibling;
    div.innerText = message;
    // div.classList.add('invalid-feedback')
    div.className = 'invalid-feedback';
}
function success(e) {
    e.className = 'form-control is-valid';
}


//Email Control
const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        success(input);
        return true;
    } else {
        error(input, "Invalid email format.");
        return false;
    }
};
function checkRequired(inputs) {
    inputs.forEach(function (input) {
        if (input.input.value === '') {
            var message = input.message + "is not empty";
            error(input.input, message);
        } else {
            success(input.input);
        }
    });
}

//Username Input control
function checkLength(input, max, min) {

    if (input.value.length < min) {

        error(input, `${input.id} must be at least ${min} characters.`)
        return false
    }
    else if (input.value.length > max) {
        error(input, `${input.id}  must be at most ${max}  characters.`)
        return false

    }
    else {
        success(input)
        return true;
    }
}
//Password and re_password control
function checkRePassword(password, re_password) {
    if (password.value !== re_password.value) {
        error(re_password, `${re_password.id} It does not match the password.`)
        return false;
    } else if (password.value === "" || re_password.value === "") {//if password or re_password is empty, send an error message
        return false;
    } else {//if everythink is correct...
        return true;
    }

}

function checkPhone(input) {
    var exp = /^\d{10}$/;
    if (!exp.test(input.value)) {
        error(input, 'The phone number must be 10 characters long.')
        return false;
    } else {
        return true;
    }

}
form.addEventListener('submit', function (e) {
    checkRequired([{
        input: username, message: "Name "
    },
    {
        input: mail, message: "Mail "
    },
    {
        input: phone, message: "Phone Number "
    },
    {
        input: password, message: "Password "
    },
    {
        input: re_password, message: "Re Password "
    }
    ])

    e.preventDefault();

    checkEmail(mail)
    checkLength(username, 16, 6)
    checkRePassword(password, re_password)
    checkPhone(phone)
    console.log(checkPhone(phone))
    console.log(checkEmail(mail))
    console.log(checkRePassword(password, re_password))
    console.log(checkLength(username, 16, 6))


    // we looks all inputs is correct //tüm girdilerin doğruluğunu kontrol ediyoruz
    if ((checkEmail(mail)===true) && (checkPhone(phone)===true) && (checkLength(username, 16, 6)===true) && (checkRePassword(password, re_password)===true)) {
        alertMEssage(allCorrect)
    } else {
        alertMEssage(inCorrect)  
    }

});
function alertMEssage(e) {
    e.style.display = "block"
    setTimeout(function () {
        e.style.display = "none"
    }, 2000);
}