import React from "react";
import Profile from "../../components/UI/Profile";
import UserSideBarNav from "../../components/UserSideBarNav";

const UserDashboard = () => {
  return (
    <React.Fragment>
      <div className=" lg:flex h-screen ">
        <UserSideBarNav />

        <main className="hidden lg:flex flex-col md:ml-[30%] 2xl:ml-[20%]  w-[70%]  2xl:w-[80%] ">
          <div className="relative mt-6 w-full h-16 ">
            <Profile></Profile>
          </div>

          <h3>UserDashboard</h3>
        </main>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
