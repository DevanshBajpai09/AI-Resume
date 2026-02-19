import React, { useEffect, useState } from "react";
import api from "../configs/api";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, CreditCard, Calendar, CheckCircle, XCircle, Clock, Filter, Search, ExternalLink, TrendingUp, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TransactionsSkeleton from "../Component/skeleton/TransactionsSkeleton";
import { useSelector } from "react-redux";

const statusConfig = {
    paid: {
        icon: CheckCircle,
        bg: "bg-linear-to-r from-emerald-50 to-green-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "Paid"
    },
    failed: {
        icon: XCircle,
        bg: "bg-linear-to-r from-red-50 to-rose-50",
        text: "text-red-600",
        border: "border-red-200",
        label: "Failed"
    },
    created: {
        icon: Clock,
        bg: "bg-linear-to-r from-amber-50 to-yellow-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "Pending"
    },
};

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const { loading: authLoading } = useSelector((state) => state.auth);
const isOnline = useSelector((state) => state.network.isOnline);


    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/api/payment/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleDownload = async (paymentId) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get(`/api/payment/invoice/${paymentId}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice-${paymentId}.pdf`;
            a.click();
            toast.success("Invoice downloaded successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to download invoice");
        }
    };

    // Filter transactions based on status and search
    const filteredTransactions = transactions.filter(txn => {
        const matchesFilter = filter === "all" || txn.status === filter;
        const matchesSearch = txn.razorpay_payment_id?.toLowerCase().includes(search.toLowerCase()) ||
                            txn._id?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Calculate statistics
    const totalPaid = transactions
        .filter(t => t.status === 'paid')
        .reduce((sum, t) => sum + (t.amount / 100), 0);
    
    const successfulTransactions = transactions.filter(t => t.status === 'paid').length;
    const pendingTransactions = transactions.filter(t => t.status === 'created').length;

    if (authLoading || !isOnline || loading) {
  return <TransactionsSkeleton />;
}


    return (
        <>
            {/* Navigation Header */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link 
                    to="/app" 
                    className="inline-flex gap-2 items-center text-slate-600 hover:text-green-700 transition-all group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Dashboard</span>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-7xl mx-auto px-4 py-8"
            >
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-linear-to-br from-green-50 to-emerald-50 border border-green-100">
                            <CreditCard className="w-6 h-6 text-green-700" />
                        </div>
                        <h1 className="text-4xl font-bold bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                            Transaction History
                        </h1>
                    </div>
                    <p className="text-slate-600">View and manage all your payment transactions</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-2">Total Spent</p>
                                <p className="text-3xl font-bold text-green-800 flex items-center">
                                    <IndianRupee className="w-6 h-6 mr-1" />
                                    {totalPaid.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-green-100">
                                <TrendingUp className="w-6 h-6 text-green-700" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-2">Successful Payments</p>
                                <p className="text-3xl font-bold text-emerald-800">
                                    {successfulTransactions}
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-100">
                                <CheckCircle className="w-6 h-6 text-emerald-700" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-linear-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-2">Pending Payments</p>
                                <p className="text-3xl font-bold text-amber-800">
                                    {pendingTransactions}
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-100">
                                <Clock className="w-6 h-6 text-amber-700" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">Filter by:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['all', 'paid', 'failed', 'created'].map((status) => {
                                    const config = statusConfig[status] || { label: 'All', text: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200' };
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => setFilter(status)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${filter === status 
                                                ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                                                : `${config.bg} ${config.text} ${config.border} hover:opacity-90`
                                            }`}
                                        >
                                            {config.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="relative w-full md:w-auto">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Search className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by Payment ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2.5 w-full md:w-64 rounded-lg border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-20 bg-linear-to-r from-green-50/30 to-emerald-50/30 rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredTransactions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 rounded-2xl bg-linear-to-br from-green-50/50 to-emerald-50/50 border-2 border-dashed border-green-200"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">No transactions found</p>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {transactions.length === 0 
                                ? "You haven't made any payments yet. Your transaction history will appear here."
                                : "No transactions match your current filters."
                            }
                        </p>
                    </motion.div>
                )}

                {/* Transactions List */}
                {!loading && filteredTransactions.length > 0 && (
                    <div className="space-y-4">
                        {filteredTransactions.map((txn, index) => {
                            const StatusIcon = statusConfig[txn.status]?.icon || Clock;
                            const statusStyle = statusConfig[txn.status] || statusConfig.created;
                            
                            return (
                                <motion.div
                                    key={txn._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.005 }}
                                    className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            {/* Left Section */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className={`p-2 rounded-xl ${statusStyle.bg} ${statusStyle.border}`}>
                                                        <StatusIcon className={`w-5 h-5 ${statusStyle.text}`} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold text-gray-800">
                                                                Payment ID: {txn.razorpay_payment_id || "—"}
                                                            </span>
                                                            <span className="text-xs text-slate-500 font-mono">
                                                                ({txn._id.slice(-8)})
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {new Date(txn.createdAt).toLocaleDateString('en-US', {
                                                                    weekday: 'short',
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </span>
                                                            <span>•</span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3.5 h-3.5" />
                                                                {new Date(txn.createdAt).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Section */}
                                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                {/* Amount */}
                                                <div className="text-right">
                                                    <p className="text-sm text-slate-600 mb-1">Amount</p>
                                                    <p className="text-2xl font-bold text-green-700 flex items-center justify-end">
                                                        <IndianRupee className="w-5 h-5 mr-1" />
                                                        {(txn.amount / 100).toLocaleString()}
                                                    </p>
                                                </div>

                                                {/* Status Badge */}
                                                <div className="md:text-right">
                                                    <p className="text-sm text-slate-600 mb-1">Status</p>
                                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        {statusStyle.label}
                                                    </span>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDownload(txn._id)}
                                                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all font-medium"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Invoice
                                                    </button>
                                                    {txn.razorpay_payment_id && (
                                                        <button 
                                                            onClick={() => window.open(`https://dashboard.razorpay.com/app/payments/${txn.razorpay_payment_id}`, '_blank')}
                                                            className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                                                            title="View on Razorpay"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order ID if exists */}
                                        {txn.orderId && (
                                            <div className="mt-4 pt-4 border-t border-slate-100">
                                                <p className="text-sm text-slate-600">
                                                    <span className="font-medium">Order ID:</span> {txn.orderId}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination Info */}
                {!loading && filteredTransactions.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                            <p>
                                Showing <span className="font-semibold text-green-700">{filteredTransactions.length}</span> of{" "}
                                <span className="font-semibold text-green-700">{transactions.length}</span> transactions
                            </p>
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <span className="font-medium">
                                    Total: {transactions.filter(t => t.status === 'paid').length} successful payments
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default Transactions;