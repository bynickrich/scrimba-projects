type Pizza = {
  name: string
  price: number
}

type Order = {
  id: number
  pizza: Pizza
  status: 'ordered' | 'completed'
}

const menu: Pizza[] = [
  { name: 'Margherita', price: 8 },
  { name: 'Pepperoni', price: 10 },
  { name: 'Hawaiian', price: 9 },
  { name: 'Veggie', price: 7 },
]

let cashInRegister = 100
const orderQueue: Order[] = []
let nextOrderId = 1

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj)
}

function placeOrder(pizzaName: string) {
  const pizza = menu.find((p) => p.name === pizzaName)
  if (pizza) {
    cashInRegister += pizza.price
    const newOrder: Order = {
      id: nextOrderId++,
      pizza: pizza,
      status: 'ordered',
    }
    orderQueue.push(newOrder)
    return newOrder
  } else {
    throw new Error(`Pizza "${pizzaName}" not found in the menu.`)
  }
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((o) => o.id === orderId)
  if (order) {
    order.status = 'completed'
    return order
  } else {
    throw new Error(`Order with ID ${orderId} not found.`)
  }
}

addNewPizza({ name: 'Chicken Bacon Ranch', price: 12 })
addNewPizza({ name: 'BBQ Chicken', price: 12 })
addNewPizza({ name: 'Spicy Sausage', price: 11 })

placeOrder('Chicken Bacon Ranch')
completeOrder(1)

console.log(menu, cashInRegister, orderQueue)
