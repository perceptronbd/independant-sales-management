import { NavLink } from "react-router-dom";
import { IconReceipt2, IconCoin, IconUsers } from "@tabler/icons-react";
import {
  Button,
  StatCard,
  SearchBar,
  UserSelectionTable,
} from "../../components";

export function User() {
  return (
    <div class="flex flex-col  justify-between w-full mt-1 ml-4 mr-2">
      <SearchBar />
      <div class="flex flex-row">
        <StatCard icon={IconUsers} str={"User"} />
        <StatCard icon={IconCoin} str={"Available Amount"} variant="ok" />
      </div>
      <div class="flex-grow rounded-lg">
        <UserSelectionTable />
      </div>
      <NavLink to={"/home/check-out"} class="h-20  rounded-lg">
        <Button>Check Out</Button>
      </NavLink>
    </div>
  );
}
