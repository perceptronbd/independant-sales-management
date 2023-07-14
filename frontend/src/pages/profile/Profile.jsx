import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@mantine/core";
import { IconCoin, IconUser } from "@tabler/icons-react";
import { getUserTree, getUsers } from "../../api/crudApi";
import { ContactInfo } from "./ContactInfo";
import { StatCard, Text, UserTree } from "../../components";

export function Profile() {
  const [count, setCount] = useState(0);
  const [userTreeData, setUserTreeData] = useState({});
  const [loading, setLoading] = useState(true);

  const data = JSON.parse(localStorage.getItem("user"));
  const user = data;

  const capitalizeFirstLetter = (str) => {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  const firstName = capitalizeFirstLetter(user.firstName);
  const lastName = capitalizeFirstLetter(user.lastName);
  const role = capitalizeFirstLetter(user.role);
  const email = user.email;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
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
      } catch (error) {
        console.error("Members useEffect: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const res = await getUserTree(user._id);
        console.log(res);
        setUserTreeData(res);
        setLoading(false);
      } catch (error) {
        console.error("Tree:", error);
      }
    };
    fetchData();
  }, []);

  const getTotalUserCount = (user) => {
    let count = 0;

    const countUsers = (user) => {
      count++; // Increment the count for the current user

      // Recursively count users in the nested linksTo array
      if (user.linksTo && user.linksTo.length > 0) {
        user.linksTo.forEach((nestedUser) => {
          countUsers(nestedUser);
        });
      }
    };

    countUsers(user); // Start counting from the top-level user

    return count;
  };

  const totalUserCount = getTotalUserCount(userTreeData);

  return (
    <div className="flex flex-col w-full m-1 mobile:w-[80vw]">
      <Text title className={`mb-4 mx-2`}>
        Welcome, {firstName} {lastName}!
      </Text>
      <div className="flex justify-between mobile:flex-col mobile:my-2 ">
        <ContactInfo
          role={role}
          name={`${firstName} ${lastName}`}
          email={email}
        />
        <div className="flex mobile:flex-col">
          <StatCard
            icon={IconUser}
            str={`Users under you`}
            counts={totalUserCount - 1}
            variant="highlight"
          />
          <StatCard
            icon={IconCoin}
            str={"Total Earned"}
            variant="ok"
            counts={count}
          />
        </div>
      </div>
      <div className="w-full h-full">
        {loading ? (
          <div>loading...</div>
        ) : userTreeData.role === "agent" ? (
          <div
            className="bg-backgroundColor-secondary flex justify-center items-center rounded-lg m-1 w-full h-full text-textColor-tertiary
          font-bold text-5xl
        "
          >
            No user under your tree!
          </div>
        ) : (
          <div className="flex flex-col items-center bg-backgroundColor-secondary m-1 p-2 rounded-lg">
            <div className="w-full bg-white rounded-lg">
              <ScrollArea h={500} scrollbarSize={0} offsetScrollbars>
                <div className="px-2 ">
                  <UserTree user={userTreeData} depth={0} />
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
