// Cart
let cartIcon = document.querySelector("#cart-icon"); // identify [cart button] in HTML to reference in JS code
let cart = document.querySelector(".cart"); // identify [cart overlay] in HTML to reference in JS code
let closeCart = document.querySelector("#close-cart"); // identify [close cart button] in HTML to reference in JS code
// Open Cart
cartIcon.onclick = () => { // via mouse click
    cart.classList.add("active"); // show [cart overlay] in HTML via mouse click
};
// Close Cart
closeCart.onclick = () => { // via mouse click
    cart.classList.remove("active"); // hide [cart overlay] in HTML via mouse click
};

// Cart Working JS
if (document.readyState == "loading") {  
    document.addEventListener("DOMContentLoaded", ready);  
} else {
    ready();  
}

// Making Function
function ready() {  
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove'); // identify [trash button of each cart item] in HTML to reference in ready() function
    console.log(removeCartButtons); // show the identified [trash button of each cart item] in HTML in console
    for (var i = 0; i < removeCartButtons.length; i++) { // if [trash button of each cart item] is clicked 
        var button = removeCartButtons[i];  
        button.addEventListener("click", removeCartItem); // remove each cart item in HTML via mouse click [trash button of each cart item]
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity'); // identify [quanity field of each cart time] in HTML to reference in ready() function
    for (var i = 0; i < quantityInputs.length; i++) { // if [quanity field of each cart time] is clicked
        var input = quantityInputs[i];  
        input.addEventListener("change", quantityChanged); // change each cart item quantity in HTML via input to [quanity field of each cart item]
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart'); // identify [add to cart button of each cart time] in HTML to reference in ready() function
    for (var i = 0; i < addCart.length; i++) { // if [add to cart button of each cart time] is clicked
        var button = addCart[i];
        button.addEventListener("click", addCartClicked); // add each cart item in HTML via mouse click [add to cart button of each cart time]
    }
    // Buy Button
    document.getElementsByClassName('btn-buy')[0] // identify [buy button] and if it is clicked
    .addEventListener('click', buyButtonClicked);
}
// Buy Button
function buyButtonClicked() { // if [buy button] is clicked
    alert("Your purchase is being processed. Your cart has been emptied."); // send pop-up message
    var cartContent = document.getElementsByClassName('cart-content')[0]; // identify [cart items]
    while (cartContent.hasChildNodes()) { // while there are items in cart
        cartContent.removeChild(cartContent.firstChild); // remove all items from cart
    }
    updatetotal(); // show according change in total amount
}

// Remove Items From Cart
function removeCartItem (event) {  
    var buttonClicked = event.target; // identify specific [trash button of cart item] clicked
    buttonClicked.parentElement.remove(); // remove according cart item
    updatetotal(); // show according change in total amount
}
// Quantity Changes
function quantityChanged(event) {  
    var input = event.target; // identify if specific [quantity field of cart item] is clicked
    if (isNaN(input.value) || input.value <= 0) {  // if entered value is not a number number, convert it into a number OR if entered value is less than or equal to 0
        input.value = 1; // enter value of 1 in specific [quantity field of cart item]
    }
    updatetotal(); // show according change in total amount
}

// Add To cart
function addCartClicked (event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Heads up! You already added this item to cart.");
            return;
        }
    }
    var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class="fa-solid fa-trash cart-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}

// Update Total
function updatetotal() {  
    var cartContent = document.getElementsByClassName('cart-content')[0];  
    var cartBoxes = cartContent.getElementsByClassName('cart-box');  
    var total = 0; // identify and set [total amount] to 0 to reference in updatetotal() function
    for (var i = 0; i < cartBoxes.length; i++) {  
        var cartBox = cartBoxes[i];  
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];  
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];  
        var price = parseFloat(priceElement.innerText.replace("$", ""));  
        var quantity = quantityElement.value;  
        total = total + (price * quantity);  
    }
    // If price Contain some Cents Value
    total = Math.round(total * 100) / 100; // rounds total amount to 2 dp (relevant boundary case)

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;  
}