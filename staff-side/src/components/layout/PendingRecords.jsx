import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CustomerLaundryInfo from "./CustomerLaundryInfo";
import { ChevronLeft, ListChecks, Eye, ArrowLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const pendingRecords = [
  {
    id: "25-0015",
    customer: "Alexa Cruz",
    service: "Wash + Fold",
    weight: "7 kg",
    status: "Pending",

  },
  {
    id: "25-0013",
    customer: "Miguel Santos",
    service: "Premium Hand Wash",
    weight: "5 kg",
    status: "Pending",

  },
  {
    id: "25-0011",
    customer: "James Patterson",
    service: "Express Wash",
    weight: "3 kg",
    status: "Pending",

  },
  {
    id: "25-0009",
    customer: "Maria Garcia",
    service: "Dry Cleaning",
    weight: "2 kg",
    status: "Pending",

  },
  {
    id: "25-0007",
    customer: "Rina Lopez",
    service: "Express Wash",
    weight: "4 kg",
    status: "Pending",

  }
];

const statusStyles = {
  Sorting: "bg-amber-50 text-amber-700",
  "Pre-wash": "bg-sky-50 text-sky-700",
  Drying: "bg-indigo-50 text-indigo-700"
};

export default function PendingRecords() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleViewRecord = (record) => {
    const formData = {
      shirts: Math.floor(Math.random() * 5),
      pants: Math.floor(Math.random() * 3),
      jeans: Math.floor(Math.random() * 2),
      shorts: Math.floor(Math.random() * 2),
      towel: Math.floor(Math.random() * 4),
      pillowCase: Math.floor(Math.random() * 3),
      bedSheets: Math.floor(Math.random() * 2),
    };
    // Navigate to the CustomerLaundryInfo page with the record data
    navigate('/dashboard/Laundryinfo', {
      state: { record: { ...record, formData } }
    });
  };

  if (selectedRecord) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <CustomerHeader />
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setSelectedRecord(null)}>
            <ChevronLeft className="h-4 w-4" />
            Back to Records
          </Button>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Laundry Record Details</h2>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">ID:</span> {selectedRecord.id} | <span className="font-medium">Customer:</span> {selectedRecord.customer}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Service:</span> {selectedRecord.service} | <span className="font-medium">Weight:</span> {selectedRecord.weight}
                </p>
              </div>
              <CustomerLaundryInfo formData={selectedRecord.formData} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) {
      return pendingRecords;
    }

    return pendingRecords.filter((record) => {
      const term = searchTerm.toLowerCase();
      return (
        record.id.toLowerCase().includes(term) ||
        record.customer.toLowerCase().includes(term) ||
        record.service.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

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
            <h1 className="text-2xl font-bold text-gray-900">Pending Laundry Records</h1>
            <p className="text-sm text-gray-500">Monitor wash cycles</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Pending records</h1>
                <p className="text-sm text-gray-500">Monitor wash cycles across stations.</p>
              </div>
              <Button
                className="bg-sky-600 hover:bg-sky-700 self-stretch md:self-auto"
                onClick={() => navigate('/dashboard/insert-record')}
              >
                Insert record
              </Button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by ID, customer, or service"
                className="bg-slate-50"
              />
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span>
                  Showing {filteredRecords.length} of {pendingRecords.length} records
                </span>
              </div>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs uppercase tracking-wide text-gray-400">
                  <tr>
                    <th className="py-3">Laundry ID</th>
                    <th className="py-3">Customer</th>
                    <th className="py-3">Service</th>
                    <th className="py-3">Weight</th>
                    <th className="py-3">Status</th>
                    <th className="py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="py-4 font-semibold text-gray-900">{record.id}</td>
                      <td className="py-4">{record.customer}</td>
                      <td className="py-4">{record.service}</td>
                      <td className="py-4">{record.weight}</td>
                      <td className="py-4">
                        <Badge className={`${statusStyles[record.status]} font-medium bg-white text-orange-500`}>
                          {record.status}
                        </Badge>
                      </td>
                      <td className="py-2 text-right space-x-4">
                        <Tooltip>
                          <TooltipTrigger><ListChecks onClick={() => handleViewRecord(record)} className="cursor-pointer text-sm">
                          </ListChecks></TooltipTrigger>
                          <TooltipContent>
                            Process
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger><Eye onClick={() => handleViewRecord(record)} variant="outline" className="cursor-pointer text-sm">
                          </Eye></TooltipTrigger>
                          <TooltipContent>
                            View
                          </TooltipContent>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {filteredRecords.map((record) => (
                <div key={record.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">Laundry ID</p>
                      <p className="text-lg font-semibold text-gray-900">{record.id}</p>
                    </div>
                        <Badge className={`${statusStyles[record.status]} font-medium bg-white text-orange-500`}>
                          {record.status}
                        </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-900">{record.customer}</p>
                  <p className="text-sm text-gray-500">
                    {record.service} · {record.weight}
                  </p>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button className="mt-3 w-full bg-sky-600 hover:bg-sky-700 self-stretch md:self-auto">
                      Process
                    </Button>
                    <Button
                      onClick={() => handleViewRecord(record)}
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full border-slate-200 text-slate-600"
                    >
                      View record
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
