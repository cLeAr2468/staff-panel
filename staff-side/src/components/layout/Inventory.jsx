import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit2, Package, AlertCircle, CheckCircle, Save, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomerHeader from "./CustomerHeader"

export default function Inventory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({});

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Detergent Premium",
      category: "Cleaning Supplies",
      quantity: 45,
      unit: "liters",
      reorderLevel: 20,
      status: "in-stock",
      lastRestocked: "2024-12-05",
      price: 350,
      dateAdded: "2024-11-01",
      lastUpdated: "2024-12-05"
    },
    {
      id: 2,
      name: "Fabric Softener",
      category: "Cleaning Supplies",
      quantity: 32,
      unit: "liters",
      reorderLevel: 15,
      status: "in-stock",
      lastRestocked: "2024-12-03",
      price: 280,
      dateAdded: "2024-11-05",
      lastUpdated: "2024-12-03"
    },
    {
      id: 3,
      name: "Bleach",
      category: "Cleaning Supplies",
      quantity: 8,
      unit: "liters",
      reorderLevel: 25,
      status: "low-stock",
      lastRestocked: "2024-11-28",
      price: 220,
      dateAdded: "2024-10-15",
      lastUpdated: "2024-11-28"
    },
    {
      id: 4,
      name: "Starch Spray",
      category: "Finishing",
      quantity: 15,
      unit: "bottles",
      reorderLevel: 10,
      status: "in-stock",
      lastRestocked: "2024-12-02",
      price: 180,
      dateAdded: "2024-11-10",
      lastUpdated: "2024-12-02"
    },
    {
      id: 5,
      name: "Oxygen Cleaner",
      category: "Cleaning Supplies",
      quantity: 0,
      unit: "kg",
      reorderLevel: 5,
      status: "out-of-stock",
      lastRestocked: "2024-11-15",
      price: 450,
      dateAdded: "2024-10-20",
      lastUpdated: "2024-11-15"
    },
    {
      id: 6,
      name: "Dryer Sheets",
      category: "Drying",
      quantity: 120,
      unit: "sheets",
      reorderLevel: 50,
      status: "in-stock",
      lastRestocked: "2024-12-04",
      price: 95,
      dateAdded: "2024-11-12",
      lastUpdated: "2024-12-04"
    },
    {
      id: 7,
      name: "Perfume Enhancer",
      category: "Finishing",
      quantity: 22,
      unit: "bottles",
      reorderLevel: 12,
      status: "in-stock",
      lastRestocked: "2024-12-01",
      price: 320,
      dateAdded: "2024-11-08",
      lastUpdated: "2024-12-01"
    },
    {
      id: 8,
      name: "Laundry Bags",
      category: "Supplies",
      quantity: 5,
      unit: "boxes",
      reorderLevel: 15,
      status: "low-stock",
      lastRestocked: "2024-10-20",
      price: 1200,
      dateAdded: "2024-09-15",
      lastUpdated: "2024-10-20"
    }
  ]);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "in-stock":
        return "bg-emerald-50 border-emerald-200";
      case "low-stock":
        return "bg-amber-50 border-amber-200";
      case "out-of-stock":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "in-stock":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "low-stock":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "out-of-stock":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  const stats = [
    {
      label: "Total Items",
      value: inventoryItems.length,
      icon: Package,
      color: "bg-sky-100 text-sky-700"
    },
    {
      label: "In Stock",
      value: inventoryItems.filter(i => i.status === "in-stock").length,
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      label: "Low Stock",
      value: inventoryItems.filter(i => i.status === "low-stock").length,
      icon: AlertCircle,
      color: "bg-amber-100 text-amber-700"
    },
    {
      label: "Out of Stock",
      value: inventoryItems.filter(i => i.status === "out-of-stock").length,
      icon: AlertCircle,
      color: "bg-red-100 text-red-700"
    }
  ];

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditedData({ ...item });
  };

  const handleSave = () => {
    // Update status based on quantity and reorder level
    const updatedData = {
      ...editedData,
      status: editedData.quantity === 0 
        ? 'out-of-stock' 
        : editedData.quantity <= editedData.reorderLevel 
        ? 'low-stock' 
        : 'in-stock',
      lastUpdated: new Date().toISOString().split('T')[0] // Update last modified date
    };
    
    setInventoryItems(items =>
      items.map(item =>
        item.id === editingItem ? updatedData : item
      )
    );
    setEditingItem(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditedData({});
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <CustomerHeader />

        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Inventory Items</h2>
                <p className="text-sm text-gray-500">View and manage all inventory items</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    className="pl-10 bg-slate-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-sky-600 hover:bg-sky-700 w-full sm:w-auto"
                  onClick={() => navigate("/add-inventory-item")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {/* Desktop Header */}
              <div className="hidden lg:grid grid-cols-12 gap-3 px-4 py-3 bg-slate-100 rounded-lg font-semibold text-xs text-gray-700 uppercase tracking-wide">
                <div className="col-span-2">Item Name</div>
                <div className="col-span-1">Category</div>
                <div className="col-span-1">Quantity</div>
                <div className="col-span-1">Price/Unit</div>
                <div className="col-span-1">Amount</div>
                <div className="col-span-2">Date Added</div>
                <div className="col-span-2">Last Updated</div>
                <div className="col-span-2">Actions</div>
              </div>
              
              {/* Mobile Header */}
              <div className="lg:hidden px-2 py-2">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'}
                </p>
              </div>

              {/* Items */}
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg border transition shadow-sm hover:shadow-md ${getStatusColor(item.status)} ${
                      editingItem === item.id ? 'ring-2 ring-sky-500' : ''
                    }`}
                  >
                    <div className="p-4">
                    {/* Mobile View - Card Style */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base truncate">{item.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 py-2 border-t border-slate-200">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Quantity</p>
                          <p className="font-semibold text-gray-900 text-sm">{item.quantity} {item.unit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Price/Unit</p>
                          <p className="font-semibold text-gray-900 text-sm">₱{item.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Total Amount</p>
                          <p className="font-semibold text-sky-700 text-sm">₱{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Last Updated</p>
                          <p className="font-semibold text-gray-900 text-sm">{item.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(item)} 
                          className="w-full h-9"
                        >
                          <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Desktop View - Table Row Style */}
                    <div className="hidden lg:grid grid-cols-12 gap-3 items-center text-sm">
                      <div className="col-span-2">
                        <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {getStatusIcon(item.status)}
                          <span className="text-xs text-gray-500">{getStatusLabel(item.status)}</span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <p className="text-xs text-gray-600 truncate">{item.category}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="font-semibold text-gray-900">{item.quantity}</p>
                        <p className="text-xs text-gray-500">{item.unit}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="font-semibold text-gray-900">₱{item.price.toLocaleString()}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="font-semibold text-emerald-700">₱{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-900">{item.dateAdded}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-900">{item.lastUpdated}</p>
                      </div>
                      <div className="col-span-2 flex gap-1.5">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(item)}
                        >
                          <Edit2 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    </div>
                    
                    {/* Edit Form - Only shown when editing */}
                    {editingItem === item.id && (
                      <div className="border-t border-slate-300 bg-white p-4 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                          <Edit2 className="h-4 w-4" />
                          Edit Item Details
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Item Name</label>
                              <Input
                                value={editedData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Item name"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Category</label>
                              <Input
                                value={editedData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                placeholder="Category"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Quantity</label>
                              <Input
                                type="number"
                                value={editedData.quantity}
                                onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                                placeholder="Quantity"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Unit</label>
                              <Input
                                value={editedData.unit}
                                onChange={(e) => handleInputChange('unit', e.target.value)}
                                placeholder="e.g., liters, kg, bottles"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Unit Price (₱)</label>
                              <Input
                                type="number"
                                value={editedData.price}
                                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                placeholder="Price"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Reorder Level</label>
                              <Input
                                type="number"
                                value={editedData.reorderLevel}
                                onChange={(e) => handleInputChange('reorderLevel', Number(e.target.value))}
                                placeholder="Minimum quantity"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Date Added</label>
                              <Input
                                type="date"
                                value={editedData.dateAdded}
                                onChange={(e) => handleInputChange('dateAdded', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Last Restocked</label>
                              <Input
                                type="date"
                                value={editedData.lastRestocked}
                                onChange={(e) => handleInputChange('lastRestocked', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Total Amount</label>
                              <p className="font-semibold text-gray-900 py-2">
                                ₱{(editedData.price * editedData.quantity).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Last Updated</label>
                              <p className="text-sm text-gray-600 py-2">
                                {editedData.lastUpdated}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200">
                            <Button 
                              onClick={handleSave} 
                              className="bg-sky-600 hover:bg-sky-700 flex-1 sm:flex-none"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={handleCancel}
                              className="flex-1 sm:flex-none"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No items found matching your search</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="w-full sm:w-auto"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
