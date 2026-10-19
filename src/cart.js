function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}


function addToCart(cart, product, quantity) { 
  if (quantity <= 0) throw new RangeError('Количество должно быть положительным числом.');
  if (quantity > product.stock) throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе.');
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > product.stock) throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе.');
    return cart.map((item) => item.id === product.id ? { ...item, quantity: newQuantity } : item);
  }
  return [...cart,{...product, quantity}];
}



function changeQuantity(cart, id, quantity) { 
  const product = cart.find((item) => item.id === id);
  if(!product) return cart;
  if(quantity === 0) throw new RangeError('Количество должно быть положительным числом.');
  if (quantity > product.stock) throw new RangeError('Нельзя добавить в корзину больше товара, чем есть на складе.');

  return cart.map((item) => item.id === id ? { ...item, quantity } : item);

}
function removeFromCart(cart, id) {
  const product = cart.find((item) => item.id === id);
  if(id === 0) return []
  if(!product) return cart;
  return cart.filter((item) => item.id !== id);


}
function calculateCartSubtotal(cart) { 
  if (!cart.length) return 0;
  let amount = 0;
  for (const item of cart) {
    amount += item.price * item.quantity;
  }
  return amount;

 }
function calculateOrderTotal(cart, promocode) {
  let subtotal = calculateCartSubtotal(cart);
  if (subtotal <20000){
        return {
      subtotal,
      discount: 0,
      delivery: 30000,
      total: subtotal + 30000
    }
  } else if (subtotal >=20000 && subtotal <50000 && promocode === 'SAVE10'){
    return {
      subtotal,
      discount: subtotal * 0.1,
      delivery: 30000,
      total: subtotal - subtotal * 0.1 + 30000
    }
  }
  else if (subtotal >=50000 && promocode === 'SAVE10'){
    return {
      subtotal,
      discount: subtotal * 0.1,
      delivery: 0,
      total: subtotal - subtotal * 0.1
    }
  }
  else if (subtotal >=50000 && promocode !== 'SAVE10'){
    return {
      subtotal,
      discount: 0,
      delivery: 0,
      total: subtotal
    }
  }
  else if (subtotal >=20000 && subtotal <50000 && promocode !== 'SAVE10'){
    return {
      subtotal,
      discount: 0,
      delivery: 30000,
      total: subtotal + 30000
    }
  }
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
