import { menuArray } from "/data.js"
// console.log(menuArray)

let orders= []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addItems(e.target.dataset.add)
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
}

function removeItems(itemId) {
    const index = orders.findIndex(function(order) {
        return order.id.toString() === itemId;
    });
    if (index > -1) {
        orders.splice(index, 1);
    }
    updateTotal();
}

function updateTotal(){
    document.getElementById('total').innerHTML = generateTotalHTML()
}

function generateTotalHTML() {
    let total = 0
        let html = '<div class="total-container">'
        html += '<h3 class="order-details">Your Order:</h3>'
        orders.forEach(function(item) {
            total += item.price * item.quantity
            html += `<div class="total-item">
                        <p>${item.name} x ${item.quantity} <span class="remove" 
                        data-less="${item.id}">(remove)</span></p>
                        <p>${item.price * item.quantity}</p>
                    </div>`
        })
        html += '</div>'
        html += `<div class="total-cost">
                    <p>Total Cost:</p>
                    <p>${total}</p>
                </div>`
        html += `<div class="continue">
                    <button class=gotopayment>Complete Order</button>
                </div>
                `
    return html
}

function getFeed(){
    
    let feedHtml = ''
    menuArray.forEach(function(items){
        feedHtml += 
        `<div class="display">
            <div class="items">
                <p class="emoji">${items.emoji}</p>
                <div class="item-inner">
                   <div>
                        <p class="title">${items.name}</h4>
                        <p class="ingredients">${items.ingredients}</p>
                        <span class="price">
                            <i class="fa-regular fa-dollar-sign" 
                            ></i> ${items.price}
                        </span>
                    </div>
                </div>
                <div class="add-btn">
                    <span class="eclipse">
                        <i class="fa-regular fa-plus" 
                        data-add="${items.id}"
                        ></i>
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