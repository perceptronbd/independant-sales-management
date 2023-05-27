import { useState, useEffect } from "react";
import { productData, userData } from "../../api/modal";
import { useLocation, NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Button, SearchBar, ProductSelection } from "../../components";

export function PurchaseOrder() {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const location = useLocation();

  const selectedMembersIds = location.state;

  const selectedMembers = userData.filter((user) => {
    return selectedMembersIds.includes(user.id);
  });

  const selectedMembersElements = selectedMembers.map((member) => {
    return (
      <div
        key={member.id}
        className="bg-backgroundColor-tertiary flex m-1 rounded-md"
      >
        <div className="m-1 px-2 text-textColor-secondary">{member.name}</div>
      </div>
    );
  });

  const selectedProduct = productData.filter((product) =>
    selectedProducts.includes(product.id)
  );

  const selectedProductElement = selectedProduct.map((product) => {
    return (
      <div
        key={product.id}
        className="bg-backgroundColor-tertiary flex justify-between m-1 rounded-md"
      >
        <div className="flex">
          <div className="m-1 px-2 text-textColor-secondary font-semibold">
            Product:
          </div>
          <div className="my-auto mx-0 text-textColor-secondary">
            {product.product}
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
    setData(productData);
    const results = filterData(productData, searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  const filterData = (data, query) => {
    return data.filter(
      (user) =>
        user.product.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toString().includes(query.toLowerCase())
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
        <div className="font-semibold">Products to buy:</div>
        <div>{selectedProductElement}</div>{" "}
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
