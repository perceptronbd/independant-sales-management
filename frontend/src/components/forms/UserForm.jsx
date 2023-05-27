import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Group, TextInput, Box, InputBase, Modal } from "@mantine/core";
import { Button } from "../buttons/Button";
import { Text } from "../texts/Text";

export function UserForm() {
  const [opened, { open, close }] = useDisclosure(false);

  const roles = [
    { value: "generator", label: "Generator" },
    { value: "prescriptor", label: "Prescriptor" },
    { value: "coUser", label: "CO User" },
    { value: "user", label: "User" },
  ];

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      role: "",
      referalID: "",
    },

    validate: {
      firstName: hasLength({ min: 2, max: 10 }),
      lastName: hasLength({ min: 2, max: 10 }),
      email: isEmail(),
      address: isNotEmpty(),
      city: isNotEmpty(),
      postalCode: isNotEmpty(),
      state: isNotEmpty(),
      role: isNotEmpty(),
      referalID: [],
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
    open();
  };

  return (
    <Box
      component="form"
      className="mx-auto"
      onSubmit={form.onSubmit(() => {
        handleSubmit();
      })}
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
          withAsterisk
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
        <option disabled>Select Role</option>
        {roles.map((role) => (
          <option value={role.value}>{role.label}</option>
        ))}
      </InputBase>
      <TextInput
        label="Referal ID"
        placeholder="Referal ID"
        {...form.getInputProps("referalID")}
        className="w-1/2 mt-2"
      />
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        The user has been created successfully!
      </Modal>
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
  );
}
