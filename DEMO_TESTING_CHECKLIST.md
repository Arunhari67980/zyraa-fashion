## 🧪 Quick Demo Testing Checklist

### ✅ Test 1: Browse Products
- [ ] Go to Home page
- [ ] See 6 new arrivals displayed
- [ ] Click on any product category in "Combo Offers"
- [ ] See category filters on RandomProducts page
- [ ] Try sorting by "Price: Low to High"
- [ ] Try sorting by "Top Rated"

### ✅ Test 2: Add Items to Cart
- [ ] Click "Add to Cart" on a product
- [ ] See cart count increase in header
- [ ] Add same product again → quantity increases
- [ ] Add different products
- [ ] Refresh page → items still in cart

### ✅ Test 3: Manage Cart
- [ ] Go to /cart page
- [ ] See all items with prices
- [ ] Update quantity of an item
- [ ] See total price update
- [ ] Remove an item → disappears from cart
- [ ] Cart total recalculates

### ✅ Test 4: Complete Checkout
- [ ] Click "Proceed to Checkout"
- [ ] Fill in all required fields:
  - Full Name
  - Email
  - Phone
  - Address
  - City
  - Zip Code (optional)
- [ ] Click "Confirm Order & Proceed to Payment"
- [ ] See success screen with order ID
- [ ] Order ID format: `ORD-[timestamp]`

### ✅ Test 5: View Order History
- [ ] Go to /orders page
- [ ] See your placed order in the list
- [ ] Order shows:
  - Order ID
  - Date
  - All purchased items with quantities
  - Total amount
  - Status badge "confirmed"
- [ ] Click "View Details" button

### ✅ Test 6: Persistence Test
- [ ] Add items to cart
- [ ] Close browser tab/window
- [ ] Open website again
- [ ] Cart items should still be there
- [ ] Place an order
- [ ] Close browser
- [ ] Open website
- [ ] Order should appear in Order History

### ✅ Test 7: Multiple Orders
- [ ] Add different items to cart
- [ ] Checkout and place Order #1
- [ ] Go home
- [ ] Add different items
- [ ] Checkout and place Order #2
- [ ] Go to Order History
- [ ] See both orders listed
- [ ] Most recent order appears first

### ✅ Test 8: LocalStorage Verification
- [ ] Open Browser DevTools (F12)
- [ ] Go to Application → LocalStorage
- [ ] Look for keys:
  - `demoProducts` - Should have 19 products
  - `cartItems` - Should have items you added
  - `orders` - Should have your placed orders

### ✅ Test 9: Search & Filter
- [ ] Go to /random page (All Products)
- [ ] Use search bar (if implemented)
- [ ] Try different sort options
- [ ] See products reorder
- [ ] Add items from different categories

### ✅ Test 10: Mobile Responsiveness
- [ ] Open DevTools
- [ ] Switch to mobile view
- [ ] Test on iPhone X, iPad, Android views
- [ ] Buttons and inputs should be responsive
- [ ] Cart and checkout should work on mobile

---

## 🔍 Demo Data Overview

### Sample Products Available
1. **Elegant Black Dress** - ₹2,500
2. **Floral Midi Dress** - ₹2,200
3. **Leather Jacket** - ₹3,500
4. **Premium Blue Jeans** - ₹1,999
5. **Wool Sweater** - ₹2,200
6. **Winter Coat** - ₹3,500
... and 13 more!

### Test Scenarios

#### Scenario A: Small Order
1. Add 1 Elegant Black Dress (₹2,500)
2. Checkout with your details
3. See order confirmation

#### Scenario B: Multiple Items
1. Add 3-4 different items
2. Update quantities on some
3. See total price update
4. Checkout
5. Verify in order history

#### Scenario C: Category Browsing
1. Go to each category (Dresses, Jackets, etc.)
2. See filtered products
3. Add items from different categories
4. Checkout to see mixed order

---

## 🐛 Troubleshooting

### Cart Not Persisting
- Open DevTools → Check LocalStorage for `cartItems` key
- If empty, click "Add to Cart" again
- Refresh and verify

### Orders Not Showing
- Go to /orders page
- Check if order was confirmed (form validation)
- Open DevTools → Check LocalStorage for `orders` key

### Products Not Loading
- Check if `demoProducts` exists in LocalStorage
- If missing, refresh home page to reinitialize
- Check console for errors

### Clear Everything & Reset
Open DevTools console and run:
```javascript
localStorage.clear();
location.reload();
```

---

## 📊 Key Metrics to Track

- **Number of Products**: 19
- **Number of Categories**: 8
- **Total Demo Price Range**: ₹1,200 - ₹4,500
- **Default Cart Items**: 0 (empty on first load)
- **Default Orders**: 0 (none until you checkout)

---

## 🎯 Success Indicators

✅ **You know it works when:**
1. You can add items and see cart count increase
2. Items persist after page refresh
3. You can complete a full checkout
4. Orders appear in order history
5. Multiple orders are listed correctly
6. Everything works on mobile
7. Data is visible in LocalStorage

---

**Ready to test? Start browsing! 🎉**
