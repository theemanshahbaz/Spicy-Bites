// ---------- MENU DATA ----------
const menuItems = [
  {name:"Zinger Loaded Fries", cat:"fastfood", price:650, img:"https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=600", desc:"Crispy fries loaded with zinger chunks & cheese sauce."},
  {name:"Classic Beef Burger", cat:"fastfood", price:750, img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600", desc:"Juicy beef patty, cheddar, house sauce."},
  {name:"Crispy Chicken Wrap", cat:"fastfood", price:550, img:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600", desc:"Crunchy chicken, fresh veggies, garlic mayo."},
  {name:"Peri Peri Nuggets", cat:"fastfood", price:480, img:"https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600", desc:"8pc nuggets tossed in peri peri spice."},
  {name:"Margherita Pizza", cat:"italian", price:1100, img:"pizza.avif", desc:"Fresh basil, mozzarella, San Marzano tomato."},
  {name:"Fettuccine Alfredo", cat:"italian", price:950, img:"https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=600", desc:"Creamy parmesan sauce, grilled chicken."},
  {name:"Chicken Chow Mein", cat:"italian", price:400, img:"noodles.avif", desc:"Stir-fried noodles tossed with tender chicken strips, vegetables, and savory soy sauce."},
  {name:"Mushroom Risotto", cat:"italian", price:1050, img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=600", desc:"Slow-cooked arborio rice, wild mushrooms."},
  {name:"Chatpata Golgappay", cat:"street", price:300, img:"golgappy.jpg", desc:"Tangy tamarind water, spicy potato filling."},
  {name:"Bun Kebab", cat:"street", price:250, img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600", desc:"Classic beef patty bun, chutney & salad."},
  {name:"Seekh Kebab Roll", cat:"street", price:420, img:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600", desc:"Smoky seekh, paratha roll, mint chutney."},
  {name:"Dahi Bhalla Chaat", cat:"street", price:280, img:"dahi bhally.webp", desc:"Creamy yogurt, tangy tamarind, crunchy sev."},
  {name:"Mango Mojito", cat:"drinks", price:350, img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=600", desc:"Fresh mango, mint, soda."},
  {name:"Oreo Milkshake", cat:"drinks", price:400, img:"choclate.avif", desc:"Thick, creamy, loaded with Oreo crumbs."},
  {name:"Fresh Lime Soda", cat:"drinks", price:200, img:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=600", desc:"Sweet, salty, or mixed — your choice."},
  {name:"Iced Peach Tea", cat:"drinks", price:320, img:"https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=600", desc:"Chilled black tea, peach syrup."}
];

const menuGrid = document.getElementById('menuGrid');

function renderMenu(filter='all'){
  menuGrid.innerHTML = '';
  const items = filter === 'all' ? menuItems : menuItems.filter(i => i.cat === filter);
  items.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-6 col-lg-3';
    col.innerHTML = `
      <div class="menu-card reveal in-view">
        <img src="${item.img}" alt="${item.name}">
        <div class="menu-card-body">
          <h5>${item.name}</h5>
          <p>${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-price">Rs. ${item.price}</span>
            <button class="add-btn" onclick="addToCart('${item.name.replace(/'/g,"\\'")}', ${item.price})">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>`;
    menuGrid.appendChild(col);
  });
}
renderMenu();

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });
});

// mega menu quick links also filter + scroll
document.querySelectorAll('.mega-link').forEach(link=>{
  link.addEventListener('click', (e)=>{
    const f = link.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b=>{
      b.classList.toggle('active', b.dataset.filter === f);
    });
    renderMenu(f);
  });
});
document.querySelectorAll('.cat-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const f = card.dataset.filterTarget;
    document.querySelectorAll('.filter-btn').forEach(b=>{
      b.classList.toggle('active', b.dataset.filter === f);
    });
    renderMenu(f);
    document.getElementById('menu').scrollIntoView({behavior:'smooth'});
  });
});

// ---------- CART (localStorage) ----------
function getCart(){ return JSON.parse(localStorage.getItem('spiceroute_cart') || '[]'); }
function saveCart(cart){ localStorage.setItem('spiceroute_cart', JSON.stringify(cart)); renderCart(); }

function addToCart(name, price){
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if(existing){ existing.qty += 1; } else { cart.push({name, price, qty:1}); }
  saveCart(cart);
}

function removeFromCart(name){
  let cart = getCart().filter(i => i.name !== name);
  saveCart(cart);
}

function renderCart(){
  const cart = getCart();
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountEl = document.getElementById('cartCount');

  cartItemsEl.innerHTML = cart.length ? '' : '<p class="text-muted text-center mt-4">Your cart is empty.</p>';
  let total = 0, count = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    count += item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>Qty: ${item.qty} × Rs.${item.price}</small>
      </div>
      <button class="btn btn-sm text-danger" onclick="removeFromCart('${item.name.replace(/'/g,"\\'")}')"><i class="fa-solid fa-trash"></i></button>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = `Rs. ${total}`;
  cartCountEl.textContent = count;
}
renderCart();

function checkoutCart(){
  if(getCart().length === 0){ alert('Your cart is empty!'); return; }
  alert('Order placed! (This is a demo checkout — connect a backend to go live.)');
  localStorage.removeItem('spiceroute_cart');
  renderCart();
}

// ---------- REVIEWS ----------
const defaultReviews = [
  {name:"Ayesha K.", stars:5, text:"The Route Special Platter is unreal. Best multi-cuisine spot in town."},
  {name:"Bilal R.", stars:4, text:"Loved the street food section, tastes exactly like the real thela."},
  {name:"Sara M.", stars:5, text:"Pizza was fresh out of the oven, pasta was creamy perfection."},
  {name:"Hamza T.", stars:5, text:"The mojito and the golgappay combo is a genius pairing lol."},
  {name:"Zara N.", stars:4, text:"Ambience is amazing, service was quick even on a Friday night."}
];

function getReviews(){
  const saved = JSON.parse(localStorage.getItem('spiceroute_reviews') || 'null');
  return saved || defaultReviews;
}
function saveReviews(reviews){
  localStorage.setItem('spiceroute_reviews', JSON.stringify(reviews));
  renderReviews();
}

function renderReviews(){
  const reviews = getReviews();
  const track = document.getElementById('reviewTrack');
  const cardsHtml = reviews.map(r => `
    <div class="review-card">
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      <p>"${r.text}"</p>
      <h6>— ${r.name}</h6>
    </div>
  `).join('');
  // duplicate for seamless infinite scroll
  track.innerHTML = cardsHtml + cardsHtml;
}
renderReviews();

// star input in modal
let selectedStars = 0;
document.querySelectorAll('#starInput i').forEach(star=>{
  star.addEventListener('click', ()=>{
    selectedStars = parseInt(star.dataset.val);
    document.querySelectorAll('#starInput i').forEach(s=>{
      s.classList.toggle('active', parseInt(s.dataset.val) <= selectedStars);
    });
  });
});

document.getElementById('reviewForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('revName').value.trim();
  const text = document.getElementById('revText').value.trim();
  if(!selectedStars){ alert('Please select a star rating.'); return; }
  const reviews = getReviews();
  reviews.unshift({name, stars:selectedStars, text});
  saveReviews(reviews);
  this.reset();
  selectedStars = 0;
  document.querySelectorAll('#starInput i').forEach(s=>s.classList.remove('active'));
  bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
});

// ---------- RESERVATIONS ----------
function getBookings(){ return JSON.parse(localStorage.getItem('spiceroute_bookings') || '[]'); }
function saveBookings(list){ localStorage.setItem('spiceroute_bookings', JSON.stringify(list)); renderBookings(); }

function renderBookings(){
  const bookings = getBookings();
  const wrap = document.getElementById('myBookings');
  if(bookings.length === 0){ wrap.innerHTML = ''; return; }
  wrap.innerHTML = '<h6 class="mb-3">Your Bookings</h6>' + bookings.map(b => `
    <div class="booking-chip">
      <span>${b.name} · ${b.date} @ ${b.time}</span>
      <span>${b.guests}</span>
    </div>
  `).join('');
}
renderBookings();

document.getElementById('reserveForm').addEventListener('submit', function(e){
  e.preventDefault();
  const booking = {
    name: document.getElementById('resName').value,
    phone: document.getElementById('resPhone').value,
    date: document.getElementById('resDate').value,
    time: document.getElementById('resTime').value,
    guests: document.getElementById('resGuests').value,
    cuisine: document.getElementById('resCuisine').value
  };
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
  document.getElementById('reserveMsg').textContent = `Thanks ${booking.name}! Table reserved for ${booking.date} at ${booking.time}.`;
  this.reset();
});

// ---------- SCROLL REVEAL ----------
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, {threshold:0.15});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// ---------- LOGIN / SIGNUP (localStorage demo auth) ----------
function getUsers(){ return JSON.parse(localStorage.getItem('spiceroute_users') || '[]'); }
function saveUsers(users){ localStorage.setItem('spiceroute_users', JSON.stringify(users)); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem('spiceroute_current') || 'null'); }
function setCurrentUser(user){ localStorage.setItem('spiceroute_current', JSON.stringify(user)); updateAuthUI(); }

function updateAuthUI(){
  const user = getCurrentUser();
  const label = document.getElementById('authLabel');
  const navItem = document.getElementById('authNavItem');
  if(user){
    navItem.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-cta btn-sm dropdown-toggle" data-bs-toggle="dropdown">
          <i class="fa-solid fa-user"></i> ${user.name.split(' ')[0]}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><button class="dropdown-item" onclick="logoutUser()">Logout</button></li>
        </ul>
      </div>`;
  } else if(label){
    label.textContent = 'Login';
  }
}

// tab switching
document.getElementById('authTabs')?.addEventListener('click', (e)=>{
  if(e.target.tagName !== 'BUTTON') return;
  document.querySelectorAll('#authTabs .nav-link').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  const tab = e.target.dataset.tab;
  document.getElementById('authModalTitle').textContent = tab === 'login' ? 'Login' : 'Sign Up';
  document.getElementById('loginForm').classList.toggle('d-none', tab !== 'login');
  document.getElementById('signupForm').classList.toggle('d-none', tab !== 'signup');
});

document.getElementById('signupForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const errorEl = document.getElementById('signupError');
  const users = getUsers();

  if(password.length < 6){ errorEl.textContent = 'Password must be at least 6 characters.'; return; }
  if(users.some(u => u.email === email)){ errorEl.textContent = 'An account with this email already exists.'; return; }

  users.push({name, email, password});
  saveUsers(users);
  setCurrentUser({name, email});
  errorEl.textContent = '';
  this.reset();
  bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
});

document.getElementById('loginForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');
  const user = getUsers().find(u => u.email === email && u.password === password);

  if(!user){ errorEl.textContent = 'Invalid email or password.'; return; }
  setCurrentUser({name: user.name, email: user.email});
  errorEl.textContent = '';
  this.reset();
  bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
});

function logoutUser(){
  localStorage.removeItem('spiceroute_current');
  updateAuthUI();
}
updateAuthUI();

// ---------- FIX: SMOOTH SCROLL + AUTO-CLOSE MOBILE NAV ----------
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      const nav = document.getElementById('navMain');
      if(nav.classList.contains('show')){
        bootstrap.Collapse.getInstance(nav)?.hide();
      }
    }
  });
});

// ---------- FIX: RELIABLE SCROLL-REVEAL ANIMATIONS ----------
function initReveal(){
  const items = document.querySelectorAll('.reveal:not(.in-view)');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((entry, i)=>{
      if(entry.isIntersecting){
        setTimeout(()=> entry.target.classList.add('in-view'), i * 100);
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.1, rootMargin:'0px 0px -50px 0px'});
  items.forEach(el => obs.observe(el));
}
initReveal();

// ---------- NAVBAR SHRINK ON SCROLL ----------
window.addEventListener('scroll', ()=>{
  document.querySelector('.main-nav').classList.toggle('nav-scrolled', window.scrollY > 60);
});

// ---------- HERO LOAD-IN ANIMATION ----------
window.addEventListener('load', ()=>{
  document.querySelectorAll('.carousel-item.active .hero-content').forEach(el=>{
    el.classList.add('hero-in');
  });
});
