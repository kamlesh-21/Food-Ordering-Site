import { menuArray } from "./data.js"
const loginForm = document.getElementById("login-form")
const total = document.querySelector("#total");
const modal = document.querySelector("#modal");

total.addEventListener("click", (e) => {
  if (e.target.classList.contains("gotopayment")) {
    modal.style.display = "block";
  }
});

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const form = new FormData(loginForm)
  const fullName = form.get('fullName')
  modal.style.display = "none";
  total.innerHTML = 
    `
    <h2>Thanks you ${fullName}! Your order is on the way!</h2>
    ` 

});

let orders= []
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItems(e.target.dataset.add)
     } else if(e.target.dataset.reduce){
        reduceItems(e.target.dataset.reduce)
     }  else if(e.target.dataset.remove){
        removeItems(e.target.dataset.remove)
    }
})

function addItems(itemId){
    
    const item = menuArray.filter(function(FoodItem){
        return FoodItem.id.toString() === itemId
    },)[0]
    
    let existingItem = orders.filter(function(order) {
        return order.name === item.name;
    });
    if (existingItem.length > 0) {
        existingItem[0].quantity += 1;
    } else {
        item.quantity = 1;
        orders.push(item);
    }
    updateTotal()
    render()

}

function reduceItems(itemId) {
const existingItem = orders.filter(function(order) {
        return order.id.toString() === itemId
    });
    if (existingItem.length > 0 && existingItem[0].quantity > 0) {
        existingItem[0].quantity -= 1;
        if (existingItem[0].quantity === 0) {
            const index = orders.indexOf(existingItem[0]);
            orders.splice(index, 1);
        }
    }
    updateTotal()
    render()
}

function removeItems(itemId) {
    const index = orders.findIndex(function(order) {
        return order.id.toString() === itemId

    });
    if (index > -1) {
        orders.splice(index, 1);
    }
    updateTotal();
    render()
}

function generateTotalHTML() {
    let total = 0
        let html = '<div class="total-container">'
        html += '<h3 class="order-details">Your Order:</h3>'
        orders.forEach(function(item) {
            total += item.price * item.quantity
            html += `<div class="total-item">
                        <p>${item.name} x ${item.quantity} <span class="remove" data-remove="${item.id}">(remove)</span></p>
                        <p>${item.price * item.quantity}</p>
                    </div>`
        })
        html += '</div>'
        html += `<div class="total-cost">
                    <p>Total Cost:</p>
                    <p>${total}</p>
                </div>`
        html += `<div class="continue">
                    <button class="gotopayment">Complete Order</button>
                </div>
                `
    return html
}

function updateTotal(){
    document.getElementById('total').innerHTML = generateTotalHTML()
}

function getFeed(){
        
        let feedHtml = '';
        menuArray.forEach(function(item){
        let itemQuantity = 0;
        const existingItem = orders.filter(function(order) {
            return order.id.toString() === item.id.toString();
        });
        if (existingItem.length) {
            itemQuantity = existingItem[0].quantity;
        }
            
        feedHtml += 
        `<div class="display">
            <div class="items">
                <p class="emoji">${item.emoji}</p>
                <div class="item-inner">
                   <div>
                        <p class="title">${item.name}</h4>
                        <p class="ingredients">${item.ingredients}</p>
                        <span class="price">
                            <i class="fa-regular fa-dollar-sign" 
                            data-pricing="${item.id}"
                            ></i> ${item.price}
                        </span>
                    </div>
                </div>
                <div class="add-btn">
                    <span class="eclipse minus">
                        <i class="fa-solid fa-minus" data-reduce="${item.id}"></i>
                    </span>
                    <span class="eclipse quantity">${itemQuantity}</span>
                    <span class="eclipse plus">
                        <i class="fa-regular fa-plus" data-add="${item.id}"></i>
                    </span>
                </div>
            </div>
        </div>
       `
       
    })
    return feedHtml
}

function render(){
    document.getElementById('feed').innerHTML = getFeed()
}
render()