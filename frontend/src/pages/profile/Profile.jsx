import {
  ProgressRing,
  ListCard,
  ButtonSwitcher,
  InfoCard,
  Divider,
} from "../../components";
import { ContactInfo } from "./ContactInfo";

export function Profile() {
  const data = JSON.parse(localStorage.getItem("user"));
  const user = data._doc;

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

  return (
    <div className="flex flex-row w-full ">
      <div className="m-1 bg-backgroundColor-secondary rounded-md h-full w-3/12 ">
        <ContactInfo
          role={role}
          name={`${firstName} ${lastName}`}
          email={email}
        />
        <Divider />
        <InfoCard /> <Divider />
        <InfoCard /> <Divider />
        <InfoCard />
      </div>
      <div className="h-full w-3/4 ">
        <div className="flex flex-col w-full">
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
