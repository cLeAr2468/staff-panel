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
    { name: "Shirts", quantity: Number(formData.shirts) || 0, price: 15 },
    { name: "Pants", quantity: Number(formData.pants) || 0, price: 20 },
    { name: "Jeans", quantity: Number(formData.jeans) || 0, price: 25 },
    { name: "Shorts", quantity: Number(formData.shorts) || 0, price: 18 },
    { name: "Towel", quantity: Number(formData.towel) || 0, price: 12 },
    { name: "Pillow Case", quantity: Number(formData.pillowCase) || 0, price: 10 },
    { name: "Bed Sheets", quantity: Number(formData.bedSheets) || 0, price: 30 },
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
              <h2 className="text-2xl font-semibold text-gray-900">Laundry Record Details</h2>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium">ID:</span> {record.id} | <span className="font-medium">Customer:</span> {record.customer}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Service:</span> {record.service} | <span className="font-medium">Weight:</span> {record.weight}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-lg font-semibold">Laundry Items</h3>
              </div>

          <div className="space-y-2">
            {laundryItems.length > 0 ? (
              <>
                {/* Header */}
                <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-500">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerLaundryInfo;
