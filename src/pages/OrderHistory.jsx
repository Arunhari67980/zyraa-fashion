import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

export default function OrderHistory() {
  const { getOrders } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

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
                      <button className="btn btn-secondary btn-sm">
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
      </div>
    </div>
  );
}
