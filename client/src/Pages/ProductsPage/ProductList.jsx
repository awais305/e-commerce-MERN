import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Products from "../../components/Products";
import Announcement from "../../components/Announcement";
import { styled } from "styled-components";
import { mobile } from "../../responsive";

const ProductList = () => {
  const [selectedColor, setSelectedColor] = useState("Color");
  const [selectedSize, setSelectedSize] = useState("Size");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select value={selectedColor} onChange={handleColorChange}>
            <Option disabled value={"Color"}>
              Color
            </Option>
            <Option value="White">White</Option>
            <Option value="Black">Black</Option>
            <Option value="Red">Red</Option>
            <Option value="Blue">Blue</Option>
            <Option value="Yellow">Yellow</Option>
            <Option value="Green">Green</Option>
          </Select>

          <Select value={selectedSize} onChange={handleSizeChange}>
            <Option disabled value={"Size"}>
              Size
            </Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  /*  */
`;

const Title = styled.h1`
  margin: 20px;
`;

const Option = styled.option`
  padding: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
