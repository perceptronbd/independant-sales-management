import React, { useEffect, useState } from "react";
import { UserList } from "../../components";
import { SearchBar } from "../../components";
import { getAllUsers } from "../../api/crudApi";
import { verifyManager } from "../../api/verifyUser";
import { useNavigate } from "react-router-dom";
import { GridSkeleton } from "../../components/skeletons/GridSkeleton";

export const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  console.log("userData: ", userData);

  const filterData = (data, query) => {
    return data.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.includes(query.toLowerCase()) ||
        user.role.includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const handleManagerRoute = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        await verifyManager(user.refreshToken, setIsLoading);
        const res = await getAllUsers();
        console.log("UserManagement:", res);
        setData(res);
      } catch (error) {
        if (error && error.status === 401) {
          navigate("/home/unauthorized");
        }
      }
    };
    handleManagerRoute();
  }, [navigate]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setData(data);
      const results = filterData(data, searchQuery);
      setSearchResults(results);
    }
  }, [searchQuery, data]);

  return (
    <div className="m-1 w-full flex justify-center items-start mobile:w-[80vw]">
      {isLoading ? (
        <GridSkeleton c />
      ) : (
        <div className=" w-full mt-1 ml-4 mr-2">
          <SearchBar
            str="Member"
            data={data}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="w-full">
            <UserList
              data={searchResults}
              refreshToken={userData.refreshToken}
            />
          </div>
        </div>
      )}
    </div>
  );
};
