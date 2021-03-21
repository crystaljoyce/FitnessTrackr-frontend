import React, { useState } from 'react';

const DropdownActivity = () => {
  const [firstdropdown, setFirstdropdown] = useState("I am the first!");
return(
  <label htmlFor="Dropdown">
      <select
        value={firstdropdown}
        onChange={e=> setFirstdropdown(e.target.value)}
        onBlur={e=> setFirstdropdown(e.target.value)}
        disabled={!dropdownlist.length}>
          <option>All</option>
          {list.map((item) => <option key={item} value={item}>
          {item} </option>)}
      </select>
  </label>
);
};

export default DropdownActivity;