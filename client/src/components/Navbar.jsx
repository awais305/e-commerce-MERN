import React from "react";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "grey", fontSize: "16px" }} />
          </SearchContainer>
        </LeftSection>
        <CenterSection>
          <Logo>Shop</Logo>
        </CenterSection>
        <RightSection>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  display: flex;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
`;
const CenterSection = styled.div`
  flex: 1;
  text-align: center;
`;
const RightSection = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;

  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const Language = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
