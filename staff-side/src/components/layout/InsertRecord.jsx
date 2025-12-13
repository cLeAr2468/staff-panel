import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ArrowLeft, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import CustomerHeader from "./CustomerHeader";

const InsertRecord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cus_id: '',
    name: '',
    cus_phoneNum: '',
    cus_address: '',
    batch: '',
    laundryId: '',
    shirts: '',
    pants: '',
    jeans: '',
    shorts: '',
    towel: '',
    pillowCase: '',
    bedSheets: '',
    kl: '',
    washing: true,
    payNow: false,
    payLater: false,
    totalAmount: "0.00",
    itemCount: "0",
  });

  // Inventory data from Inventory.jsx
  const inventoryItems = [
    {
      id: 1,
      name: "Detergent Premium",
      category: "Cleaning Supplies",
      quantity: 45,
      unit: "liters",
      price: 350,
    },
    {
      id: 2,
      name: "Fabric Softener",
      category: "Cleaning Supplies",
      quantity: 32,
      unit: "liters",
      price: 280,
    },
    {
      id: 3,
      name: "Bleach",
      category: "Cleaning Supplies",
      quantity: 8,
      unit: "liters",
      price: 220,
    },
    {
      id: 4,
      name: "Starch Spray",
      category: "Finishing",
      quantity: 15,
      unit: "bottles",
      price: 180,
    },
    {
      id: 5,
      name: "Oxygen Cleaner",
      category: "Cleaning Supplies",
      quantity: 0,
      unit: "kg",
      price: 450,
    },
    {
      id: 6,
      name: "Dryer Sheets",
      category: "Drying",
      quantity: 120,
      unit: "sheets",
      price: 95,
    },
    {
      id: 7,
      name: "Perfume Enhancer",
      category: "Finishing",
      quantity: 22,
      unit: "bottles",
      price: 320,
    },
    {
      id: 8,
      name: "Laundry Bags",
      category: "Supplies",
      quantity: 5,
      unit: "boxes",
      price: 1200,
    }
  ];

  // Inventory search and selection states
  const [inventorySearchQuery, setInventorySearchQuery] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const customers = [
    { cus_id: "C001", cus_fName: "John", cus_lName: "Doe", cus_phoneNum: "1234567890", cus_address: "123 Main St" },
    { cus_id: "C002", cus_fName: "Jane", cus_lName: "Smith", cus_phoneNum: "0987654321", cus_address: "456 Oak Ave" },
    { cus_id: "C003", cus_fName: "Mike", cus_lName: "Johnson", cus_phoneNum: "5551234567", cus_address: "789 Pine Rd" },
  ];
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const fetchCustomerData = (customerId) => {
    const customer = customers.find(c => c.cus_id === customerId);
    if (customer) {
      return customer;
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cus_id' && value.trim() !== '') {
      const customerData = fetchCustomerData(value);
      
      if (customerData) {
        setFormData(prev => ({
          ...prev,
          cus_id: value,
          name: `${customerData.cus_fName} ${customerData.cus_lName}`,
          cus_phoneNum: customerData.cus_phoneNum || '',
          cus_address: customerData.cus_address || ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          cus_id: value,
          name: '',
          cus_phoneNum: '',
          cus_address: ''
        }));
      }
      return;
    }

    // Handle payment checkboxes - only one can be selected at a time
    if (name === 'payNow' && checked) {
      setFormData(prev => ({
        ...prev,
        payNow: true,
        payLater: false,
      }));
      return;
    }

    if (name === 'payLater' && checked) {
      setFormData(prev => ({
        ...prev,
        payNow: false,
        payLater: true,
      }));
      return;
    }

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      const numValue = parseFloat(value);
      if (numValue < 0) {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateTotal = () => {
    const laundryItems = [
      "shirts",
      "pants",
      "jeans",
      "shorts",
      "towel",
      "pillowCase",
      "bedSheets",
    ];

    let laundryTotal = 0;
    let laundryCount = 0;

    // Calculate laundry items total
    laundryItems.forEach((item) => {
      const quantity = parseInt(formData[item]) || 0;
      const price = getItemPrice(item);
      laundryTotal += quantity * price;
      laundryCount += quantity;
    });

    // Calculate inventory items total
    let inventoryTotal = 0;
    let inventoryCount = 0;
    selectedInventoryItems.forEach((item) => {
      const quantity = parseInt(item.usedQuantity) || 0;
      inventoryTotal += item.price * quantity;
      inventoryCount += quantity;
    });

    // Combine totals
    const grandTotal = laundryTotal + inventoryTotal;
    const totalCount = laundryCount + inventoryCount;

    setFormData((prev) => ({
      ...prev,
      totalAmount: grandTotal.toFixed(2),
      itemCount: totalCount.toString(),
    }));
  };

  // Recalculate total whenever laundry items or inventory items change
  useEffect(() => {
    calculateTotal();
  }, [
    formData.shirts,
    formData.pants,
    formData.jeans,
    formData.shorts,
    formData.towel,
    formData.pillowCase,
    formData.bedSheets,
    selectedInventoryItems
  ]);

  const getItemPrice = (item) => {
    const prices = {
      shirts: 15.0,
      pants: 20.0,
      jeans: 25.0,
      shorts: 18.0,
      towel: 12.0,
      pillowCase: 10.0,
      bedSheets: 30.0,
    };
    return prices[item] || 0;
  };

  // Inventory search handler
  const handleInventorySearch = (query) => {
    setInventorySearchQuery(query);
    if (!query.trim()) {
      setFilteredInventory([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = inventoryItems.filter(
      (item) =>
        item.id.toString().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredInventory(filtered);
  };

  // Add inventory item to selected list
  const handleInventorySelect = (item) => {
    const exists = selectedInventoryItems.find(i => i.id === item.id);
    if (!exists) {
      setSelectedInventoryItems([...selectedInventoryItems, { ...item, usedQuantity: 1 }]);
    }
    setInventorySearchQuery("");
    setFilteredInventory([]);
  };

  // Update quantity for selected inventory item
  const handleInventoryQuantityChange = (itemId, quantity) => {
    setSelectedInventoryItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, usedQuantity: Math.max(0, parseInt(quantity) || 0) } : item
      )
    );
  };

  // Remove inventory item from selected list
  const handleRemoveInventoryItem = (itemId) => {
    setSelectedInventoryItems(items => items.filter(item => item.id !== itemId));
  };

  const submitLaundryRecord = () => {
    const newLaundryId = `LR${Date.now()}`;
    console.log('Laundry record submitted:', {
      cus_id: formData.cus_id,
      batch: formData.batch,
      shirts: parseInt(formData.shirts) || 0,
      pants: parseInt(formData.pants) || 0,
      jeans: parseInt(formData.jeans) || 0,
      shorts: parseInt(formData.shorts) || 0,
      towels: parseInt(formData.towel) || 0,
      pillow_case: parseInt(formData.pillowCase) || 0,
      bed_sheets: parseInt(formData.bedSheets) || 0,
      washing: formData.washing,
      kg: formData.kl,
      num_items: parseInt(formData.itemCount) || 0,
      total_amount: parseFloat(formData.totalAmount) || 0,
      laundryId: newLaundryId,
      inventoryUsed: selectedInventoryItems
    });
    navigate('/dashboard/pending');
  };

  const handleSubmit = () => {
    submitLaundryRecord();
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCustomers(customers);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = customers.filter(
      (customer) =>
        customer.cus_id.toLowerCase().includes(searchTerm) ||
        customer.cus_fName.toLowerCase().includes(searchTerm) ||
        customer.cus_lName.toLowerCase().includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  };

  const handleCustomerSelect = (customer) => {
    setFormData((prev) => ({
      ...prev,
      cus_id: customer.cus_id,
      name: `${customer.cus_fName} ${customer.cus_lName}`,
      cus_phoneNum: customer.cus_phoneNum,
      cus_address: customer.cus_address,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <CustomerHeader />
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Insert Record</h1>
            <p className="text-sm text-gray-500">Create a new laundry record</p>
          </div>
        </div>
        
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-gray-900">Customer Receipt</h1>
              <p className="text-sm text-gray-500">Create a new laundry record for customer</p>
            </div>
            
            <div className="space-y-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search customers by ID or name..."
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg text-sm sm:text-base"
              />
            </div>

            {searchQuery && (
              <div className="max-h-60 overflow-y-auto border rounded-lg bg-white">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">
                        Customer ID
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">
                        Full Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="px-2 sm:px-4 py-2 text-center text-slate-500 text-xs sm:text-sm"
                        >
                          No customer found.
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <tr
                          key={customer.cus_id}
                          onClick={() => handleCustomerSelect(customer)}
                          className="hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-slate-800">
                            {customer.cus_id}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-slate-800">
                            {`${customer.cus_fName} ${customer.cus_lName}`}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Customer ID
            </label>
            <Input
              name="cus_id"
              value={formData.cus_id}
              onChange={handleInputChange}
              placeholder="Enter Customer ID"
              className="bg-white border-slate-200 text-slate-900 text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                placeholder="Batch"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-4">
              <Input
                name="cus_phoneNum"
                type="number"
                min="0"
                value={formData.cus_phoneNum}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="cus_address"
                value={formData.cus_address}
                onChange={handleInputChange}
                placeholder="Address"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
              <p className="text-sm text-gray-500">Enter the quantities for each item type</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Input
                name="shirts"
                type="number"
                min="0"
                value={formData.shirts}
                onChange={handleInputChange}
                placeholder="Shirts"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="pants"
                type="number"
                min="0"
                value={formData.pants}
                onChange={handleInputChange}
                placeholder="Pants"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="jeans"
                type="number"
                min="0"
                value={formData.jeans}
                onChange={handleInputChange}
                placeholder="Jeans"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="shorts"
                type="number"
                min="0"
                value={formData.shorts}
                onChange={handleInputChange}
                placeholder="Shorts"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Input
                name="towel"
                type="number"
                min="0"
                value={formData.towel}
                onChange={handleInputChange}
                placeholder="Towel"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="pillowCase"
                type="number"
                min="0"
                value={formData.pillowCase}
                onChange={handleInputChange}
                placeholder="Pillow Case"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <Input
                name="bedSheets"
                type="number"
                min="0"
                value={formData.bedSheets}
                onChange={handleInputChange}
                placeholder="Bed Sheets"
                className="bg-white border-slate-200 text-slate-900 placeholder-slate-500 text-sm sm:text-base"
              />
              <div className="relative">
                <Input
                  name="kl"
                  value={formData.kl}
                  onChange={handleInputChange}
                  placeholder="KL"
                  className="bg-white border-slate-200 pr-8 placeholder-slate-500 text-sm sm:text-base"
                />
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t pt-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-gray-900">Inventory Items Used</h3>
              <p className="text-sm text-gray-500">Search and add inventory items used for this order</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                value={inventorySearchQuery}
                onChange={(e) => handleInventorySearch(e.target.value)}
                placeholder="Search inventory by ID or name..."
                className="pl-10 bg-slate-50 border-slate-200 rounded-lg text-sm sm:text-base"
              />
            </div>

            {inventorySearchQuery && filteredInventory.length > 0 && (
              <div className="max-h-60 overflow-y-auto border rounded-lg bg-white shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">
                        ID
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">
                        Name
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">
                        Available
                      </th>
                      <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleInventorySelect(item)}
                        className="hover:bg-slate-50 cursor-pointer transition-colors border-t"
                      >
                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-slate-800">
                          {item.id}
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-slate-800">
                          {item.name}
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-slate-600">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-slate-800">
                          ₱{item.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedInventoryItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">Selected Items:</h4>
                {selectedInventoryItems.map((item) => (
                  <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-4">
                        <label className="text-xs font-medium text-gray-600 block mb-1">Item Name</label>
                        <Input
                          value={item.name}
                          readOnly
                          className="bg-white border-slate-300 text-slate-900 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-gray-600 block mb-1">Quantity Used</label>
                        <Input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={item.usedQuantity}
                          onChange={(e) => handleInventoryQuantityChange(item.id, e.target.value)}
                          className="bg-white border-slate-300 text-slate-900 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-medium text-gray-600 block mb-1">Available</label>
                        <div className="text-sm text-slate-600 py-2">
                          {item.quantity} {item.unit}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-xs font-medium text-gray-600 block mb-1">Price per Unit</label>
                        <Input
                          value={`₱${item.price.toLocaleString()}`}
                          readOnly
                          className="bg-white border-slate-300 text-red-600 font-semibold text-sm cursor-not-allowed"
                        />
                      </div>
                      <div className="sm:col-span-1 flex items-end justify-center sm:justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveInventoryItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-300">
                      <div className="text-sm font-semibold text-gray-700">
                        Subtotal: <span className="text-sky-700">₱{(item.price * item.usedQuantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="washing"
                    checked={formData.washing}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-slate-600 cursor-pointer"
                  />
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
                    WASHING
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="payNow"
                    checked={formData.payNow}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-green-600 cursor-pointer"
                  />
                  <label className="text-xs sm:text-sm font-semibold text-green-700 cursor-pointer">
                    PAY NOW
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="payLater"
                    checked={formData.payLater}
                    onChange={handleInputChange}
                    className="mr-2 h-4 w-4 text-amber-600 cursor-pointer"
                  />
                  <label className="text-xs sm:text-sm font-semibold text-amber-700 cursor-pointer">
                    PAY LATER
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 rounded-lg p-4 border-2 border-slate-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="text-left">
                  <div className="text-base sm:text-lg font-bold text-slate-900">
                    TOTAL AMOUNT: <span className="text-sky-700">₱{formData.totalAmount}</span>
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-slate-700">
                    Total Items: {formData.itemCount}
                  </div>
                </div>
                {formData.payNow && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-semibold">
                    Payment: PAID
                  </div>
                )}
                {formData.payLater && (
                  <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-xs font-semibold">
                    Payment: PENDING
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              onClick={handleSubmit}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
            >
              SUBMIT
            </Button>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsertRecord;
