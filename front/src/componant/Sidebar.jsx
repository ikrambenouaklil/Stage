import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const array = [
  {
    text: "Admin",
    link: "admin",
  },
  {
    text: "Les compagnes",
    link: "compagnes",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState("");

  return (
    <section
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: 300,
        color: "gray",
        borderRadius: 3,
      }}
    >
      <div style={{ padding: 20 }}>
        <List>
          {array.map((item) => (
            <ListItem
              key={item.text}
              sx={{
                textAlign: "center",
                bgcolor:
                  location.pathname === `/auth/${item.link}`
                    ? "orange"
                    : hoveredSection === item.text
                    ? "#F5C77E"
                    : "transparent",
                color:
                  location.pathname === `/auth/${item.link}` ||
                  hoveredSection === item.text
                    ? "white"
                    : "gray",
                marginBottom: 1
              }}
              onMouseEnter={() => setHoveredSection(item.text)}
              onMouseLeave={() => setHoveredSection("")}
              onClick={() => navigate(`/auth/${item.link}`)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </section>
  );
};

export default Sidebar;
