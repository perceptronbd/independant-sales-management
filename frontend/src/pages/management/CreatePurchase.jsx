import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button, SearchBar, MemberSelection } from "../../components";
import { GridSkeleton } from "../../components/skeletons/GridSkeleton";
import { getAllUsersForAgent, getUsers } from "../../api/crudApi";

export function CreatePurchase() {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;

  const filterData = (data, query) => {
    return data.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const getUserData =
          (await getUsers(user.refCode)).length === 0
            ? await getAllUsersForAgent(user._id)
            : await getUsers(user.refCode);
        console.log(await getUserData);
        setUserData(getUserData);
        setData(getUserData);
        setLoading(false); // Update loading state after data is fetched
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

  const handleMemberSelection = (selectedIds) => {
    setSelectedMembers(selectedIds);
  };

  const handleNavigation = () => {
    if (selectedMembers.length === 0) {
      open();
    } else {
      navigate("/home/purchase-order", { state: selectedMembers });
    }
  };

  return (
    <div className="flex flex-col  justify-between w-full mt-1 ml-4 mr-2">
      {loading ? ( // Render loading state UI while data is being fetched
        <div className="flex justify-center items-center h-full">
          <GridSkeleton />
        </div>
      ) : data.length === 0 && role !== "agent" ? (
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

          <div className="flex-grow rounded-lg mt-4">
            <MemberSelection
              data={searchResults}
              selectedMembers={selectedMembers}
              onMemberSelection={handleMemberSelection}
            />
          </div>
          <Modal opened={opened} onClose={close} withCloseButton={true}>
            <div className="flex justify-center pb-10 pr-4 items-center text-center font-semibold !text-alert-danger">
              <IconAlertCircle size={"18px"} className="m-2" />
              Please Select a Member
            </div>
          </Modal>
          <Button onClick={handleNavigation} className={"w-32"}>
            Place Order
          </Button>
        </>
      )}
    </div>
  );
}
