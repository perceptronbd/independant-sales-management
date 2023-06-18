import { Bancaria, Mercado, Nequi, Sodexo } from "../../components";
import { StatCard } from "../../components";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import {
  IconReceipt2,
  IconCoin,
  IconDotsCircleHorizontal,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../api/crudApi";

const someLongText = `lisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
  Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla`;

export function CheckOut() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const getTabClassName = (index) => {
    return clsx("mr-2 py-2 px-4 w-2/6 rounded", {
      "bg-accent-primary text-white focus:outline-none": selectedTab === index,
      "bg-backgroundColor-tertiary": selectedTab !== index,
    });
  };

  const countUser = userData.length;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const fetchData = async () => {
      try {
        const getUserData = await getUsers(user.refCode);
        axios
          .get("/users/" + user._id + "/earnedCOPs")
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
        setUserData(getUserData);
        setData(getUserData);
        setLoading(false);
      } catch (error) {
        console.error("Members useEffect: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full mt-1 ml-4 mr-2 ">
      <div className="flex flex-row">
        <StatCard icon={IconReceipt2} str={"Accumulated"} counts={countUser} />
        <StatCard
          icon={IconCoin}
          variant="ok"
          str={"Available Amount"}
          counts={count}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="m-1 font-title font-semibold text-xl">
          Select checkout method
        </div>

        <div className="flex flex-col h-full">
          <Tab.Group>
            <Tab.List className="flex bg-backgroundColor-secondary w-full h-14 p-2 rounded ">
              <Tab
                className={getTabClassName(0)}
                onClick={() => setSelectedTab(0)}
              >
                Mercado pago
              </Tab>
              <Tab
                className={getTabClassName(1)}
                onClick={() => setSelectedTab(1)}
              >
                Nequi - Daviplata
              </Tab>
              <Tab
                className={getTabClassName(2)}
                onClick={() => setSelectedTab(2)}
              >
                Sodexo Pass
              </Tab>
              <Tab
                className={getTabClassName(3)}
                onClick={() => setSelectedTab(3)}
              >
                Transferencia Bancaria
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
    </div>
  );
}
