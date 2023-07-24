import React, { FC } from "react";
import styles from "./Filters.module.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

interface Filters {}

export const Filters: FC<Filters> = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const label = { inputProps: { "aria-label": "Checkbox defmo" } };

  return (
    <div className={styles.filters}>
      <div className={styles.wrapper}>
        <div className={styles.sort}>
          <h4>Сортування</h4>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">За ціною</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>За ціною</MenuItem>
                <MenuItem value={20}>За чимось</MenuItem>
                <MenuItem value={30}>За чимось ще</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={styles.column}>
          <h4>Відбір за ярликами</h4>
          <div className={styles.item}>
            <Checkbox {...label} />
            <label>Новинки</label>
          </div>
          <div className={styles.item}>
            <Checkbox {...label} />
            <label>Супер ціна</label>
          </div>
          <div className={styles.item}>
            <Checkbox {...label} />
            <label>Хіт</label>
          </div>
        </div>
        <div className={styles.column}>
          <h4>Виробник</h4>
          <div className={styles.item}>
            <Checkbox {...label} />
            <label>Azura</label>
          </div>
          <div className={styles.item}>
            <Checkbox {...label} />
            <label>Azura</label>
          </div>
        </div>
      </div>
    </div>
  );
};
