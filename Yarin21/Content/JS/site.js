
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

var number7;
function inputPhoneRequierd(myInput, errMsg) {
    const len = document.getElementById(myInput.id).value.length;
    if (len < 7) {
        addError(myInput, errMsg);
    } else {
        removeError(myInput, errMsg);
    }
    if (len == 7) {
        number7 = myInput.value;
    }
    if (len > 7) {
        myInput.value = number7;
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

//function ErrorForm() {
//    const errName = document.getElementById("errName").style.display == "block";
//    const errDec = document.getElementById("errDec").style.display == "block";
//    const errMail = document.getElementById("errMail").style.display == "block";
//    const errPhone = document.getElementById("errPhone").style.display == "block";
//    console.log("status--->" + errName + "" + errDec + "" + errMail + "" + errPhone);
//    if (errName || errDec || errMail || errPhone) {
//        return true;
//    }

//    return false;
//}

function Submit() {
    const name = document.getElementById("fname").value;
    const desc = document.getElementById("description").value;
    const e_mail = document.getElementById("email").value;
    const tel = +(document.getElementById("areaCode").value + "" + document.getElementById("tel").value);

 
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("loader").style.display = "block";
    $.ajax({
        url: "/Home/SendEmail",
        type: 'POST',
        async: true,
        data: { fname: name, description: desc, email: e_mail, phone: tel },
        success: function (data) {
            $('#EmailDialogBox').modal("show");
            document.getElementById("submitBtn").style.display = "block";
            document.getElementById("loader").style.display = "none";
            $("#myForm").trigger('reset');
        }, error: function (xhr, textStatus, errorThrown) {
            var dom_nodes = $($.parseHTML(xhr.responseText));
            alert(dom_nodes.filter('title').text());
            document.getElementById("submitBtn").style.display = "block";
            document.getElementById("loader").style.display = "none";
        }
    });

    
}

$("#myForm").submit(function (e) {
    e.preventDefault();
    Submit();

});