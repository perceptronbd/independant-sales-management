import {
  ProgressRing,
  ListCard,
  ButtonSwitcher,
  InfoCard,
  Divider,
} from "../../components";
import { ContactInfo } from "./ContactInfo";

export function Profile() {
  return (
    <div className="flex flex-row w-full ">
      <div className="m-1 bg-backgroundColor-secondary rounded-md h-full w-3/12 ">
        <ContactInfo />
        <Divider />
        <InfoCard /> <Divider />
        <InfoCard /> <Divider />
        <InfoCard />
      </div>
      <div className="h-full w-3/4 ">
        <div className="flex flex-col w-full">
          <div className="h-1/4 flex justify-between">
            <ButtonSwitcher />
          </div>
          <div className="flex h-3/4 w-full">
            <div className="h-full w-1/3">
              <ProgressRing />
            </div>
            <div className=" h-full w-1/3">
              <ProgressRing />
            </div>
            <div className="h-full w-1/3">
              <ProgressRing />
            </div>
          </div>
        </div>
        <div className="w-full h-3/5 ">
          <div className="w-full h-8 ">
            <h1 className="pt-2 pl-2 font-title text-lg font-extrabold text-textColor-primary">
              Category Title
            </h1>
          </div>
          <div className="w-full h-14">
            <ListCard></ListCard>
            <ListCard></ListCard>
            <ListCard></ListCard>
            <ListCard></ListCard>
            <ListCard></ListCard>
            <ListCard></ListCard>
            <ListCard></ListCard>
          </div>
        </div>
      </div>
    </div>
  );
}
