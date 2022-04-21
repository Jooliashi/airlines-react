import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const CustomSelect = ({
  options, valueKey, titleKey, allTitle, value="all", onSelect
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    onSelect(e.target.value)
  }

  let optionsElements = options.map((option) => {
    const value = option[valueKey];
    return (
      <MenuItem key={value} value={value}>
        {option[titleKey]}
      </MenuItem>
    )
  })
  optionsElements.unshift(
    <MenuItem key="all" value="all">
      {allTitle}
    </MenuItem>
  )

  return (
    <FormControl>
      <InputLabel>Airline</InputLabel>
      <Select value={value} onChange={handleChange} autoWidth>
          {optionsElements}
      </Select>
    </FormControl>
  )
}

export default CustomSelect;