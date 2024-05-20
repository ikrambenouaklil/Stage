import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const array = [
  {
    text: "Note d'orientation",
    link: "noteOrientation",
  },
  {
    text: "Besoins",
    link: "besoins",
  },
  {
    text: "Elaboration",
    link: "elaboration",
  },
  
];


const Sidebar = () => {
      const  id  = useParams();
      
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
              key={item.link}
              sx={{
                textAlign: "center",
                bgcolor:
                  location.pathname ===
                  `/compagnes/${id.compagneId}/${item.link}`
                    ? "orange"
                    : hoveredSection === item.text
                    ? "#F5C77E"
                    : "transparent",
                color:
                  location.pathname ===
                    `/compagnes/${id.compagneId}/${item.link}` ||
                  hoveredSection === item.text
                    ? "white"
                    : "gray",
                marginBottom: 1,
              }}
              onMouseEnter={() => setHoveredSection(item.text)}
              onMouseLeave={() => setHoveredSection("")}
              onClick={() => navigate(`${item.link}`)}
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
