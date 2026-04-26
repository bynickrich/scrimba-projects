type Pizza = {
  id: number
  name: string
  price: number
}

type Order = {
  id: number
  pizza: Pizza
  status: 'ordered' | 'completed'
}

let cashInRegister = 100
const orderQueue: Order[] = []
let nextOrderId = 1
let nextPizzaId = 1

const menu: Pizza[] = [
  { id: nextPizzaId++, name: 'Margherita', price: 8 },
  { id: nextPizzaId++, name: 'Pepperoni', price: 10 },
  { id: nextPizzaId++, name: 'Hawaiian', price: 9 },
  { id: nextPizzaId++, name: 'Veggie', price: 7 },
]

function addNewPizza(pizzaObj: Omit<Pizza, 'id'>) {
  const newPizza = { id: nextPizzaId++, ...pizzaObj }
  menu.push(newPizza)
  return newPizza
}

function placeOrder(pizzaName: string): Order {
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

function getPizzaDetails(identifier: Pizza['id'] | Pizza['name']) {
  const match =
    typeof identifier === 'number'
      ? (p: Pizza) => p.id === identifier
      : (p: Pizza) => p.name === identifier.toLowerCase()

  const pizza = menu.find(match)
  if (!pizza) {
    throw new Error(`Pizza not found: ${identifier}`)
  }
  return pizza
}

function completeOrder(orderId: number): Order {
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
