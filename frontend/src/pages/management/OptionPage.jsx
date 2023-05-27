import { NavLink } from "react-router-dom";
import {
  Button,
  StatCard,
  Card,
  QuantityInput,
  LinkButton,
} from "../../components";
import {
  IconCurrencyDollar,
  IconDotsCircleHorizontal,
} from "@tabler/icons-react";

export function OptionPage() {
  return (
    <div class="flex flex-col w-full mt-1 ml-4 mr-2">
      <div class="flex flex-row">
        <StatCard icon={IconCurrencyDollar} str={"Accumulated"} />
        <StatCard
          icon={IconCurrencyDollar}
          variant="highlight"
          str={"Available Amount"}
        />
      </div>

      <div className="w-full">
        <NavLink>
          <Card icon={IconDotsCircleHorizontal} variant="highlight" />
        </NavLink>
      </div>
      <div className="flex flex-row pt-4 pb-2 w-full">
        <Button>Option</Button>
        <QuantityInput />
      </div>
      <Button className={"w-2/5"} variant="ghost">
        Info Checkout
      </Button>
      <LinkButton variant="highlight">Check Out</LinkButton>
    </div>
  );
}
