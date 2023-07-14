import { Bancaria, Mercado, Nequi, Sodexo } from "../../components";
import { StatCard } from "../../components";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { IconCoin } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../api/crudApi";

export function CheckOut() {
  const [count, setCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  // const [userData, setUserData] = useState();

  const getTabClassName = (index) => {
    return clsx(
      "mr-2 py-2 px-4 w-2/6 rounded mobile:text-xs mobile:px-2 mobile:py-1 ",
      {
        "bg-accent-primary text-white focus:outline-none":
          selectedTab === index,
        "bg-backgroundColor-tertiary": selectedTab !== index,
      }
    );
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //    setUserData(user);
    console.log(user);
    const fetchData = async () => {
      try {
        const getUserData = await getUsers(user.refCode);
        axios
          .get("/users/" + user._id + "/availableCOPs")
          .then((response) => {
            // Handle the response data
            const earnedCOPs = response.data;
            console.log(earnedCOPs);
            setCount(earnedCOPs);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
        console.log("Members.jsx", getUserData);
      } catch (error) {
        console.error("Members useEffect: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full mt-1 ml-4 mr-2 mobile:w-[80vw]">
      <>
        <div className="flex flex-row">
          <StatCard
            icon={IconCoin}
            variant="ok"
            str={"Available Amount"}
            counts={count}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="m-1 font-title font-semibold text-xl mobile:text-sm">
            Select checkout method
          </div>

          <div className="flex flex-col h-full">
            <Tab.Group>
              <Tab.List className="flex bg-backgroundColor-secondary w-full h-14 p-2 rounded mobile:w-[80vw]">
                <Tab
                  className={getTabClassName(0)}
                  onClick={() => setSelectedTab(0)}
                >
                  Mercado
                  <span className="mobile:hidden"> Pago</span>
                </Tab>
                <Tab
                  className={getTabClassName(1)}
                  onClick={() => setSelectedTab(1)}
                >
                  Nequi <span className="mobile:hidden"> - Daviplata</span>
                </Tab>
                <Tab
                  className={getTabClassName(2)}
                  onClick={() => setSelectedTab(2)}
                >
                  Sodexo
                  <span className="mobile:hidden"> Pass</span>
                </Tab>
                <Tab
                  className={getTabClassName(3)}
                  onClick={() => setSelectedTab(3)}
                >
                  <span className="mobile:hidden">Transferencia </span> Bancaria
                </Tab>
              </Tab.List>
              <Tab.Panels className="flex-grow bg-backgroundColor-secondary rounded-b h-full">
                <Tab.Panel>
                  <Mercado />
                </Tab.Panel>
                <Tab.Panel>
                  <Nequi />
                </Tab.Panel>
                <Tab.Panel>
                  <Sodexo />
                </Tab.Panel>
                <Tab.Panel>
                  <Bancaria />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </>
    </div>
  );
}
