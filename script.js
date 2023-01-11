import { menuArray } from "/data.js"
// console.log(menuArray)

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
                        <span class="price"><i class="fa-light fa-dollar-sign"></i>${items.price}</span>
                    </div>
                </div>
                <div class="add-btn">
                    <span class="eclipse"><i class="fa-regular fa-plus"></i></span>
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
