import { Card, CardContent } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CustomerHeader from "./CustomerHeader";

const CustomerLaundryInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the record data from location state or use default values
  const { record, formData = {} } = location.state || {};
  const laundryItems = [
    { name: "Shirts", quantity: Number(formData.shirts) || 2, price: 15 },      // default 2
    { name: "Pants", quantity: Number(formData.pants) || 1, price: 20 },        // default 1
    { name: "Jeans", quantity: Number(formData.jeans) || 1, price: 25 },        // default 1
    { name: "Shorts", quantity: Number(formData.shorts) || 0, price: 18 },      // default 0
    { name: "Towel", quantity: Number(formData.towel) || 3, price: 12 },        // default 3
    { name: "Pillow Case", quantity: Number(formData.pillowCase) || 0, price: 10 }, // default 0
    { name: "Bed Sheets", quantity: Number(formData.bedSheets) || 1, price: 30 },   // default 1
  ].filter((item) => item.quantity > 0);


  const totalAmount = laundryItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  if (!record) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <CustomerHeader />
          <Button
            variant="outline"
            className="flex items-center gap-2 mb-6"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Records
          </Button>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <p className="text-center py-8 text-gray-500">No record data available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <CustomerHeader />
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Records
        </Button>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Details</h2>
              <p className="text-sm  mt-2">
                <span className="font-medium text-gray-500">ID:</span> {record.id}
              </p>
              <p><span className="font-medium text-gray-500">Name:</span> {record.customer}</p>
              <p className="text-sm">
                <span className="font-medium text-gray-500">Address:</span> {record.address || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-500">Service:</span> {record.service}
              </p>
              <p><span className="font-medium text-gray-500">Weight:</span> {record.weight}</p>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-lg font-semibold">Laundry Items</h3>
              </div>

              <div className="space-y-2">
                {laundryItems.length > 0 ? (
                  <>
                    {/* Header */}
                    <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-500 lg:font-semibold lg:text-base lg:border-b lg:pb-1 lg:mb-2 lg:text-gray-700">
                      <div>Item</div>
                      <div className="text-right">Qty</div>
                      <div className="text-right">Amount</div>
                    </div>

                    {/* Items */}
                    {laundryItems.map((item, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2">
                        <div>{item.name}</div>
                        <div className="text-right">{item.quantity}</div>
                        <div className="text-right">
                          ₱{(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₱{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No items added yet
                  </p>
                )}
              </div>
              <Button className="bg-sky-600 hover:bg-sky-700">Process</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerLaundryInfo;
