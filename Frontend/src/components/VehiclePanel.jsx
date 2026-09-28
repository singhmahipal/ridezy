import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <div className="">
        <h5
          onClick={() => {
            props.setVehiclePanelOpen(false);
          }}
          className="p-1 text-center absolute w-[95%] top-[0%]"
        >
          <i className="text-3xl text-black-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">choose a vehicle</h3>
        <div
          onClick={() => {
            props.setConfirmRidePanelOpen(true);
            props.setVehiclePanelOpen(false);
          }}
          className="flex justify-between items-center w-full border-gray-300 border-2 mb-2 p-3 active:border-black rounded-lg"
        >
          <img
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="car icon"
            className=" h-10"
          />
          <div className="">
            <h4 className="font-medium text-lg">
              Riderzy GO{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-base">2 min away</h5>
            <p className="font-normal text-xs text-gray-600">
              affordable, compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">$ 190.12</h2>
        </div>

        <div
          onClick={() => {
            props.setConfirmRidePanelOpen(true);
            props.setVehiclePanelOpen(false);
          }}
          className="flex justify-between items-center w-full p-3 border-gray-300 border-2 active:border-black mb-2 rounded-lg"
        >
          <img
            src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Regular/MotorcycleOrange-249-0.png"
            alt="motorcycle logo"
            className="h-22"
          />
          <div className="">
            <h4 className="font-medium text-lg">
              MotorCycle{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>{" "}
            </h4>
            <h5 className="font-medium text-base">3 min away</h5>
            <p className="text-xs font-normal text-gray-600">
              affordable moto rides
            </p>
          </div>
          <h2 className="font-semibold text-lg">$ 95.10</h2>
        </div>

        <div
          onClick={() => {
            props.setConfirmRidePanelOpen(true);
            props.setVehiclePanelOpen(false);
          }}
          className="flex justify-between items-center border-gray-300 border-2 p-3 active:border-black rounded-lg w-full"
        >
          <img
            src="https://imgs.search.brave.com/1mc8GXZUll__uxTgDXojp6LW9gMoJB4hnkGOrp_HLHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDI1MDUwMi9vdXJt/aWQvcG5ndHJlZS1y/ZXRyby1hdXRvLXJp/Y2tzaGF3LXBuZy1p/bWFnZV8xNjE4MjMy/OS5wbmc"
            alt="auto"
            className="h-20"
          />
          <div className="">
            <h4 className="font-medium text-lg">
              Auto{" "}
              <span>
                <i className="ri-user-3-fill"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-base">5 minutes away</h5>
            <p className="text-xs font-normal text-gray-600">
              affordables auto rides
            </p>
          </div>
          <h2 className="font-semibold text-lg">$ 145.20</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
