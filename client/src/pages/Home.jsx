import React from "react";
import CategoryList from "../components/CategoryList";
import SlidingBanner from "../components/SlidingBanner";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <SlidingBanner />
      <HorizontalCardProduct category={"airpods"} heading={"Best Airpod Deals"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Watch Deals"}/>
    </div>
  );
};
export default Home;
