
var slideIndex = 1;
var startIndex = 1;
var endIndex = 6;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    console.log("Function worked!");
    showSlides(slideIndex = n);
}

function showSlides(n) {

    if (n > endIndex) {
        n = startIndex;
        slideIndex = n;
    }
    if (n < startIndex) {
        n = endIndex;
        slideIndex = n;
    }
    const img = document.getElementById("mainImg")
    var im = "/Content/img/cake" + n + ".jpg"
    img.src = im;

    console.log(img.src);
    const captionText = document.getElementById("caption");
    const content = document.getElementById("img" + n).alt;
    captionText.innerHTML = content;
}


function addError(myInput, errMsg) {
    document.getElementById(myInput.id).style.border = "2px solid red";
    document.getElementById(errMsg.id).style.display = "block";
}

function removeError(myInput, errMsg) {
    document.getElementById(myInput.id).style.border = "";
    document.getElementById(errMsg.id).style.display = "none";
}


function inputRequierd(myInput, errMsg) {
    console.log("checking");
    if (myInput.value === "") {
        addError(myInput, errMsg);
    } else {
        removeError(myInput, errMsg);
    }
}

var number6;
function inputPhoneRequierd(myInput, errMsg) {
    const len = document.getElementById(myInput.id).value.length;
    if (len < 8) {
        addError(myInput, errMsg);
    } else {
        removeError(myInput, errMsg);
    }
    if (len == 7) {
        number6 = myInput.value;
    }
    if (len >= 8) {
        myInput.value = number6;
        removeError(myInput, errMsg);
    }
}

function inputEmailRequierd(myInput, errMsg) {
    const emailVal = myInput.value;

    if (!emailVal.includes("@")) {
        addError(myInput, errMsg);
    }
    if (emailVal.includes("..")) {
        addError(myInput, errMsg);
    }


}


function inputValidity(myInput, errMsg) {
    inputRequierd(myInput, errMsg);

    if (myInput.type === "number") {
        inputPhoneRequierd(myInput, errMsg);
    }
    if (myInput.type === "email") {
        inputEmailRequierd(myInput, errMsg);
    }

}

function Submit() {
    const name = document.getElementById("fname").value;
    const description = document.getElementById("description").value;
    const email = document.getElementById("email").value;
    const phone = "" + document.getElementById("tel").value

    console.log(name + "|" + description + "|" + email + "|" + phone);
}