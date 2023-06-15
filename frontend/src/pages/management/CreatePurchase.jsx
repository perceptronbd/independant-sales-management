import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, SearchBar, MemberSelection } from "../../components";
import { getUsers } from "../../api/crudApi";

export function CreatePurchase() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const getUserData = await getUsers(user.refCode);
        console.log(getUserData);
        setUserData(getUserData);
        setData(getUserData);
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

  const handleMemberSelection = (selectedIds) => {
    setSelectedMembers(selectedIds);
  };

  const handleNavigation = () => {
    navigate("/home/purchase-order", { state: selectedMembers });
  };

  return (
    <div className="flex flex-col w-full m-1">
      <SearchBar
        str="Member"
        data={data}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex-grow rounded-lg mt-4">
        <MemberSelection
          data={searchResults}
          selectedMembers={selectedMembers}
          onMemberSelection={handleMemberSelection}
        />
      </div>
      {/* <NavLink
        to={{ pathname: "/home/purchase-order", state: { selectedMembers } }}
        className="w-36"
      >
      </NavLink> */}
      <Button onClick={handleNavigation} className={"w-32"}>
        Place Order
      </Button>
    </div>
  );
}
