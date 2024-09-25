import React from "react";
import CategoryList from "../components/CategoryList";
import SlidingBanner from "../components/SlidingBanner";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <SlidingBanner />

      <HorizontalCardProduct category={"airpods"} heading={"Best Airpod Deals"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Watch Deals"}/>

      <VerticalCardProduct category={"phone"} heading={"Phones"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"television"} heading={"TV's"} />
      <VerticalCardProduct category={"camera"} heading={"Camera"} />
      <VerticalCardProduct category={"earphones"} heading={"Earphones"} />
      <VerticalCardProduct category={"printer"} heading={"Printers"} />
      <VerticalCardProduct category={"processor"} heading={"CPU's"} />
      <VerticalCardProduct category={"speaker"} heading={"Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"} />
      <VerticalCardProduct category={"trimmer"} heading={"Trimmers"} />
    </div>
  );
};
export default Home;
