import React from "react";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";
import UserFeed from "../components/UserFeed";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex gap-3 mobile:gap-0">
        <SideNav />
        <BottomNav />
        <UserFeed />
        <Suggestions />
      </div>
    </>
  );
};

export { Home };
