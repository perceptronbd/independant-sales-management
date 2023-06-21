import { TextInput, PasswordInput, Title, Container } from "@mantine/core";
import { Button } from "../buttons/Button";
import { Text } from "../texts/Text";
import { useState } from "react";
import axios from "axios";

export function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res.data);
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.log("error in login api.", error.response.status);
      setErrMsg(error.response.data.message);
      console.log(errMsg);
    }
  };
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
        {errMsg === null ? (
          <></>
        ) : (
          <Text className={`m-0 mt-2 !text-alert-danger font-medium`}>
            {errMsg}
          </Text>
        )}
        <Button className={`w-full`} type="submit">
          Sign in
        </Button>
      </form>
    </Container>
  );
}
