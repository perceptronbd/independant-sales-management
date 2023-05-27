import { useState, useEffect } from "react";
import { userData } from "../../api/modal";
import { useNavigate } from "react-router-dom";
import { Button, SearchBar, MemberSelection } from "../../components";

export function CreatePurchase() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(userData);
    const results = filterData(userData, searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  const filterData = (data, query) => {
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toString().includes(query.toLowerCase())
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
