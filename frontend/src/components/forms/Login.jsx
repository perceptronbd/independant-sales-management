import {
  TextInput,
  PasswordInput,
  Anchor,
  Title,
  Container,
  Group,
} from "@mantine/core";
import { Button } from "../buttons/Button";
import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to PLUTO!
      </Title>

      <div className="bg-backgroundColor-secondary m-2 p-4 rounded-md">
        <TextInput label="Username" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          {/* <Checkbox label="Remember me" /> */}
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <NavLink to="/home/profile">
          <Button className={`w-full`}>Sign in</Button>
        </NavLink>
      </div>
    </Container>
  );
}
