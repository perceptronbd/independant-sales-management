import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button, SearchBar, MemberSelection } from "../../components";
import { getUsers } from "../../api/crudApi";

export function CreatePurchase() {
  const [opened, { open, close }] = useDisclosure(false);
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
    if (selectedMembers.length === 0) {
      open();
    } else {
      navigate("/home/purchase-order", { state: selectedMembers });
    }
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
      <Modal opened={opened} onClose={close} withCloseButton={true}>
        <div className="flex justify-center pb-10 pr-4 items-center text-center font-semibold !text-alert-danger">
          <IconAlertCircle size={"18px"} className="m-2" />
          Please Select a Member
        </div>
      </Modal>
      <Button onClick={handleNavigation} className={"w-32"}>
        Place Order
      </Button>
    </div>
  );
}
