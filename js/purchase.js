const form = document.getElementById('form_booking')

window.onload = function() {
    localStorage.clear();
};

const CHOICE_OF_TICKET_REQUIRED = "Please select your choice of ticket";
const NUMBER_OF_TICKET_REQUIRED = "You must purchase a minimum of one ticket";
const DURATION_REQUIRED = "Please specify duration";

let BOOKINGS = '';
let GRAND_TOTAL = 0;

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const booking_choice = document.getElementById('booking_choice').value;
    const booking_adults = document.getElementById('booking_adults').value;
    const booking_children = document.getElementById('booking_children').value;
    const booking_duration = document.getElementById('booking_duration').value;
    const booking_annual = document.getElementById('booking_annual').checked;
    const booking_food = document.getElementById('booking_food').checked;

    let ERROR_CHOICE = false;
    let ERROR_ADULTS = false;
    let ERROR_CHILDREN = false;
    let ERROR_DURATION = false;

    if (booking_choice == 'null') {
        document.getElementById('error_choice').innerHTML = CHOICE_OF_TICKET_REQUIRED;
        ERROR_CHOICE = true;
    }

    if (booking_adults == 0 || booking_adults == '') {
        ERROR_ADULTS = true;
    }

    if (booking_children == 0 || booking_children == '') {
        ERROR_CHILDREN = true;
    }

    if (ERROR_ADULTS && ERROR_CHILDREN) {
        document.getElementById('error_tickets').innerHTML = NUMBER_OF_TICKET_REQUIRED;
    }

    if (booking_duration == 'null') {
        document.getElementById('error_duration').innerHTML = DURATION_REQUIRED;
    }

    if (ERROR_CHOICE || ERROR_ADULTS || ERROR_CHILDREN || ERROR_DURATION) {
        return;
    }

    const booking = `<tr>
        <td>${booking_choice}</td>
        <td>
            Adults : ${booking_adults}
            Children : ${booking_children}
        </td>
        <td>${booking_duration}</td>
        <td>${booking_annual}</td>
        <td>${booking_food}</td>
    </tr>`;

    GRAND_TOTAL = GRAND_TOTAL + calculatePrice(booking_choice, booking_adults || 0, booking_children || 0, booking_duration, booking_annual, booking_food);

    BOOKINGS = BOOKINGS + booking;
    document.getElementById('order_tbody').innerHTML = BOOKINGS;
    document.getElementById('orders-table').style.display = 'block';
    document.getElementById('amount').innerHTML = 'LKR ' + GRAND_TOTAL + '.00';

    resetForm();
});

function calculatePrice(choice, adult, children, duration, annual_pass, food_token) {
    const ADULT_DAY_PASS = 1000;
    const CHILDREN_DAY_PASS = 500;
    const STUDENT_ADULT_PASS = 500;
    const STUDENT_CHILDREN_PASS = 250;
    const FOREINGER_ADULT_PASS = 5000;
    const FOREINGER_CHILDREN_PASS = 2500;
    const ANNUAL_PASS = 5000;
    const FOOD_TOKEN = 2500;

    let TOTAL = 0;

    if (choice == 'Day Pass') {
        TOTAL = (ADULT_DAY_PASS * adult) + (CHILDREN_DAY_PASS * children);
    } else if (choice == 'Student Pass') {
        TOTAL = (STUDENT_ADULT_PASS * adult) + (STUDENT_CHILDREN_PASS * children);
    } else if (choice == 'Foreigner Pass') {
        TOTAL = (FOREINGER_ADULT_PASS * adult) + (FOREINGER_CHILDREN_PASS * children);
    }

    if (duration == '1/2 Day') {
        TOTAL = TOTAL + 250;
    } else if (duration == 'Full Day') {
        TOTAL = TOTAL + 500;
    } else if (duration == '2 Days') {
        TOTAL = TOTAL + 1000;
    }

    if (annual_pass == true) {
        TOTAL = TOTAL + ANNUAL_PASS;
    }

    if (food_token == true) {
        TOTAL = TOTAL = FOOD_TOKEN;
    }

    return TOTAL;
}

function resetForm() {
    document.getElementById('booking_choice').value = 'null';
    document.getElementById('booking_adults').value = '';
    document.getElementById('booking_children').value = '';
    document.getElementById('booking_duration').value = 'null';
}

function onAddToFavourites() {
    localStorage.setItem('favourites', BOOKINGS);
    localStorage.setItem('total', GRAND_TOTAL);
    window.location.href = 'favourites.html';
}

function onPlaceOrder() {
    localStorage.clear();
    localStorage.setItem('orders', BOOKINGS);
    localStorage.setItem('total', GRAND_TOTAL);
    window.location.href = 'place-order.html';
}

// donate

function donate() {
    alert("Thank You For Your Donation !")
}

function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}

// loyality

function onLoyalityCheck() {
    const points = Math.round(Math.random() * 10) * 20;

    document.getElementById('buttonLoyality').style.display = 'none';
    document.getElementById('txtLoyality').innerHTML = `YOUR LOYALITY POINTS ARE : ${points}`;
    document.getElementById('txtLoyality').style.display = 'inline-block';

    setTimeout(() => {
        document.getElementById('buttonLoyality').style.display = 'inline-block';
        document.getElementById('txtLoyality').style.display = 'none';
    }, 5000);
}