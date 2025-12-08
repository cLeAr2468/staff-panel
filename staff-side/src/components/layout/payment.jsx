import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShoppingBasket, CreditCard, FileCheck, ArrowLeft } from "lucide-react"
import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CustomerHeader from "./CustomerHeader"

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { payment, formData = {} } = location.state || {};

  const [proofFile, setProofFile] = useState(null);
  const [paymentOption, setPaymentOption] = useState("cash");
  const fileInputRef = useRef(null);

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

  const handleUploadClick = () => {
    if (paymentOption !== "gcash") return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofFile(file);
    }
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
            <div>
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5" /> PAYMENT STATUS
              </h3>
              <p className="text-green-700 font-semibold">PAID</p>

              <h4 className="mt-4 font-bold">PAYMENT OPTION</h4>
              <RadioGroup value={paymentOption} onValueChange={setPaymentOption} className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <label htmlFor="cash">CASH ON PICK-UP</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="gcash" id="gcash" />
                  <label htmlFor="gcash">G-CASH</label>
                </div>
              </RadioGroup>

              <div className="mt-3 sm:mt-4 border rounded-md p-2 sm:p-3 text-center space-y-2">
                <p className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 justify-center">
                  <FileCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                  {proofFile ? "File selected" : "Proof Uploaded"}
                </p>
                {proofFile && (
                  <p className="text-xs text-gray-500 truncate">{proofFile.name}</p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                  disabled={paymentOption !== "gcash"}
                  onClick={handleUploadClick}
                >
                  {paymentOption !== "gcash" ? "Enable G-Cash to upload" : proofFile ? "Change image" : "Upload image"}
                </Button>
                <Button
                  type="button"
                  className="text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4 bg-sky-600 text-white hover:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-500"
                  disabled={paymentOption !== "gcash" || !proofFile}
                >
                  Submit proof
                </Button>
              </div>
            </div>


          </CardContent>
        </Card>
      </div>
    </div>
  )
}
