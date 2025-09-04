document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('addToCartBtn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const productData = btn.getAttribute('data-product');
      if (!productData) return;
      const product = JSON.parse(productData);

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Produto adicionado à sacola!');
    });
  }
});