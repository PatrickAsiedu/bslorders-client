import React, { useEffect, useState } from "react";

import TotalFoodOrders from "../../components/Cards/TotalFoodOrders";
import TotalDrinkOrders from "../../components/Cards/TotalDrinkOrders";
import TotalComments from "../../components/Cards/TotalComments";
import ChefSideBarNav from "../../components/ChefSideBarNav";
import { useDispatch, useSelector } from "react-redux";
import OrdersTable from "../../components/Cards/OrdersTable";
import { getOrders } from "../../redux/chefSlice";
import AdminTitleBar from "../../components/AdminTitlebar/AdminTitlebar";
import {
  formatDateToDateString,
} from "../../utils/util-functions";
import OrdersCard from "../../components/Cards/OrdersCard";

const ChefDashboard = () => {
  const dispatch = useDispatch();
  const chefName = useSelector((state) => state.user.user.name);
  const [totalFood, setTotalFood] = useState(0);
  const [totalDrink, setTotalDrink] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [orders, setOrders] = useState();

  

  useEffect(() => {
    const today = new Date();
    const getTodayOrder = async () => {
      const menuDate = today.toISOString().split("T")[0];
      const response = await dispatch(getOrders(menuDate)).unwrap();
      // console.log(response);
      if (response.status === 200) {
        setOrders(response.data);
        setTotalFood(response?.data.filter((order) => order.food_name).length);
        setTotalDrink(
          response?.data.filter((order) => order.drink_name).length
        );
        setTotalComments(
          response?.data.filter((order) => order.comment).length
        );
      }
    };
    getTodayOrder();
  }, [dispatch]);

  console.log(orders);

  const today = new Date();
  let greeting = `Welcome , ${chefName}`;
  let todaysdate = today.toDateString();

  return (
    <React.Fragment>
      <div className="px-4  sm:flex sm:pr-0 lg:px-0 lg:flex h-screen  ">
        <ChefSideBarNav orderTotal={orders?.length} />

        <main className=" lg:flex lg:flex-col sm:w-[90%] sm:ml-[10%]   lg:ml-[30%] 2xl:ml-[20%]  lg:w-[70%]  2xl:w-[80%] sm:px-8  lg:px-[90px] text-base text-primary ">
          <AdminTitleBar title={greeting} date={todaysdate}></AdminTitleBar>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mt-[50px] lg:gap-9 ">
            <TotalFoodOrders value={totalFood} />
            <TotalDrinkOrders value={totalDrink} />
            <TotalComments value={totalComments} />
          </div>
          <h1 className=" sm:hidden ml-3 mt-[40px] font-semibold mb-3">
            Orders
          </h1>
          {orders?.map((order) => (
            <OrdersCard
              key={order.id}
              name={order.name}
              foodname={order.food_name}
              drinkname={order.drink_name}
              comment={order.comment || "no comment"}
              date={formatDateToDateString(order.created_at)}
            ></OrdersCard>
          ))}

          {orders ? (
            <OrdersTable orders={orders} />
          ) : (
            <h1 className="text-primary text-base text-center mt-[50px]">
              No orders placed yet
            </h1>
          )}
          <div className=" pt-[120px]"></div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default ChefDashboard;
