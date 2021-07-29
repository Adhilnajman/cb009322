window.onload = function () {
    if (localStorage.getItem('orders') == null) {
        document.getElementById('placeorders_table').style.display = 'none';
    } else {
        document.getElementById('txtNoOrders').style.display = 'none';
        document.getElementById('placeorders_table').style.display = 'block';
        document.getElementById('placeorders_tbody').innerHTML = localStorage.getItem('orders');
        document.getElementById('amount').innerHTML = 'LKR ' + localStorage.getItem('total') + '.00';
    }
};

function onPlaceOrder() {
    window.location.href = 'place-order.html';
}

function onPlaceOrder() {
    document.getElementById('placeorders_table').style.display = 'none';
    document.getElementById('txtSuccess').style.display = 'block';
    localStorage.removeItem('orders');
    localStorage.removeItem('total');
}