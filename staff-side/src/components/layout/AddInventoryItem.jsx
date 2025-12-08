import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Package } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomerHeader from "./CustomerHeader"

export default function AddInventoryItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    reorderLevel: "",
    dateAdded: new Date().toISOString().split('T')[0],
    lastRestocked: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Valid quantity is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.reorderLevel || formData.reorderLevel < 0) newErrors.reorderLevel = "Valid reorder level is required";
    if (!formData.dateAdded) newErrors.dateAdded = "Date added is required";
    if (!formData.lastRestocked) newErrors.lastRestocked = "Last restocked date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Calculate status based on quantity and reorder level
      const status = formData.quantity === 0 
        ? 'out-of-stock' 
        : Number(formData.quantity) <= Number(formData.reorderLevel)
        ? 'low-stock' 
        : 'in-stock';

      const newItem = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        reorderLevel: Number(formData.reorderLevel),
        status,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      console.log("New Item:", newItem);
      // Here you would typically save to your backend/state management
      
      // Navigate back to inventory
      navigate("/inventory");
    }
  };

  const handleCancel = () => {
    navigate("/inventory");
  };

  const totalAmount = (Number(formData.price) || 0) * (Number(formData.quantity) || 0);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <CustomerHeader />

        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCancel}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Item</h1>
            <p className="text-sm text-gray-500">Add a new item to your inventory</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Desktop View - 2 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Item Name */}
                <div className="md:col-span-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Item Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Detergent Premium"
                    className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Cleaning Supplies"
                    className={`mt-1 ${errors.category ? 'border-red-500' : ''}`}
                  />
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Unit */}
                <div>
                  <Label htmlFor="unit" className="text-sm font-medium text-gray-700">
                    Unit <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    placeholder="e.g., liters, kg, bottles"
                    className={`mt-1 ${errors.unit ? 'border-red-500' : ''}`}
                  />
                  {errors.unit && (
                    <p className="text-xs text-red-500 mt-1">{errors.unit}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Quantity <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="0"
                    className={`mt-1 ${errors.quantity ? 'border-red-500' : ''}`}
                  />
                  {errors.quantity && (
                    <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>
                  )}
                </div>

                {/* Unit Price */}
                <div>
                  <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                    Unit Price (₱) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    className={`mt-1 ${errors.price ? 'border-red-500' : ''}`}
                  />
                  {errors.price && (
                    <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                  )}
                </div>

                {/* Reorder Level */}
                <div>
                  <Label htmlFor="reorderLevel" className="text-sm font-medium text-gray-700">
                    Reorder Level <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    min="0"
                    value={formData.reorderLevel}
                    onChange={(e) => handleInputChange('reorderLevel', e.target.value)}
                    placeholder="Minimum quantity"
                    className={`mt-1 ${errors.reorderLevel ? 'border-red-500' : ''}`}
                  />
                  {errors.reorderLevel && (
                    <p className="text-xs text-red-500 mt-1">{errors.reorderLevel}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Alert when stock falls below this level</p>
                </div>

                {/* Date Added */}
                <div>
                  <Label htmlFor="dateAdded" className="text-sm font-medium text-gray-700">
                    Date Added <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateAdded"
                    type="date"
                    value={formData.dateAdded}
                    onChange={(e) => handleInputChange('dateAdded', e.target.value)}
                    className={`mt-1 ${errors.dateAdded ? 'border-red-500' : ''}`}
                  />
                  {errors.dateAdded && (
                    <p className="text-xs text-red-500 mt-1">{errors.dateAdded}</p>
                  )}
                </div>

                {/* Last Restocked */}
                <div>
                  <Label htmlFor="lastRestocked" className="text-sm font-medium text-gray-700">
                    Last Restocked <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastRestocked"
                    type="date"
                    value={formData.lastRestocked}
                    onChange={(e) => handleInputChange('lastRestocked', e.target.value)}
                    className={`mt-1 ${errors.lastRestocked ? 'border-red-500' : ''}`}
                  />
                  {errors.lastRestocked && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastRestocked}</p>
                  )}
                </div>
              </div>

              {/* Summary Section */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Quantity</p>
                    <p className="font-semibold text-gray-900">
                      {formData.quantity || 0} {formData.unit || 'units'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                    <p className="font-semibold text-gray-900">
                      ₱{Number(formData.price || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                    <p className="font-semibold text-sky-700 text-lg">
                      ₱{totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="font-semibold text-gray-900">
                      {formData.quantity === "" || formData.quantity === "0" 
                        ? "Out of Stock"
                        : Number(formData.quantity) <= Number(formData.reorderLevel || 0)
                        ? "Low Stock"
                        : "In Stock"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none sm:w-32"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none sm:w-40 bg-sky-600 hover:bg-sky-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card - Mobile Only */}
        <Card className="shadow-sm md:hidden bg-sky-50 border-sky-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Package className="h-5 w-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-sky-900 mb-1">Quick Tip</h4>
                <p className="text-xs text-sky-700">
                  Fill in all required fields marked with * to add the item to your inventory.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
