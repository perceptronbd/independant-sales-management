import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { Group, TextInput, Box, InputBase, Modal } from "@mantine/core";
import { Button } from "../buttons/Button";
import { Text } from "../texts/Text";
import { createUser } from "../../api/crudApi";
import { useState } from "react";

export function UserForm() {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState();

  const roles = [
    { value: "user", label: "User" },
    { value: "co-user", label: "CO User" },
    { value: "generator", label: "Generator" },
  ];

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      role: "",
      referralID: "",
    },

    validate: {
      firstName: hasLength({ min: 2, max: 10 }),
      lastName: hasLength({ min: 2, max: 10 }),
      email: isEmail(),
      password: isNotEmpty(),
      address: isNotEmpty(),
      city: isNotEmpty(),
      state: isNotEmpty(),
      role: isNotEmpty(),
      referralID: isNotEmpty(),
    },
  });

  const handleSubmit = async () => {
    try {
      await createUser(form.values);
      //open();
      setError("");
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      open();
    }
  };

  return (
    <Box
      component="form"
      className="mx-auto"
      onSubmit={form.onSubmit(handleSubmit)}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],

        textAlign: "left",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        width: "60%",
      })}
    >
      <Text title>Create User</Text>
      <div className="flex w-full mt-2">
        <TextInput
          label="Fist Name"
          placeholder="First Name"
          withAsterisk
          width={50}
          {...form.getInputProps("firstName")}
          className="w-1/2 mr-1"
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          withAsterisk
          {...form.getInputProps("lastName")}
          className="w-1/2"
        />
      </div>

      <TextInput
        label="E-mail"
        placeholder="E-mail"
        withAsterisk
        width={50}
        {...form.getInputProps("email")}
        className="w-1/2 mr-1  mt-2"
      />

      <TextInput
        label="Password"
        placeholder="Password"
        type="password"
        withAsterisk
        width={50}
        {...form.getInputProps("password")}
        className="w-1/2 mr-1  mt-2"
      />
      <div className="flex w-full mt-2">
        <TextInput
          label="Address"
          placeholder="Address"
          withAsterisk
          {...form.getInputProps("address")}
          className="w-1/2 mr-2"
        />
        <TextInput
          label="City"
          placeholder="City"
          withAsterisk
          {...form.getInputProps("city")}
          className="w-1/2"
        />
      </div>
      <div className="flex w-full">
        <TextInput
          label="Postal Code"
          placeholder="Postal Code"
          {...form.getInputProps("postalCode")}
          className="w-1/2 mr-2"
        />
        <TextInput
          label="State"
          placeholder="State"
          withAsterisk
          {...form.getInputProps("state")}
          className="w-1/2"
        />
      </div>
      <InputBase
        label="Select Role"
        component="select"
        mt="md"
        withAsterisk
        {...form.getInputProps("role")}
      >
        <option>Select Role</option>
        {roles.map((role) => (
          <option value={role.value} key={role.value}>
            {role.label}
          </option>
        ))}
      </InputBase>
      <TextInput
        label="Referal ID"
        placeholder="Referal ID"
        withAsterisk
        {...form.getInputProps("referralID")}
        className="w-1/2 mt-2"
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
            <IconAlertCircle /> <div className="mx-2">{error.error}</div>
          </Text>
        ) : (
          <Text className={"flex items-center "} ok>
            <IconCircleCheck />{" "}
            <div className="mx-2">The user has been created successfully!</div>
          </Text>
        )}
      </Modal>
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
  );
}
