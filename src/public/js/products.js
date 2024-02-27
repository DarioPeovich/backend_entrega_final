const form = document.getElementById('purchaseForm');
const cartId = document.querySelector('input[name="cart_id"]');

form.addEventListener('submit', e => {
    e.preventDefault();
    // const cartId = document.querySelector('input[name="cart_id"]').value;
    //const linkPurchase = `/api/carts/${cartId}/purchase`;
    const linkPurchase = "/api/carts/" + cartId.value + "/purchase";
    //const linkPurchase = "/carts/" + cartId.value ;
    console.log(linkPurchase);

    fetch(linkPurchase, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    console.log(cartId.value);
})

//CartId: 6590707032eef4df1cabff6a