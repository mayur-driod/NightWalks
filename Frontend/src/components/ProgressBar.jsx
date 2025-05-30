import { FaShoppingCart, FaCreditCard, FaWalking } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa"; // for visual variety if needed

const ProgressBar = ({ status }) => {
  const steps = [
    { id: "PENDING", label: "Order Placed", icon: <FaShoppingCart /> },
    { id: "PAID", label: "Payment Done", icon: <FaCreditCard /> },
    {
      id: "CONFIRMED",
      label: "Confirmed Night Walk",
      icon: <FaWalking />, // or combine with FaRegMoon visually in future
    },
  ];

  const currentStep = steps.findIndex((step) => step.id === status);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col sm:flex-row items-center gap-6 max-w-4xl w-full mb-10 px-4">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center w-full relative">
            <div className="flex flex-col items-center w-full text-center">
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
                className={`text-sm mt-2 font-semibold transition-colors duration-300 ${
                  idx <= currentStep ? "text-teal-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className="absolute top-6 left-full w-full h-1">
                <div
                  className={`h-full w-full transition-all duration-300 ${
                    idx < currentStep ? "bg-teal-600" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
