import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { IconCoin } from "@tabler/icons-react";
import { Button, StatCard, SearchBar, MembersTable } from "../../components";
import { GridSkeleton } from "../../components/skeletons/GridSkeleton";
import { getUsers } from "../../api/crudApi";

export function Members() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setUserData(getUserData);
        setData(getUserData);
        setLoading(false);
      } catch (error) {
        console.error("Members useEffect: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setData(userData);
    const results = filterData(userData, searchQuery);
    setSearchResults(results);
  }, [searchQuery, userData]);

  const filterData = (data, query) => {
    return data.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.includes(query.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col  justify-between w-full mt-1 ml-4 mr-2">
      {loading ? ( // Render loading state UI while data is being fetched
        <div className="flex justify-center items-center h-full">
          <GridSkeleton />
        </div>
      ) : data.length === 0 ? (
        <div
          className="bg-backgroundColor-secondary flex justify-center items-center rounded-lg w-full h-full text-textColor-tertiary
          font-bold text-5xl
        "
        >
          No user under your tree!
        </div>
      ) : (
        <>
          <SearchBar
            str="Member"
            data={data}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="flex flex-row">
            <StatCard
              icon={IconCoin}
              str={"Total Earned"}
              variant="ok"
              counts={count}
            />
          </div>
          <div className="flex-grow rounded-lg">
            <MembersTable data={searchResults} />
          </div>
          <NavLink to={"/home/check-out"} className="h-20 rounded-lg">
            <Button>Check Out</Button>
          </NavLink>
        </>
      )}
    </div>
  );
}
