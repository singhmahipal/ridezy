import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanelOpen,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField == "pickup") {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
  };

  return (
    <div className="grid grid-cols-[40px_1fr] gap-y-4 p-3">
      {suggestions.map((elem, idx) => (
        <React.Fragment key={idx}>
          {/* Icon — always in column 1 */}
          <div className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full text-2xl">
            <i className="ri-map-pin-fill" />
          </div>

          {/* Address — always in column 2 */}
          <div
            onClick={() => handleSuggestionClick(elem)}
            className="font-small leading-5 ml-5 flex items-center cursor-pointer"
          >
            {elem}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
