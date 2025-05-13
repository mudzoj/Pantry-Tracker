import { useState } from "react";
import { SvgIcon, Box} from "@mui/material";

import MeatIcon from '/app/components/icons/meat.svg';
import DairyIcon from '/app/components/icons/dairy.svg';
import GrainIcon from '/app/components/icons/grains.svg';
import ProduceIcon from '/app/components/icons/produce.svg';
import OtherIcon from '/app/components/icons/other.svg';
import AlphabeticalIcon from '/app/components/icons/alphabetical.svg';
import AddIcon from '/app/components/icons/add.svg';


const iconItems = [
    { id: 1, name: "Meat", icon: MeatIcon },
    { id: 2, name: "Dairy", icon: DairyIcon },
    { id: 3, name: "Grain", icon: GrainIcon },
    { id: 4, name: "Produce", icon: ProduceIcon },
    { id: 5, name: "Other", icon: OtherIcon },
    { id: 6, name: "Alphabetical", icon: AlphabeticalIcon }, 
  
  ];


export function IconList({hoveredId, setHoveredId, clickedId, setClickedId}) {

  const handleClick = (id, name) => {
    
    if (clickedId ===  id){
      setClickedId(null)
    }else{
      console.log(clickedId)
      setClickedId(id);
      
  
    }
    
    // You can call any custom function here
  };

  const getColor = (id) => {
    if (clickedId === id) return "#617467";
    if (hoveredId === id) return "#AFABA0";
    return "#FBFBF9";
  };
// e213
  return (
    <Box 
      sx={{ 
        display: "flex",
        
        flexDirection: "row",         // horizontal layout
        alignItems: "center",         // vertically align them
        // flexWrap: "wrap",
        alignItems:"center",
        justifyContent:"center",
        marginTop:{xs:"20px", sm:"25px", md:"25px", lg:"0px" },
        marginLeft:{sm:"0px", md:"10px", lg:"25px", xl:"0px"},
        gap: {xs:"2rem", sm:"3rem", md:"3rem", lg:"2rem"},
       
        // marginRight: "20px",

    }}>
      {iconItems.map((item) => (
        <SvgIcon
          key={item.id}
          component={item.icon}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => handleClick(item.id, item.name)}
          style={{
            color: getColor(item.id),
            cursor: "pointer",
            fontSize: 30,
          }}
        />
      ))}
    </Box>
  );
  
}
export default IconList;

