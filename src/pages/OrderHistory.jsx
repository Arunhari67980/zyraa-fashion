import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

export default function OrderHistory() {
  const { getOrders } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders(getOrders());
  }, [getOrders]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'shipped':
        return '→';
      case 'processing':
        return '⏱';
      default:
        return '•';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#e8f5e9] text-[#4caf50] border border-[#4caf50]';
      case 'shipped':
        return 'bg-[#e3f2fd] text-[#2196f3] border border-[#2196f3]';
      case 'processing':
        return 'bg-[#fff3e0] text-[#ff9800] border border-[#ff9800]';
      default:
        return 'bg-[#f5f5f5] text-[#666] border border-[#e0e0e0]';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-[#2c2c2c] mb-3 tracking-wide">
            Order History
          </h1>
          <p className="text-[#666] font-light">Track and manage all your purchases</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div
                key={order.id}
                className="card group hover-lift animate-slide-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                    {/* Order Number & Date */}
                    <div>
                      <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">
                        Order ID
                      </p>
                      <p className="text-lg text-[#b8860b] font-light group-hover:text-[#9a7009] transition-colors mb-3">
                        {order.id}
                      </p>
                      <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">
                        Date
                      </p>
                      <p className="text-sm text-[#2c2c2c] font-light">
                        {formatDate(order.date)}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="md:col-span-2">
                      <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-2">
                        Items ({order.items.length})
                      </p>
                      <div className="space-y-1">
                        {order.items.slice(0, 3).map((item) => (
                          <p key={item.id} className="text-sm text-[#2c2c2c] font-light">
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-[#b8860b] font-light">
                            +{order.items.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Total & Status */}
                    <div>
                      <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">
                        Total
                      </p>
                      <p className="text-lg text-[#2c2c2c] font-light mb-3">
                        ₹{order.total.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <span>{getStatusIcon(order.status)}</span>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="btn btn-secondary btn-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 card">
            <div className="text-6xl mb-4 opacity-30">📦</div>
            <p className="text-[#2c2c2c] font-light text-2xl mb-2">
              No Orders Yet
            </p>
            <p className="text-[#666] text-sm font-light mb-8">
              Start shopping to place your first order and see it here
            </p>
            <a href="/" className="btn btn-primary">
              Browse Products
            </a>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && setSelectedOrder(null)}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#b8860b] hover:text-white transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-[#e0d9cc]">
                  <p className="text-[#b8860b] text-sm font-medium tracking-wide uppercase mb-1">Order Details</p>
                  <h2 className="text-2xl md:text-3xl font-light text-[#2c2c2c]">{selectedOrder.id}</h2>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-[#e0d9cc]">
                  <div>
                    <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">Date</p>
                    <p className="text-[#2c2c2c] font-light">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-light ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">Payment</p>
                    <p className="text-[#2c2c2c] font-light capitalize">{selectedOrder.paymentMethod || 'Card'}</p>
                  </div>
                  <div>
                    <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-1">Items</p>
                    <p className="text-[#2c2c2c] font-light">{selectedOrder.items.length} items</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="mb-6">
                  <p className="text-[#999] text-xs font-light uppercase tracking-wider mb-4">Products Ordered</p>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => {
                      const price = typeof item.price === 'string'
                        ? parseFloat(item.price.replace('₹', '').replace(',', ''))
                        : item.price;
                      return (
                        <div key={item.id} className="flex gap-4 p-4 bg-[#f8f7f4] rounded-lg">
                          <div className="w-16 h-16 flex-shrink-0 bg-[#e0d9cc] rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[#2c2c2c] font-light mb-1">{item.name}</h4>
                            <p className="text-[#999] text-sm font-light">Qty: {item.quantity || 1}</p>
                            {item.size && <p className="text-[#999] text-sm font-light">Size: {item.size}</p>}
                          </div>
                          <div className="text-right">
                            <p className="text-[#b8860b] font-light">₹{(price * (item.quantity || 1)).toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Total */}
                <div className="bg-[#f4e4c1] rounded-lg p-6">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666] font-light">Subtotal</span>
                      <span className="text-[#2c2c2c]">₹{selectedOrder.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666] font-light">Shipping</span>
                      <span className="text-[#2c2c2c]">₹{(selectedOrder.shipping || 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666] font-light">Tax (18%)</span>
                      <span className="text-[#2c2c2c]">₹{(selectedOrder.tax || selectedOrder.total * 0.18).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[#d4c4a8]">
                    <span className="text-[#2c2c2c] font-medium">Grand Total</span>
                    <span className="text-xl text-[#b8860b] font-medium">
                      ₹{(selectedOrder.total + (selectedOrder.shipping || 100) + (selectedOrder.tax || selectedOrder.total * 0.18)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="btn btn-primary flex-1"
                  >
                    Close
                  </button>
                  <a href="/delivery" className="btn btn-secondary flex-1 text-center">
                    Track Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
