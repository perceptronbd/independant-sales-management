import { useState } from "react";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { Group, TextInput, Box, Modal } from "@mantine/core";
import { Button, Text } from "../../components";
import { GridSkeleton } from "../../components/skeletons/GridSkeleton";
import axios from "axios";

export function Products() {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      category: "",
      price: "",
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }),
      category: hasLength({ min: 2, max: 20 }),
      price: isNotEmpty(),
    },
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/create-products", form.values);
      console.log(response.data);
      setError("");
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      open();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="m-1 w-full h-screen">
          <GridSkeleton />
        </div>
      ) : (
        <Box
          component="form"
          className="m-auto mobile:mx-1 mobile:w-full"
          onSubmit={form.onSubmit(handleSubmit)}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],

            textAlign: "left",
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            width: "40%",
            height: "40%",
          })}
        >
          <Text title>Create Product</Text>

          <TextInput
            label="Product Name"
            placeholder="Product Name"
            withAsterisk
            width={50}
            {...form.getInputProps("name")}
            className="w-1/2 mr-1"
          />
          <TextInput
            label="Category"
            placeholder="Category"
            withAsterisk
            {...form.getInputProps("category")}
            className="w-1/2"
          />

          <TextInput
            label="Price"
            placeholder="Price"
            withAsterisk
            type="number"
            {...form.getInputProps("price")}
            className="w-1/2 mr-2"
          />

          <Modal
            opened={opened}
            onClose={close}
            withCloseButton={false}
            overlayProps={{
              opacity: 0.55,
              blur: 3,
            }}
          >
            {error ? (
              <Text className={"flex items-center "} error>
                <IconAlertCircle /> <div className="mx-2">{error.message}</div>
              </Text>
            ) : (
              <div className="flex flex-col">
                <Text className={"flex items-center "} ok>
                  <IconCircleCheck />{" "}
                  <div className="mx-2">
                    The product has been created successfully!
                  </div>
                </Text>
              </div>
            )}
          </Modal>
          <Group position="left" mt="md">
            <Button type="submit">Create</Button>
          </Group>
        </Box>
      )}
    </>
  );
}
