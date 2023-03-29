import { Select, MenuItem, FormHelperText, FormControl, InputLabel, Chip } from "@material-ui/core";
import React, { useState } from "react";
import filterData from "../filterData.json";

function FilterProblems(props) {
  const [selected, setSelected] = useState([]);

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.filterterms(event.target.value);
    console.log(selected);
  };

  return (
    <FormControl>
      <InputLabel>Tags</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={selectionChangeHandler}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {Object.keys(filterData).map((value) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
      </Select>
      <FormHelperText>Filter Problems</FormHelperText>
    </FormControl>
  );
}

export default FilterProblems;
