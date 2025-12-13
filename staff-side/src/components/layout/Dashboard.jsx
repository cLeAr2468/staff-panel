import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBasket, CreditCard, Truck, Droplets, Clock, CheckCircle, AlertCircle, TrendingUp, BarChart3, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CustomerHeader from "./CustomerHeader"

export default function LaundryDashboard() {
  const navigate = useNavigate();
  const [expandedLog, setExpandedLog] = useState(null);

  const activityLogs = [
    {
      id: 1,
      orderId: "25-0001",
      action: "Order Received",
      timestamp: "Today · 9:30 AM",
      status: "completed",
      icon: CheckCircle,
      details: "Your laundry order has been received and is in queue"
    },
    {
      id: 2,
      orderId: "25-0001",
      action: "Processing Started",
      timestamp: "Today · 10:15 AM",
      status: "completed",
      icon: TrendingUp,
      details: "Your items are being sorted and prepared for washing"
    },
    {
      id: 3,
      orderId: "25-0001",
      action: "Washing in Progress",
      timestamp: "Today · 11:00 AM",
      status: "completed",
      icon: Droplets,
      details: "Your clothes are being washed with premium detergent"
    },
    {
      id: 4,
      orderId: "25-0001",
      action: "Drying",
      timestamp: "Today · 1:45 PM",
      status: "active",
      icon: Clock,
      details: "Your items are being dried to perfection"
    },
    {
      id: 5,
      orderId: "25-0004",
      action: "Quality Check",
      timestamp: "Today · 2:30 PM",
      status: "active",
      icon: AlertCircle,
      details: "Premium hand wash order under quality inspection"
    },
    {
      id: 6,
      orderId: "25-0004",
      action: "Ready for Pick-up",
      timestamp: "Today · 4:45 PM",
      status: "pending",
      icon: CheckCircle,
      details: "Your order is ready! Please pick up at your earliest convenience"
    },
    {
      id: 7,
      orderId: "25-0004",
      action: "Ready for Pick-up",
      status: "On Process",
      icon: CheckCircle,
      details: "Your order is ready! Please pick up at your earliest convenience"
    }
  ];

  const quickStats = [
    {
      label: "Ready for pick-up",
      value: "2 bags",
      action: "View details",
      icon: ShoppingBasket,
      accent: "bg-sky-100 text-sky-700",
      path: "/ready-for-pickup"
    },
    {
      label: "Pending Payment",
      value: "2 bags",
      action: "View details",
      icon: CreditCard,
      accent: "bg-emerald-100 text-emerald-700",
      path: "/dashboard/pending-payments"
    },
    {
      label: "Pending Laundry",
      value: "2 bags",
      action: "View details",
      icon: Truck,
      accent: "bg-indigo-100 text-indigo-700",
      path: "/dashboard/pending"
    },
    {
      label: "Total this month",
      value: "₱1,240",
      action: "View history",
      icon: Droplets,
      accent: "bg-amber-100 text-amber-700",
      path: "/dashboard/history"
    },
    {
      label: "Inventory",
      value: "48 items",
      action: "View inventory",
      icon: Package,
      accent: "bg-purple-100 text-purple-700",
      path: "/inventory"
    },
    {
      label: "On Process",
      value: "4 orders",
      action: "View details",
      icon: Clock,
      accent: "bg-amber-100 text-amber-700",
      path: "/ongoing"
    }
  ];

  const activeOrders = [
    {
      id: "25-0001",
      items: "Regular Wash + Fold",
      status: "Drying",
      eta: "Ready in 30 min"
    },
    {
      id: "25-0004",
      items: "Premium Hand Wash",
      status: "Quality check",
      eta: "Today · 4:45 PM"
    }
  ];

  const monthlyTransactions = [
    { month: "Jan", transactions: 12, amount: 4800 },
    { month: "Feb", transactions: 15, amount: 6200 },
    { month: "Mar", transactions: 10, amount: 4100 },
    { month: "Apr", transactions: 22, amount: 9500 },
    { month: "May", transactions: 18, amount: 7400 },
    { month: "Jun", transactions: 25, amount: 10200 },
    { month: "Jul", transactions: 20, amount: 8300 },
    { month: "Aug", transactions: 28, amount: 11500 },
    { month: "Sep", transactions: 24, amount: 9800 },
    { month: "Oct", transactions: 30, amount: 12400 },
    { month: "Nov", transactions: 26, amount: 10900 },
    { month: "Dec", transactions: 32, amount: 13200 }
  ];

  const maxAmount = Math.max(...monthlyTransactions.map(item => item.amount));
  const maxTransactions = Math.max(...monthlyTransactions.map(item => item.transactions));

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "active":
        return "text-sky-600";
      case "pending":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50";
      case "active":
        return "bg-sky-50";
      case "pending":
        return "bg-amber-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <CustomerHeader />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {quickStats.map((stat) => {
            const isInteractive = Boolean(stat.path);
            return (
              <Card
                key={stat.label}
                className={`shadow-sm ${isInteractive ? "cursor-pointer transition hover:shadow-md hover:-translate-y-0.5" : ""}`}
                onClick={() => isInteractive && navigate(stat.path)}
              >
                <CardContent className="p-5 space-y-3">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${stat.accent}`}>
                    <stat.icon className="h-4 w-4" />
                    {stat.label}
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <button
                    type="button"
                    className="text-sm font-medium text-sky-600 hover:text-sky-700"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (stat.path) {
                        navigate(stat.path);
                      }
                    }}
                  >
                    {stat.action}
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Monthly Transactions</h2>
                <p className="text-sm text-gray-500">Track your laundry service spending this year</p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-sky-600">
                <BarChart3 className="h-4 w-4" />
                Overview
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-min">
                {monthlyTransactions.map((data) => {
                  const heightPercent = (data.amount / maxAmount) * 100;

                  return (
                    <div key={data.month} className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs font-medium text-gray-600 h-5">₱{data.amount}</p>
                        <div className="relative h-32 sm:h-40 w-10 sm:w-12 bg-slate-100 rounded-lg overflow-hidden flex items-end justify-center">
                          <div
                            className="w-full bg-gradient-to-t from-sky-500 to-sky-400 rounded-sm transition-all duration-300 hover:from-sky-600 hover:to-sky-500"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{data.month}</p>
                      <p className="text-xs text-gray-500">{data.transactions} trans.</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4 border-t border-slate-200">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Total Spent</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">₱{monthlyTransactions.reduce((sum, m) => sum + m.amount, 0)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Avg. Monthly</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">₱{Math.round(monthlyTransactions.reduce((sum, m) => sum + m.amount, 0) / 12)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">{monthlyTransactions.reduce((sum, m) => sum + m.transactions, 0)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Highest Month</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">Dec (₱{monthlyTransactions[11].amount})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-gray-900">Activity Log</h2>
              <p className="text-sm text-gray-500">Track all updates for your laundry orders</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activityLogs.map((log, index) => {
                const IconComponent = log.icon;
                const isExpanded = expandedLog === log.id;

                return (
                  <div
                    key={log.id}
                    className={`rounded-lg border border-slate-200 p-4 transition cursor-pointer hover:shadow-sm ${getStatusBgColor(log.status)}`}
                    onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-3 flex-1">
                        <div className="flex-shrink-0">
                          <IconComponent className={`h-5 w-5 mt-0.5 ${getStatusColor(log.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <p className="font-semibold text-gray-900 text-sm sm:text-base">{log.action}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{log.timestamp}</p>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">Order ID: <span className="font-medium">{log.orderId}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-start mt-1 sm:mt-0">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${log.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                            log.status === "active" ? "bg-sky-100 text-sky-700" :
                              "bg-amber-100 text-amber-700"
                          }`}>
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-300">
                        <p className="text-sm text-gray-700">{log.details}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full sm:w-auto">View full history</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
