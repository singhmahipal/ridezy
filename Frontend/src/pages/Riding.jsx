import React from 'react'
import { Link } from 'react-router-dom';

const Riding = () => {
  return (
    <div className='h-screen relative overflow-hidden'>
        <Link className='fixed top-2 right-2 bg-white h-10 w-10 flex items-center justify-center rounded-full' to='/home'><i class="ri-home-4-line"></i></Link>

        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="ridezy logo" className="w-16 absolute top-5 left-5" />

        <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="temp bg map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 w-full">
        <div className='flex flex-col justify-between p-6 bg-white'>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.waitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">MAHI</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">MH 48 PG 1029</h4>
          <p className="text-sm text-gray-600">Defender AGX</p>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-gray-400 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-gray-400 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20 </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button className="bg-green-600 text-white w-full font-semibold text-lg items-center p-3 mt-2 rounded-lg">Make a Payment</button>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Riding