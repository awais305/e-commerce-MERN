import { Send } from "@mui/icons-material";
import React from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";

const NewsLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 10px;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  flex: 8;
  margin-left: 10px;
  border: none;
  outline: none;
`;
const Button = styled.button`
  border-radius: 0px 10px 10px 0px;
  flex: 1;
  background-color: teal;
  color: white;
  border: none;
  margin: -1px;
  cursor: pointer;
`;
