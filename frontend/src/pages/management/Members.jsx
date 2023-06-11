import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IconCoin, IconUsers } from "@tabler/icons-react";
import { Button, StatCard, SearchBar, MembersTable } from "../../components";

const userData = [
  {
    id: 1,
    name: "Asif",
    amount: 332,
  },
];

export function Members() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const countUser = userData.length;

  const totalAvailableAmount = userData.reduce(
    (total, user) => total + user.amount,
    0
  );

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

  return (
    <div className="flex flex-col  justify-between w-full mt-1 ml-4 mr-2">
      <SearchBar
        str="Member"
        data={data}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex flex-row">
        <StatCard icon={IconUsers} str={"User"} counts={countUser} />
        <StatCard
          icon={IconCoin}
          str={"Available Amount"}
          variant="ok"
          counts={totalAvailableAmount}
        />
      </div>
      <div className="flex-grow rounded-lg">
        <MembersTable data={searchResults} />
      </div>
      <NavLink to={"/home/check-out"} className="h-20  rounded-lg">
        <Button>Check Out</Button>
      </NavLink>
    </div>
  );
}
