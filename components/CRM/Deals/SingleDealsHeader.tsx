import React from "react";

// Define the structure for each pipeline stage
interface Stage {
  id: string;
  label: string;
  color: string;
  textColor: string;
}

const DealPipelineStatus = () => {
  const stages: Stage[] = [
    { id: "new", label: "New", color: "bg-[#AB47BC]", textColor: "text-white" },
    {
      id: "prospect",
      label: "Prospect",
      color: "bg-[#1E88E5]",
      textColor: "text-white",
    },
    {
      id: "proposal",
      label: "Proposal",
      color: "bg-[#FFC107]",
      textColor: "text-white",
    },
    { id: "won", label: "Won", color: "bg-[#F06292]", textColor: "text-white" },
    {
      id: "lost",
      label: "Lost",
      color: "bg-[#F8F9FA]",
      textColor: "text-slate-900",
    },
  ];

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold text-[#1A2138] mb-6">
        Deal Pipeline Status
      </h2>

      <div className="flex w-full items-center">
        {stages.map((stage, index) => {
          const isFirst = index === 0;
          const isLast = index === stages.length - 1;

          return (
            <div
              key={stage.id}
              className={`
                relative flex-1 h-14 flex items-center justify-center text-sm font-medium
                ${stage.color} ${stage.textColor}
                ${isFirst ? "rounded-l-xl" : ""}
                ${isLast ? "rounded-r-xl" : ""}
              `}
              style={{
                clipPath: isFirst
                  ? "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)"
                  : isLast
                    ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%)"
                    : "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)",
                marginLeft: isFirst ? "0" : "-1.5%",
                zIndex: stages.length - index, // Ensures the arrow overlaps the next item correctly
              }}>
              <span className={isFirst ? "pr-4" : isLast ? "pl-4" : "px-2"}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DealPipelineStatus;
