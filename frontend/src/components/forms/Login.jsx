import { TextInput, PasswordInput, Title, Container } from "@mantine/core";
import { Button } from "../buttons/Button";

export function Login({ setUsername, setPassword, handleSubmit }) {
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

      <form
        className="bg-backgroundColor-secondary m-2 p-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Username"
          placeholder="username"
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button className={`w-full`} type="submit">
          Sign in
        </Button>
      </form>
    </Container>
  );
}
