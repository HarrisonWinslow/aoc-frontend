// src/Components/BreadcrumbsNav.jsx
import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BreadcrumbsNav() {
  const location = useLocation();

  // Split path like "/2023/21" → ["2023", "21"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 2 }}
    >
      <Link component={RouterLink} underline="hover" color="inherit" to="/">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography color="text.primary" key={to}>
            {value.startsWith("day") ? `Day ${value}` : capitalize(value)}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
          >
            {capitalize(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

// Helper to capitalize years or numbers
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
