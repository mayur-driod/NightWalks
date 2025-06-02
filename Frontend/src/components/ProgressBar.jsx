import { FaShoppingCart, FaCreditCard, FaWalking } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";

const ProgressBar = ({ status }) => {
  const steps = [
    { id: "PENDING", label: "Order Placed", icon: <FaShoppingCart /> },
    { id: "PAID", label: "Payment Done", icon: <FaCreditCard /> },
    {
      id: "CONFIRMED",
      label: "Confirmed Night Walk",
      icon: <FaWalking />,
    },
  ];

  const currentStep = steps.findIndex((step) => step.id === status);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-4xl gap-6 sm:gap-0 px-4 mb-10">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center sm:flex-1">
            {/* Icon + Label */}
            <div className="flex flex-col items-center text-center sm:min-w-[120px]">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-md transition-all duration-300 ${
                  idx <= currentStep ? "bg-teal-600" : "bg-gray-300"
                }`}
                aria-current={idx === currentStep ? "step" : undefined}
                title={step.label}
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

            {/* Connection Lines */}
            {idx < steps.length - 1 && (
              <div className="hidden sm:block flex-1 h-1 bg-gray-300 mx-2 relative">
                <div
                  className={`absolute top-0 left-0 h-1 transition-all duration-300 ${
                    idx < currentStep
                      ? "bg-teal-600 w-full"
                      : "bg-gray-300 w-full"
                  }`}
                />
              </div>
            )}

            {/* Vertical Line for Mobile */}
            {idx < steps.length - 1 && (
              <div className="sm:hidden h-6 border-l-2 mx-auto border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
