import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

// Import pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Search from './pages/Search';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';
import OrderConfirm from './pages/OrderConfirm';
import OrderHistory from './pages/OrderHistory';
import OnlinePayment from './pages/OnlinePayment';
import CashPayment from './pages/CashPayment';
import DebitPayment from './pages/DebitPayment';
import RandomProducts from './pages/RandomProducts';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] to-[#faf9f6] font-sansation">
        <Header />
        <main className="max-w-7xl mx-auto">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Shopping Cart */}
            <Route path="/cart" element={<Cart />} />

            {/* Product Categories */}
            <Route path="/dresses" element={<ProductPage />} />
            <Route path="/jackets" element={<ProductPage />} />
            <Route path="/jeans" element={<ProductPage />} />
            <Route path="/pants" element={<ProductPage />} />
            <Route path="/partywear" element={<ProductPage />} />
            <Route path="/shorts" element={<ProductPage />} />
            <Route path="/skirts" element={<ProductPage />} />
            <Route path="/sweaters" element={<ProductPage />} />
            <Route path="/tanktops" element={<ProductPage />} />
            <Route path="/whitetshirt" element={<ProductPage />} />
            <Route path="/coats" element={<ProductPage />} />
            <Route path="/black" element={<ProductPage />} />

            {/* Search and Discovery */}
            <Route path="/search" element={<Search />} />
            <Route path="/random" element={<RandomProducts />} />

            {/* Checkout & Orders */}
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/confirm" element={<OrderConfirm />} />
            <Route path="/history" element={<OrderHistory />} />

            {/* Payment Methods */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/online" element={<OnlinePayment />} />
            <Route path="/cash" element={<CashPayment />} />
            <Route path="/debit" element={<DebitPayment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
