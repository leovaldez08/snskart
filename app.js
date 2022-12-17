const addbutton = document.getElementsByClassName("green")
var impt = [];
const count = {};
var minTotal = 0;
var maxTotal = 0;
var totalItems = 0;
var details;
var reqid;
var action;
var update = document.getElementById("cart-value");
var quantity = document.getElementsByClassName("number")
update.innerHTML= totalItems;
var itemPriceStart = {
    essentials1 : 20,           snacks1 : 10,            stationery1 : 50,
    essentials2 : 300,          snacks2 : 10,            stationery2 : 10,
    essentials3 : 150,          snacks3 : 20,            stationery3 : 45,
    essentials4 : 150,          snacks4 : 20,            stationery4 : 5,
    essentials5 : 200,
    essentials6 : 20,
    essentials7 : 200,
    essentials8 : 35,
    essentials9 : 50,
};

var prefferedBrand = {
    essentials1 : "esb1",          snacks1 : "snb1",            stationery1 : "stb1",
    essentials2 : "esb2",          snacks2 : "snb2",            stationery2 : "stb2",
    essentials3 : "esb3",          snacks3 : "snb3",            stationery3 : "stb3",
    essentials4 : "esb4",          snacks4 : "snb4",            stationery4 : "stb4",
    essentials5 : "esb5",
    essentials6 : "esb6",
    essentials7 : "esb7",
    essentials8 : "esb8",
    essentials9 : "esb9",
}

var idLink = {
    essentials1 : "es1",          snacks1 : "sn1",            stationery1 : "st1",
    essentials2 : "es2",          snacks2 : "sn2",            stationery2 : "st2",
    essentials3 : "es3",          snacks3 : "sn3",            stationery3 : "st3",
    essentials4 : "es4",          snacks4 : "sn4",            stationery4 : "st4",
    essentials5 : "es5",
    essentials6 : "es6",
    essentials7 : "es7",
    essentials8 : "es8",
    essentials9 : "es9",
}

var itemPriceEnd = {
    essentials1 : 150,          snacks1 : 60,             stationery1 : 160,
    essentials2 : 400,          snacks2 : 150,            stationery2 : 20,
    essentials3 : 250,          snacks3 : 250,            stationery3 : 45,
    essentials4 : 300,          snacks4 : 200,            stationery4 : 30,
    essentials5 : 400,
    essentials6 : 100,
    essentials7 : 600,
    essentials8 : 250,
    essentials9 : 250,
}

var itemName = {
    essentials1 : "Balm",                   snacks1 : "Biscuits",              stationery1 : "Notebooks",
    essentials2 : "Body Lotion",            snacks2 : "Chips",                 stationery2 : "Pens",
    essentials3 : "Conditioner",            snacks3 : "Chocalate",             stationery3 : "A4 sheets (pack of 30)",
    essentials4 : "Face Wash",              snacks4 : "Jam",                   stationery4 : "Pencil",
    essentials5 : "Shampoo",
    essentials6 : "Tooth Paste",
    essentials7 : "Liquid Detergent",
    essentials8 : "Sanitary Pads",
    essentials9 : "Hair Oil",
};


for (let i=0; i<addbutton.length; i+=1) {
    addbutton[i].addEventListener("click", e =>{
        var Target = e.target
        if (Target.classList.contains("button")) {
            reqid=Target
            details=reqid.id
        }
        else {
            reqid=Target.parentElement
            details= reqid.id
        }
        for (let j=0; j< +document.getElementById(idLink[details]).value; j++) {
            impt.push(details)
        }
        updateCart(details)
        minTotal+=itemPriceStart[details]*document.getElementById(idLink[details]).value;
        maxTotal+=itemPriceEnd[details]*document.getElementById(idLink[details]).value;
        update.innerHTML = totalItems;
        remEle = document.getElementById(details)
        remEle.parentNode.removeChild(remEle)
    })
}

function updateCart(req) {
    totalItems+= +document.getElementById(idLink[req]).value
}

document.getElementById("cartMain").onclick = () => {
    impt.forEach(element => {
        count[element] = (count[element] || 0) + 1;
    });
    function printDistinct (arr,len) {
        for (let i=0; i<len; i++) {
            var j;
            for (j=0; j<i; j++) {
                if (arr[i]==arr[j]) {
                    break;
                }
            }
            var brand = document.getElementById(prefferedBrand[arr[i]]).value
            if (i == j) {
                console.log("Item name: " + itemName[arr[i]] + " | Preferred brand: " + brand + " - Quantity: " + count[arr[i]]);
            }
        }
        console.log("The cost of this order will be between " + "₹ " + minTotal + " - " + maxTotal);
    }
    printDistinct(impt,impt.length);
    updateWhatsappLink();
    window.open(whatsappLink, "_blank");
}

var whatsappLink = "https://api.whatsapp.com/send?phone=919965080961&text=Hi%20SNS%20Kart,%20I%20need%20the%20following%20products.%0AOrder%20details:-";

// Whatsapp integration
function updateWhatsappLink() {
    function addDetails (arr,len) {
        for (let i=0; i<len; i++) {
            var j;
            for (j=0; j<i; j++) {
                if (arr[i]==arr[j]) {
                    break;
                }
            }
            var brand = document.getElementById(prefferedBrand[arr[i]]).value
            if (i == j) {
                whatsappLink += "%0A" + itemName[arr[i]] + "%20-%20" + brand + ":%20" + count[arr[i]];
            }
        }
        whatsappLink += "%0A" + "The%20cost%20of%20this%20order%20will%20be%20between:%20₹%20" + minTotal + "%20-%20" + maxTotal;
        whatsappLink += "%0A" + "Note:-%20The%20price%20will%20vary%20according%20to%20your%20selection%20of%20brands"
        whatsappLink += "%0A%0A" + "Our%20sales%20executive%20will%20reach%20out%20to%20you%20shortly😊"
    }
    addDetails(impt,impt.length);
}
