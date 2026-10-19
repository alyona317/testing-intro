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
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
