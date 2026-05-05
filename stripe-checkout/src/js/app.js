// Stripe Checkout Integration
const stripe = Stripe('pk_live_YOUR_KEY_HERE');

document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const btn = document.getElementById('checkoutBtn');
  btn.textContent = 'Processing...';
  btn.disabled = true;
  
  try {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'price_YOUR_PRICE_ID' })
    });
    
    const session = await response.json();
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    
    if (error) {
      alert('Error: ' + error.message);
      btn.textContent = 'Start Free Trial - $9/mo';
      btn.disabled = false;
    }
  } catch (err) {
    console.error('Error:', err);
    btn.textContent = 'Start Free Trial - $9/mo';
    btn.disabled = false;
  }
});
