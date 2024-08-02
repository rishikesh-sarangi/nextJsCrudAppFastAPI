"use client";

import Link from "next/link";

import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  const MenuLinks = [
    { name: "Employees", path: "/employees" },
    { name: "Designations", path: "/designations" },
    { name: "Managers", path: "/managers" },
  ];

  const MenuItem = ({ name, path }: { name: string; path: string }) => {
    return (
      <Link href={path} passHref legacyBehavior>
        <Nav.Link>{name}</Nav.Link>
      </Link>
    );
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home">Employee Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {MenuLinks.map((item, index) => (
                <MenuItem key={index} {...item} />
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
