import React, { FC } from "react";
import styles from "./Filters.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox defmo" } };

interface FiltersProps {
  onChange: any;
  setSorting: (value: string) => void;
  sorting: string;
  isNew: boolean;
  isSuperPrice: boolean;
  isHit: boolean;
  setNew: (value: boolean) => void;
  setSuperPrice: (value: boolean) => void;
  setHit: (value: boolean) => void;
}

export const Filters: FC<FiltersProps> = ({
  onChange,
  sorting,
  setSorting,
  isNew,
  isSuperPrice,
  isHit,
  setNew,
  setSuperPrice,
  setHit
}) => {

  // обработчик клика сортировок, отвавливаем событие и передаём value элементов меню
  const handleSortingChange = (event: SelectChangeEvent<string>) => {
    setSorting(event.target.value);
    onChange(event);
  };

  // обработчики клика фильтраций, отвавливаем событие и передаём value элементов меню
  const handleNewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNew(event.target.checked);
  };

  const handleSuperPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuperPrice(event.target.checked);
  };

  const handleHitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHit(event.target.checked);
  };

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
                label="Age"
                value={sorting}
                onChange={handleSortingChange}
              >
                <MenuItem value="cost"> Від дешевих</MenuItem>
                <MenuItem value="new">Від нових</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={styles.column}>
          <h4>Відбір за ярликами</h4>
          <div className={styles.item}>
            <Checkbox {...label} checked={isNew} onChange={handleNewChange} />
            <label>Новинки</label>
          </div>
          <div className={styles.item}>
            <Checkbox
              {...label}
              checked={isSuperPrice}
              onChange={handleSuperPriceChange}
            />
            <label>Супер ціна</label>
          </div>
          <div className={styles.item}>
            <Checkbox {...label} checked={isHit} onChange={handleHitChange} />
            <label>Хіт</label>
          </div>
        </div>
        <div className={styles.column}>
          <h4>Виробник</h4>
          {/* остальные сортировки */}
        </div>
      </div>
    </div>
  );
};
