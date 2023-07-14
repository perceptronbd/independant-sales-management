import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollArea } from "@mantine/core";
import { StatCard, Bargraph } from "../../components";
import { IconBuildingStore } from "@tabler/icons-react";

export function Sales() {
  const [todaySell, setTodaySell] = useState(0);
  const [lastPurchases, setLastPurchases] = useState([]);
  const [weeklyPercentages, setWeeklyPercentages] = useState([]);

  useEffect(() => {
    axios
      .get("/purchases/sum")
      .then((response) => {
        const purchases = response.data;
        console.log(purchases.totalPurchases);
        setTodaySell(purchases.totalPurchases);
      })
      .catch((error) => {
        console.error("Error retrieving purchases:", error);
      });
    axios
      .get("/purchases/recent")
      .then((response) => {
        const purchases = response.data;
        console.log(`Purchase:`, purchases);
        setLastPurchases(purchases);
      })
      .catch((error) => {
        console.error("Error retrieving purchases:", error);
      });
    axios
      .get("/weekly-result") // Update the endpoint to match your router configuration
      .then((response) => {
        const percentages = response.data;
        console.log(`Weekly Percentages:`, percentages);
        setWeeklyPercentages(percentages);
      })
      .catch((error) => {
        console.error("Error retrieving weekly sum percentages:", error);
      });
  }, []);

  const purchaseList = lastPurchases.map((item) => (
    <div
      key={item._id}
      className="flex items-center justify-between w-full my-1 bg-backgroundColor-tertiary py-2 px-4 rounded"
    >
      <div>
        <div className="font-semibold text-lg">{item.user.username}</div>
        <div className="font-semibold text-sm text-textColor-tertiary">
          {item.user.email}
        </div>
      </div>
      <div className="font-body font-semibold text-xl">
        +$ {item.totalAmount}
      </div>
    </div>
  ));

  const weeklySales = weeklyPercentages.map((item) => (
    <Bargraph
      key={item.date}
      fullHeight={`${item.percentage === 0 ? "2" : item.percentage}%`}
      day={item.date}
    />
  ));

  return (
    <div className="m-1 w-full mobile:w-[80vw]">
      <div className="font-title font-semibold text-4xl mx-2 mb-10">
        Sales Report
      </div>
      <StatCard
        counts={todaySell}
        icon={IconBuildingStore}
        str={`Total Sell Today`}
        variant="highlight"
      />
      <div className="flex m-1 mobile:flex-col">
        <div className="flex flex-col justify-between mr-2 bg-backgroundColor-secondary p-2 rounded-md mobile:hidden">
          <div className="font-title font-semibold text-2xl">Overview</div>
          <div className="flex mt-10">{weeklySales}</div>
        </div>
        <div className="w-1/2 bg-backgroundColor-secondary p-2 rounded-md mobile:w-full">
          <div className="font-title font-semibold text-2xl mb-2">
            Recent Sales
          </div>
          <ScrollArea h={400} scrollbarSize={4} offsetScrollbars>
            {purchaseList}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
