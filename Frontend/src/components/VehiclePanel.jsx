import { vehicleImgUrl } from "./VehicleData";

const VehiclePanel = ({
  setVehiclePanelOpen,
  setConfirmRidePanelOpen,
  fare,
  selectVehicle,
}) => {
  return (
    <div>
      <div className="">
        <h5
          onClick={() => {
            setVehiclePanelOpen(false);
          }}
          className="p-1 text-center absolute w-[95%] top-[0%]"
        >
          <i className="text-3xl text-black-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">choose a vehicle</h3>
        <div
          onClick={() => {
            setConfirmRidePanelOpen(true);
            setVehiclePanelOpen(false);
            selectVehicle("car");
          }}
          className="flex justify-between items-center w-full border-gray-300 border-2 mb-2 p-3 active:border-black rounded-lg"
        >
          <img src={vehicleImgUrl.car} alt="car icon" className=" h-10" />
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
          <h2 className="text-lg font-semibold">$ {fare.car}</h2>
        </div>

        <div
          onClick={() => {
            setConfirmRidePanelOpen(true);
            setVehiclePanelOpen(false);
            selectVehicle("motorcycle");
          }}
          className="flex justify-between items-center w-full p-3 border-gray-300 border-2 active:border-black mb-2 rounded-lg"
        >
          <img
            src={vehicleImgUrl.motorcycle}
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
          <h2 className="font-semibold text-lg">$ {fare.motorcycle}</h2>
        </div>

        <div
          onClick={() => {
            setConfirmRidePanelOpen(true);
            setVehiclePanelOpen(false);
            selectVehicle("auto");
          }}
          className="flex justify-between items-center border-gray-300 border-2 p-3 active:border-black rounded-lg w-full"
        >
          <img src={vehicleImgUrl.auto} alt="auto" className="h-18" />
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
          <h2 className="font-semibold text-lg">$ {fare.auto}</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
