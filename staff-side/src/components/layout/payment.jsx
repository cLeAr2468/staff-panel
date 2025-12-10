import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ShoppingBasket, CreditCard, ArrowLeft, CheckCircle } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import CustomerHeader from "./CustomerHeader"
import GcashImage from "../../assets/Gcash.jpg"

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { payment, formData = {} } = location.state || {};

  // Prepare laundry items similar to CustomerLaundryInfo
  const laundryItems = [
    { name: "Shirts", quantity: Number(formData.shirts) || 2, price: 15 },
    { name: "Pants", quantity: Number(formData.pants) || 1, price: 20 },
    { name: "Jeans", quantity: Number(formData.jeans) || 1, price: 25 },
    { name: "Shorts", quantity: Number(formData.shorts) || 0, price: 18 },
    { name: "Towel", quantity: Number(formData.towel) || 3, price: 12 },
    { name: "Pillow Case", quantity: Number(formData.pillowCase) || 0, price: 10 },
    { name: "Bed Sheets", quantity: Number(formData.bedSheets) || 1, price: 30 },
  ].filter((item) => item.quantity > 0);

  const totalAmount = laundryItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleMarkAsPaid = () => {
    console.log("Marking order as paid:", payment?.id);
    // Here you would update the order status to paid
    // Then navigate back or show success message
    navigate("/dashboard/pending");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <CustomerHeader />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-gray-500">Process customer payment</p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-3 sm:p-6">
            {/* Laundry Status */}
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <ShoppingBasket className="w-5 h-5" /> LAUNDRY STATUS
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Status</p>
                  <p className="flex items-center gap-2 text-sm">
                    <Checkbox checked /> Ready to pick up
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 border rounded-md p-2 sm:p-3 text-xs sm:text-sm space-y-2">
                <div>
                  <p className="text-xs text-gray-500"><strong>LAUNDRY ID:</strong></p>
                  <p className="font-semibold text-gray-900">{payment?.id || "25-0001"}</p>
                </div>

                <div className="border-t pt-2">
                  <p className="text-xs text-gray-500 mb-1"><strong>CUSTOMER:</strong></p>
                  <p className="font-semibold text-gray-900 mb-2">{payment?.customer || "N/A"}</p>
                  <p className="text-xs text-gray-500 mb-1"><strong>ADDRESS:</strong></p>
                  <p className="text-gray-900 text-xs">{formData?.cus_address || "N/A"}</p>
                  <p className="text-xs text-gray-500 mb-1"><strong>KLG:</strong></p>
                  <p className="text-gray-900 text-xs">{formData?.klg || "N/A"}</p>

                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                <div className="space-y-2 text-sm">
                  {laundryItems.length > 0 ? (
                    <>
                      <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 border-b pb-2 mb-2">
                        <div>Item</div>
                        <div className="text-right">Qty</div>
                      </div>
                      {laundryItems.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                          <div>{item.name}</div>
                          <div className="text-right">{item.quantity}</div>
                          <div className="text-right">₱{(item.quantity * item.price).toFixed(2)}</div>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold text-gray-900">
                          <span>Total:</span>
                          <span>₱{totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 text-xs">No items added</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="md:col-span-2">
              <h3 className="font-bold flex items-center gap-2 mb-4 ml-24">
                <CreditCard className="w-5 h-5" /> GCASH PAYMENT
              </h3>

              {/* Gcash QR Code Image */}
              <div className="mb-4">
                <div className="overflow-hidden w-full max-w-sm">
                  <img 
                    src={payment?.gcashReceipt || GcashImage} 
                    alt="Gcash QR Code" 
                    className="w-full h-auto object-contain max-h-96"
                  />
                </div>
              </div>
              
              {payment?.gcashReceipt && (
                <div className="mb-4">
                  <Badge className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1">
                    Customer Receipt Uploaded
                  </Badge>
                </div>
              )}

              {payment?.gcashReceipt && (
                <div className="mt-4 border-2 border-emerald-500 rounded-md p-6 bg-emerald-50 space-y-4">
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900 text-lg">Payment Receipt Received</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Customer has uploaded their Gcash payment receipt
                    </p>
                  </div>
                  
                  <div className="flex justify-center pt-2">
                    <Button
                      type="button"
                      onClick={handleMarkAsPaid}
                      className="text-sm h-12 px-8 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mark as Paid
                    </Button>
                  </div>
                </div>
              )}
            </div>


          </CardContent>
        </Card>
      </div>
    </div>
  )
}
