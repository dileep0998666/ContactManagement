import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, IconButton, Box, useMediaQuery, useTheme, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { FaBars, FaTimes } from "react-icons/fa";

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#f7f7f7",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
}));

const LogoContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "transform 0.3s ease",
  },
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between", 
  padding: "1rem",
  "@media (max-width: 600px)": {
    padding: "0.5rem",
  },
}));

const NavItems = styled(Box)(() => ({
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "flex-start", 
}));

const NavLink = styled(Typography)(() => ({
  color: "#333",
  fontWeight: 500,
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -5,
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: "#333",
    transition: "width 0.3s ease",
  },
}));

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = ["Home", "About", "Services", "Contact"];

  const renderLogo = () => (
    <LogoContainer role="banner" aria-label="Company Logo">
      <Box
        component="img"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MM8klbe2akZswEexbZzCdzf1XU9WZy.png"
        alt="Company Logo"
        sx={{
          height: 40,
          width: "auto",
          objectFit: "contain",
        }}
        onError={(e) => {
          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='12' fill='%23999'>Logo%3C/text%3E%3C/svg%3E";
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "#333",
          ml: 1,
          fontWeight: 150,
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        Contact Management
      </Typography>
    </LogoContainer>
  );

  return (
    <StyledAppBar elevation={0}>
      <Container maxWidth="xl">
        <StyledToolbar>
          {renderLogo()}
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ color: "#333" }}
              >
                {anchorEl ? <FaTimes /> : <FaBars />}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 2,
                    backgroundColor: "#f7f7f7",
                  },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={handleMenuClose}
                    sx={{
                      color: "#333",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "#eaeaea",
                      },
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <NavItems>
              {menuItems.map((item) => (
                <NavLink key={item} variant="body1">
                  {item}
                </NavLink>
              ))}
            </NavItems>
          )}
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
