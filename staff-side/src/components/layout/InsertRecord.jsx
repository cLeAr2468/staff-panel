import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import CustomerHeader from "./CustomerHeader";

const InsertRecord = () => {
  const navigate = useNavigate();
  const [laundryId, setLaundryId] = useState(null);
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
    totalAmount: "0.00",
    itemCount: "0",
  });

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
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'cus_id' && value.trim() !== '') {
      const customerData = fetchCustomerData(value);
      
      if (customerData) {
        setFormData(prev => ({
          ...prev,
          name: `${customerData.cus_fName} ${customerData.cus_lName}`,
          cus_phoneNum: customerData.cus_phoneNum || '',
          cus_address: customerData.cus_address || ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          name: '',
          cus_phoneNum: '',
          cus_address: ''
        }));
      }
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
    const items = [
      "shirts",
      "pants",
      "jeans",
      "shorts",
      "towel",
      "pillowCase",
      "bedSheets",
    ];

    let total = 0;
    let count = 0;

    items.forEach((item) => {
      const quantity = parseInt(formData[item]) || 0;
      const price = getItemPrice(item);
      total += quantity * price;
      count += quantity;
    });

    setFormData((prev) => ({
      ...prev,
      totalAmount: total.toFixed(2),
      itemCount: count.toString(),
    }));
  };

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

  const submitLaundryRecord = () => {
    const newLaundryId = `LR${Date.now()}`;
    setLaundryId(newLaundryId);
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
      laundryId: newLaundryId
    });
    navigate('/dashboard/pending');
  };

  const handleSubmit = () => {
    calculateTotal();
    submitLaundryRecord();
  };

  const fetchCustomers = () => {
    setFilteredCustomers(customers);
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

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="washing"
                checked={formData.washing}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-slate-600"
              />
              <label className="text-xs sm:text-sm font-semibold text-slate-800">
                WASHING
              </label>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-base sm:text-lg font-semibold text-slate-800">
                TOTAL AMOUNT: ₱{formData.totalAmount}
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-800">
                #ITEMS: {formData.itemCount}
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
