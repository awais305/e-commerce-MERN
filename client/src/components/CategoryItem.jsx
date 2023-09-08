import React from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";

const CategoryItem = (props) => {
  const { id, img, title } = props.item;
  return (
    <Container>
      <Image src={img} />
      <Info>
        <Title>{title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  /* font-weight: bold;
  font-size: 40px;
  text-transform: uppercase;
  transition: all 0.5s ease;
  cursor: pointer; */
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    color: black;
    font-weight: 700;
    font-size: 16px;
  }
`;
