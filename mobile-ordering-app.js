const menuArray = [
    {
        name: "Hot Wings",
        ingredients: ["6 hot wings", "BBQ sauce", "scallions"],
        id: 0,
        price: 12,
        image: 'images/wings.jpg',
    },
    {
        name: "French Fries",
        ingredients: ["100g fries", "parmesan", "ketchup"],
        id: 1,
        price: 8,
        image: 'images/fries.jpg'
    },
        {
        name: "Coleslaw",
        ingredients: ["red cabbage", "carrot", "mayo"],
        id: 2,
        price: 6,
        image: 'images/coleslaw.jpg'
    }
]

let orderArray = []

let total = 0

const orderForm = document.getElementById("order-form")

const orderModal = document.getElementById("modal")

document.addEventListener('click', function(e) {
    if(e.target.dataset.id){
        addToOrder(Number(e.target.dataset.id))
    }
    renderOrder()
})

function addToOrder(orderItem) {

    const orderObj = menuArray.filter(function(menuItem) {
        return menuItem.id === orderItem
    })[0]
    orderArray.push(orderObj)
    total += orderObj.price
}

function getMenuItems() {

    let menu = ``

    menuArray.forEach(function(menuItem){
        menu += `
        <div class="row menu-item">
                <div class="col-2">
                    <img src=${menuItem.image} class="menu-image">
                </div>
                <div class="col-6 mr-0 pr-0">
                    <p class="menu-item-name">${menuItem.name}</p>
                    <p class="menu-item-ingredients">${menuItem.ingredients.join(', ')}</p>
                    <p class="menu-item-price">$${menuItem.price}</p>
                </div>
                <div class="col-4 text-right ml-0 pl-0">
                    <button class="add-to-menu-btn" data-id="${menuItem.id}">Add to menu</button>
                </div>
        </div>
        `
    })

    return menu
}


function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuItems()
}

renderMenu()

function getOrderItems() {
    let orderMenu = `<p class="order-title">Your order</p>`
    orderArray.forEach(function(order){
        orderMenu += `
        <div class="row menu-item">
            <div class="col-6">
                <p class="order-item-name">${order.name} <span class="remove-item" onclick="removeOrderItem(${order.id})">Remove</span></p>
            </div>
            <div class="col-6">
                <p class="order-item-price">$${order.price}</p>
            </div>
        </div>
        `
    })
    orderMenu += `
    <div class="row total-price menu-item">
        <div class="col-6">
            <p class="order-item-name">Total price:</p>
        </div>
        <div class="col-6">
            <p class="order-item-price">$${total}</p>
        </div>
        <div class="col-12">
            <button class="order-button" id="order-button" onclick="showOrderModal()">Place order!</button>
        </div>
    </div>
    `
   return orderMenu
}

function showOrderModal() {
    orderModal.style.display = "block"
}

document.addEventListener('click', function(e){
    if(e.target.id !== "order-button" && !$(e.target).closest('#modal').length && e.target.id !== "modal") {
        orderModal.style.display = "none"
    }
})

function renderOrder() {
    document.getElementById("order").innerHTML = getOrderItems()
}

function removeOrderItem(orderItem) {
    const orderObj = menuArray.filter(function(menuItem) {
        return menuItem.id == orderItem
    })[0]
    
    let itemIndex = orderArray.indexOf(orderObj)
    orderArray.splice(itemIndex, 1)

    total -= orderObj.price
}

orderForm.addEventListener('submit', function(e){
    e.preventDefault()
    orderModal.style.display = "none"
    orderArray = []
    total = 0
    document.getElementById("order").innerHTML = `<p class="order-title">Thanks for your order!</p>`
})









