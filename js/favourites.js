window.onload = function () {
    if (localStorage.getItem('favourites') == null) {
        document.getElementById('favourite_table').style.display = 'none';
    } else {
        document.getElementById('txtNoOrders').style.display = 'none';
        document.getElementById('favourite_table').style.display = 'block';
        document.getElementById('favourite_tbody').innerHTML = localStorage.getItem('favourites');
        document.getElementById('amount').innerHTML = 'LKR ' + localStorage.getItem('total') + '.00';
    }
};

function onPlaceOrder() {
    localStorage.setItem('orders', localStorage.getItem('favourites'));
    localStorage.removeItem('favourites');
    window.location.href = 'place-order.html';
}