import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const vehiclePanelRef = useRef(null);
  const vehiclePanelCloseRef = useRef(null);

  const confirmRidePanelRef = useRef(null);

  const waitingForDriverRef = useRef(null);

  const lookingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70vh",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [panelOpen]);

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen],
  );

  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanelOpen],
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound],
  );

  useGSAP(function() {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForDriver])

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber logo"
        className="w-16 absolute top-5 left-5"
      />

      <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="temp bg map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex flex-col p-6 justify-center bg-white relative overflow-hidden">
          <h5
            className="absolute opacity-0 right-6 top-6 text-2xl"
            onClick={() => setPanelOpen(false)}
            ref={panelCloseRef}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h3 className="font-semibold text-2xl">Find a Trip</h3>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line h-16 w-1 rounded-full absolute top-[48%] left-10 bg-gray-700"></div>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] text-lg rounded-lg px-12 py-2 border w-full mb-3 mt-5"
              placeholder="Add a pick-up location"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] text-lg rounded-lg border px-12 py-2 w-full"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className=" w-full bg-white overflow-hidden h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed bottom-0 z-10 w-full translate-y-full bg-white px-3 py-8 pt-12"
        >
          <VehiclePanel
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          />
        </div>
        <div
          ref={confirmRidePanelRef}
          className="fixed bottom-0 bg-white left-0 z-40 w-full px-3 py-6 pt-12 translate-y-full"
        >
          <ConfirmRide
          setVehiclePanelOpen={setVehiclePanelOpen}
            setVehicleFound={setVehicleFound}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          />
        </div>

        <div
          ref={lookingForDriverRef}
          className="fixed bottom-0 bg-white left-0 z-40 w-full px-3 py-6 pt-12 translate-y-full"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed bottom-0 bg-white left-0 z-40 w-full px-3 py-6 pt-12 translate-y-full"
        >
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
