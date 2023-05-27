import { NavLink } from "react-router-dom";
import { Button, StatCard, SearchBar, Card } from "../../components";
import {
  IconReceipt2,
  IconCoin,
  IconDotsCircleHorizontal,
} from "@tabler/icons-react";

const someLongText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nullam nec purus urna. Cras vel urna vestibulum, cursus risus vitae,
  condimentum est. Vivamus sed tortor sed metus elementum tempus. Nulla
  facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
  Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
  facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
  Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
  facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
  Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla`;

export function CheckOut() {
  return (
    <div class="flex flex-col justify-between w-full mt-1 ml-4 mr-2">
      <SearchBar />
      <div class="flex flex-row">
        <StatCard icon={IconReceipt2} str={"Accumulated"} />
        <StatCard icon={IconCoin} variant="ok" str={"Available Amount"} />
      </div>
      <div class="flex flex-row ">
        <div className="w-1/3">
          <NavLink to={"/home/option"}>
            <Card icon={IconDotsCircleHorizontal} variant="highlight" />
          </NavLink>
        </div>
        <div className="w-1/3">
          <NavLink>
            <Card
              icon={IconDotsCircleHorizontal}
              content="Hello, the content is provided"
            />
          </NavLink>
        </div>
        <div className="w-1/3">
          <NavLink>
            <Card
              icon={IconDotsCircleHorizontal}
              variant="highlight"
              content={someLongText}
            />
          </NavLink>
        </div>
      </div>
      <NavLink to={"/home/check-out"}>
        <Button>Check Out</Button>
      </NavLink>
    </div>
  );
}
