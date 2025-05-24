import { FaShoppingCart, FaCreditCard, FaTruck } from "react-icons/fa";

const ProgressBar = ({ status }) => {
  const steps = [
    { id: "PENDING", label: "Order Placed", icon: <FaShoppingCart /> },
    { id: "PAID", label: "Payment Done", icon: <FaCreditCard /> },
    { id: "SHIPPED", label: "Shipped", icon: <FaTruck /> },
  ];

  const currentStep = steps.findIndex((step) => step.id === status);

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center gap-6 max-w-4xl w-full mb-10">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center w-full">
            <div className="flex flex-col items-center text-center w-full">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-md transition-all duration-300 ${
                  idx <= currentStep ? "bg-teal-600" : "bg-gray-300"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-sm mt-2 font-semibold ${
                  idx <= currentStep ? "text-teal-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 mt-6 rounded transition-all duration-300 ${
                  idx < currentStep ? "bg-teal-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
