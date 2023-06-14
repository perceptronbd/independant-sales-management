import { TextInput, PasswordInput, Title, Container } from "@mantine/core";
import { Button } from "../buttons/Button";
import { Text } from "../texts/Text";

export function Login({ setEmail, setPassword, handleSubmit, isInvalid }) {
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
          label="Email"
          placeholder="email"
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
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
        {isInvalid ? (
          <Text className={`m-0 mt-2 text-alert-danger font-medium`}>
            Invalid username or password!
          </Text>
        ) : (
          <></>
        )}
        <Button className={`w-full`} type="submit">
          Sign in
        </Button>
      </form>
    </Container>
  );
}
