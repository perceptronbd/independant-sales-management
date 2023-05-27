import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";
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

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
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
          <Button fullWidth mt="xl" className="bg-blue-800">
            Sign in
          </Button>
        </NavLink>
      </Paper>
    </Container>
  );
}
