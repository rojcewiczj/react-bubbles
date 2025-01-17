import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};



const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
console.log("color to edit",colorToEdit)
console.log("initial color", initialColor)
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    
  };

  const saveEdit = e => {
    e.preventDefault();
     axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
          getData();
      })
      .catch(err => console.log(err.response));
        
  };

  const createColor = color => {
    console.log(color);
    // make a delete request to delete this color
     axiosWithAuth()
      .post(`/colors/`, colorToEdit)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => console.log(err.response));
  }
  

  const deleteColor = color => {
    console.log(color);
    // make a delete request to delete this color
     axiosWithAuth()
      .delete(`/colors/${color.id}`, color.id)
      .then(res => {
        console.log(res);
        getData();
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
         <form onSubmit={createColor}>
          <legend>New Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )} 
      <div className="spacer" />
     
     
    </div>
  );
};

export default ColorList;
