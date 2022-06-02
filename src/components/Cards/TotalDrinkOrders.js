import React from "react";

const TotalDrinkOrders = (props) => {
  return (
    <div className="  w-full  lg:w-[247px] 2xl:w-[320px] h-[180px] box-outer-shadow rounded-3xl flex flex-col pl-9  justify-evenly ">
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 31C14.1046 31 15 29.6569 15 28C15 26.3431 14.1046 25 13 25C11.8954 25 11 26.3431 11 28C11 29.6569 11.8954 31 13 31Z"
          fill="#002C59"
        />
        <path
          d="M24 31C25.1046 31 26 29.6569 26 28C26 26.3431 25.1046 25 24 25C22.8954 25 22 26.3431 22 28C22 29.6569 22.8954 31 24 31Z"
          fill="#002C59"
        />
        <path
          d="M29.4505 6.57143H8.26783L6.4791 2.02072C6.2443 1.42131 5.84687 0.909288 5.3372 0.549546C4.82752 0.189805 4.22855 -0.00145548 3.61621 8.3401e-06H0V3.28572H3.61776L10.9695 21.9896C11.2098 22.6008 11.7755 23 12.4002 23H24.8004C25.4468 23 26.0249 22.5745 26.2528 21.9354L30.9028 8.79258C30.99 8.54384 31.0191 8.27648 30.9878 8.01324C30.9565 7.75 30.8657 7.49867 30.7231 7.2806C30.5805 7.06253 30.3904 6.88418 30.1688 6.76071C29.9472 6.63725 29.7008 6.57231 29.4505 6.57143ZM23.2504 16.4286H20.1503V19.7143H17.0503V16.4286H13.9502V13.1429H17.0503V9.85715H20.1503V13.1429H23.2504V16.4286Z"
          fill="#002C59"
        />
      </svg>
      <h1 className=" ">Total Drink Orders</h1>
      <h1 className="text-2xl font-bold">{props.value}</h1>
    </div>
  );
};

export default TotalDrinkOrders;
