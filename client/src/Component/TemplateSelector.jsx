import { CheckIcon, Layout, LockIcon } from "lucide-react";
import React, { useState } from "react";
import { PREMIUM_TEMPLATES } from "../configs/template";
import api from "../configs/api";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const Template = [
    { id: "modern", name: "Modern", preview: "A sleek, contemporary design with bold headings and ample white space." },
    { id: "classic", name: "Classic", preview: "A clean, traditional resume layout with clear sections and a professional look." },
    { id: "minimal", name: "Minimal", preview: "A simple, elegant design focusing on content with minimal distractions." },
    { id: "minimal-image", name: "Minimal Image", preview: "A clean, minimal design with an image placeholder." },
    { id: "futuristic", name: "Futuristic", preview: "Dark theme with glass morphism effects, gradient backgrounds, and animated elements." },
    { id: "creative", name: "Creative", preview: "Asymmetric layout with bold color blocks, timeline design, and organic shapes." },
    { id: "elegant", name: "Elegant", preview: "Professional layout with sophisticated typography, subtle gradients, and refined spacing." },
  ];

  // ---------------- PAYMENT HANDLER ----------------
  const handlePremiumPayment = async () => {
    try {
      const { data } = await api.post(
        "/api/payment/create-order",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Resume Builder",
        description: "Unlock Premium Templates",
        handler: async (response) => {
          await api.post(
            "/api/payment/verify",
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          toast.success("Premium Unlocked 🎉");
          dispatch({
  type: "auth/setUser",
  payload: { ...user, isPremium: true }
});
        },
        theme: { color: "#3B82F6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      if (error?.response?.data?.message === "User already has premium access") {
      toast.success("You already have premium access");
      return;
    }
    toast.error(error?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-3 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm max-h-80 overflow-y-auto hide-scrollbar">
          {Template.map((template) => {
            const isLocked =
              PREMIUM_TEMPLATES.includes(template.id) && !user?.isPremium;

            return (
              <div
                key={template.id}
                onClick={() => {
                  if (isLocked) {
                    handlePremiumPayment();
                    return;
                  }
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`relative p-3 border rounded-md cursor-pointer transition-all
                  ${isLocked ? "opacity-70" : ""}
                  ${
                    selectedTemplate === template.id
                      ? "border-blue-400 bg-blue-100"
                      : "border-gray-400 hover:bg-gray-100"
                  }`}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-md flex items-center justify-center">
                    <LockIcon className="text-white w-6 h-6" />
                  </div>
                )}

                {selectedTemplate === template.id && !isLocked && (
                  <div className="absolute top-2 right-2">
                    <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                    {template.preview}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
