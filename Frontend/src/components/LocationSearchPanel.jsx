import React from "react";

const locations = [
  "12, MG Road, Indiranagar, Bengaluru, Karnataka 560038",
  "45, Connaught Place, New Delhi, Delhi 110001",
  "78, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
  "23, Park Street, Kolkata, West Bengal 700016",
  "9, Anna Salai, Chennai, Tamil Nadu 600002",
];

const LocationSearchPanel = (props) => {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-y-4 p-3">
      {locations.map((elem, idx) => (
        <React.Fragment key={idx}>
          {/* Icon — always in column 1 */}
          <div className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full text-2xl">
            <i className="ri-map-pin-fill" />
          </div>

          {/* Address — always in column 2 */}
          <div
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
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
