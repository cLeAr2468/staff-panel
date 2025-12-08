import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Package, CheckCircle, Clock, Phone, MapPin } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomerHeader from "./CustomerHeader"

export default function ReadyForPickup() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for ready for pickup orders
  const [pickupOrders] = useState([
    {
      id: 1,
      orderId: "25-0001",
      customerName: "John Doe",
      phone: "+63 912 345 6789",
      address: "123 Main St, Quezon City",
      items: "Regular Wash + Fold",
      bags: 2,
      weight: "5 kg",
      amount: 450,
      readyDate: "2024-12-08",
      readyTime: "10:30 AM",
      status: "ready"
    },
    {
      id: 2,
      orderId: "25-0002",
      customerName: "Jane Smith",
      phone: "+63 923 456 7890",
      address: "456 Oak Ave, Makati City",
      items: "Premium Wash + Iron",
      bags: 3,
      weight: "7.5 kg",
      amount: 850,
      readyDate: "2024-12-08",
      readyTime: "11:00 AM",
      status: "ready"
    },
    {
      id: 3,
      orderId: "25-0003",
      customerName: "Mike Johnson",
      phone: "+63 934 567 8901",
      address: "789 Pine Rd, Pasig City",
      items: "Dry Cleaning",
      bags: 1,
      weight: "3 kg",
      amount: 650,
      readyDate: "2024-12-08",
      readyTime: "2:00 PM",
      status: "ready"
    },
    {
      id: 4,
      orderId: "25-0004",
      customerName: "Sarah Williams",
      phone: "+63 945 678 9012",
      address: "321 Elm St, Taguig City",
      items: "Regular Wash + Fold",
      bags: 2,
      weight: "6 kg",
      amount: 500,
      readyDate: "2024-12-08",
      readyTime: "3:30 PM",
      status: "ready"
    }
  ]);

  const filteredOrders = pickupOrders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone.includes(searchTerm)
  );

  const handleMarkAsPickedUp = (orderId) => {
    console.log("Mark as picked up:", orderId);
    // Here you would update the order status
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <CustomerHeader />

        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Ready for Pickup</h1>
            <p className="text-sm text-gray-500">Orders ready for customer pickup</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Pickup Orders</h2>
                <p className="text-sm text-gray-500">
                  {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} ready
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by order ID, name, or phone..."
                  className="pl-10 bg-slate-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-emerald-500 hover:shadow-md transition">
                    <CardContent className="p-4">
                      {/* Mobile View */}
                      <div className="lg:hidden space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100">
                                {order.orderId}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {order.bags} {order.bags === 1 ? 'bag' : 'bags'}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 text-base">{order.customerName}</h3>
                            <p className="text-sm text-gray-600">{order.items}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-sky-700 text-lg">₱{order.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{order.weight}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 py-3 border-t border-slate-200">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{order.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">{order.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-700">Ready: {order.readyTime}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsPickedUp(order.orderId)}
                            className="w-full bg-sky-600 hover:bg-sky-700"
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            Mark Picked Up
                          </Button>
                        </div>
                      </div>

                      {/* Desktop View */}
                      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100">
                              {order.orderId}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3" />
                            {order.phone}
                          </p>
                        </div>

                        <div className="col-span-3">
                          <p className="text-sm text-gray-700">{order.items}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {order.address}
                          </p>
                        </div>

                        <div className="col-span-2 text-center">
                          <p className="text-sm font-semibold text-gray-900">{order.bags} bags</p>
                          <p className="text-xs text-gray-500">{order.weight}</p>
                        </div>

                        <div className="col-span-2 text-center">
                          <p className="text-sm font-semibold text-gray-900 flex items-center gap-1 justify-center">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            {order.readyTime}
                          </p>
                          <p className="text-xs text-gray-500">{order.readyDate}</p>
                        </div>

                        <div className="col-span-2 text-right space-y-2">
                          <p className="text-lg font-bold text-sky-700">₱{order.amount.toLocaleString()}</p>
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleMarkAsPickedUp(order.orderId)}
                              className="bg-sky-600 hover:bg-sky-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Picked Up
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No orders found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {searchTerm ? "Try adjusting your search" : "No orders ready for pickup"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
