import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Button, SearchBar, ProductSelection } from "../../components";
import { getAllProducts, getUsers } from "../../api/crudApi";

export function PurchaseOrder() {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const location = useLocation();

  const selectedMembersIds = location.state;

  const selectedMembers = userData.filter((user) => {
    return selectedMembersIds.includes(user.email);
  });

  const selectedMembersElements = selectedMembers.map((member) => {
    return (
      <div
        key={member._id}
        className="bg-backgroundColor-secondary flex m-1 rounded-md"
      >
        <div className="m-1 px-2 text-textColor-secondary">
          {member.firstName}
        </div>
      </div>
    );
  });

  const selectedProduct = productData.filter((product) =>
    selectedProducts.includes(product._id)
  );

  const selectedProductElement = selectedProduct.map((product) => {
    return (
      <div
        key={product._id}
        className="bg-backgroundColor-secondary flex justify-between m-1 rounded-md"
      >
        <div className="flex">
          <div className="my-auto mx-0 px-2 text-textColor-secondary">
            {product.name}
          </div>
        </div>
        <div className="flex pr-2">
          <div className="m-1 px-2 text-textColor-secondary font-semibold">
            Price:
          </div>
          <div className="my-auto mx-0 text-textColor-secondary">
            {product.price}
          </div>
        </div>
      </div>
    );
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      try {
        const getUserData = await getUsers(user.refCode);
        const getProducts = await getAllProducts();
        console.log(getProducts);
        setProductData(getProducts);
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
    setData(productData);
    const results = filterData(productData, searchQuery);
    setSearchResults(results);
  }, [searchQuery, productData]);

  useEffect(() => {
    const calcTotalPrice = () => {
      let total = 0;
      for (const productId of selectedProducts) {
        const product = productData.find((p) => p._id.toString() === productId);
        if (product) {
          total += product.price;
        }
      }
      setTotalPrice(total);
    };
    calcTotalPrice();
  }, [productData, selectedProducts]);

  const filterData = (data, query) => {
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleProductSelection = (selectedId) => {
    setSelectedProducts(selectedId);
  };

  return (
    <div className="flex flex-col w-full m-1">
      <SearchBar
        str="Products"
        data={data}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex">{selectedMembersElements}</div>
      <div className="flex-grow rounded-lg mt-4">
        <ProductSelection
          data={searchResults}
          selectedProducts={selectedProducts}
          handleProductSelection={handleProductSelection}
        />
      </div>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className="font-semibold">User(s): </div>
        <div>{selectedMembersElements}</div>
        <div className="font-semibold">Products:</div>
        <div>{selectedProductElement}</div>{" "}
        <div className="bg-backgroundColor-tertiary flex justify-between m-1 mt-4 rounded-md">
          <div className="m-1 px-2 text-textColor-primary font-semibold">
            Total Price:
          </div>
          <div className="m-1 px-2 text-textColor-primary font-semibold">
            {totalPrice}
          </div>
        </div>
        <NavLink to={-1}>
          <Button onClick={close}>Apply</Button>
        </NavLink>
      </Modal>
      <div>
        <Button variant="ghost" onClick={open}>
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
