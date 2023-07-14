import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import { Group, TextInput, Box, InputBase, Modal } from "@mantine/core";
import { Button } from "../buttons/Button";
import { Text } from "../texts/Text";
import { GridSkeleton } from "../skeletons/GridSkeleton";
import { findUser, updateUser } from "../../api/crudApi";
import { useEffect, useState } from "react";
import { denyUserAccess } from "../../api/verifyUser";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

export function EditUser() {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState();
  const [refID, setRefID] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.refCode ? user.refCode : "";
  });
  const [role, setRole] = useState(null);
  const [fetchedUserRole, setFetchedUserRole] = "";
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMember = location.state;

  const roles = [
    { value: "user", label: "User" },
    { value: "co-user", label: "CO User" },
    { value: "agent", label: "Agent" },
    { value: "prescriptor", label: "Prescriptor" },
    { value: "generator", label: "Generator" },
    { value: "generator-leader", label: "Generator Leader" },
  ];

  const roleFilters = {
    manager: () => true,
    "generator-leader": (role) =>
      role.value !== "generator-leader" &&
      role.value !== "agent" &&
      role.value !== "user",
    generator: (role) =>
      role.value !== "generator-leader" &&
      role.value !== "generator" &&
      role.value !== "manager" &&
      role.value !== "agent" &&
      role.value !== "agent",
    prescriptor: (role) =>
      role.value !== "generator-leader" &&
      role.value !== "generator" &&
      role.value !== "manager" &&
      role.value !== "prescriptor" &&
      role.value !== "agent",
    agent: (role) =>
      role.value !== "generator-leader" &&
      role.value !== "generator" &&
      role.value !== "manager" &&
      role.value !== "prescriptor" &&
      role.value !== "agent",
  };

  const filteredRoles = roles.filter(roleFilters[role] || (() => false));

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
      copValue: "",
      referralID: "",
    },

    validate: {
      firstName: hasLength({ min: 2, max: 20 }),
      lastName: hasLength({ min: 2, max: 20 }),
      email: isEmail(),
      password: isNotEmpty(),
      address: isNotEmpty(),
      city: isNotEmpty(),
      state: isNotEmpty(),
      role: isNotEmpty(),
      referralID: isNotEmpty(),
    },
  });

  const handleUpdate = async () => {
    try {
      await updateUser(selectedMember, form.values);
      console.log("form values", form.values);
      setError("");
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      open();
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.role);
    setRefID(user.refCode);
    const fetchData = async () => {
      try {
        await denyUserAccess(user.refreshToken, setIsLoading);
      } catch (error) {
        console.error("UserForm useEffect:", error);
        if (error && error.status === 401) {
          navigate("/home/unauthorized");
        }
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await findUser(selectedMember);
        setIsLoading(false);
        console.log(response);

        setFetchedUserRole(response.role);

        // Set the form field values with the fetched user data
        form.setValues({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          password: response.password,
          address: response.address,
          city: response.city,
          postalCode: response.postalCode,
          state: response.state,
          role: response.role,
          referralID: response.referralID,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [selectedMember, form]);

  return (
    <>
      {isLoading ? (
        <div className="m-1 w-full h-screen">
          <GridSkeleton />
        </div>
      ) : (
        <Box
          component="form"
          className="mx-auto mobile:mx-1 mobile:w-full"
          onSubmit={form.onSubmit(handleUpdate)}
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
          <Text title>Edit User</Text>
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
            {filteredRoles.map((role) => (
              <option value={role.value} key={role.value}>
                {role.label}
              </option>
            ))}
          </InputBase>
          {fetchedUserRole === "agent" || "user" || "co-user" ? (
            <></>
          ) : (
            <TextInput
              label="Add COP"
              placeholder="Add COP"
              {...form.getInputProps("copValue")}
              className="w-1/2 mr-2"
            />
          )}

          {role === "agent" || refID === null ? (
            <TextInput
              label="Referal ID"
              placeholder="Referal ID"
              withAsterisk
              {...form.getInputProps("referralID")}
              className="w-1/2 mt-2"
            />
          ) : (
            <TextInput
              label="Referal ID"
              placeholder={"refID"}
              {...form.getInputProps("referralID")}
              className="w-1/2 mt-2"
            />
          )}
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
              <div className="flex flex-col">
                <Text className={"flex items-center "} ok>
                  <IconCircleCheck />{" "}
                  <div className="mx-2">
                    The user has been update successfully!
                  </div>
                </Text>
                <NavLink to={-1}>
                  <Button variant="ghost" className={`rounded-3xl px-8`}>
                    OK
                  </Button>
                </NavLink>
              </div>
            )}
          </Modal>
          <Group position="right" mt="md">
            <Button type="submit">Update</Button>
          </Group>
        </Box>
      )}
    </>
  );
}
