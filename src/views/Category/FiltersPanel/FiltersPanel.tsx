import './FiltersPanel.scss';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { orientationPexels, sizePexels } from '../../../types/apiService';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { imagesSlice } from '../../../redux/reducers/imagesSlice';

const FiltersPanel = () => {
  const { changeOrientation, changeSize, cleanImages, nextPage } = imagesSlice.actions;
  const dispatch = useAppDispatch();
  const [orientation, setOrientation] = useState<orientationPexels | 'none'>('none');
  const [size, setSize] = useState<sizePexels | 'none'>('none');

  const handleOrientationChange = (e: SelectChangeEvent<orientationPexels | 'none'>) => {
    let value: orientationPexels | 'none';
    switch (e.target.value) {
      case orientationPexels.landscape:
        value = orientationPexels.landscape;
        break;
      case orientationPexels.portrait:
        value = orientationPexels.portrait;
        break;
      case orientationPexels.square:
        value = orientationPexels.square;
        break;
      default:
        value = 'none';
    }
    setOrientation(value);
    dispatch(cleanImages());
    dispatch(nextPage());
    dispatch(changeOrientation(value === 'none' ? null : value));
  };

  const handleSizeChange = (e: SelectChangeEvent<sizePexels | 'none'>) => {
    let value: sizePexels | 'none';
    switch (e.target.value) {
      case sizePexels.large:
        value = sizePexels.large;
        break;
      case sizePexels.medium:
        value = sizePexels.medium;
        break;
      case sizePexels.small:
        value = sizePexels.small;
        break;
      default:
        value = 'none';
    }
    setSize(value);
    dispatch(cleanImages());
    dispatch(nextPage());
    dispatch(changeSize(value === 'none' ? null : value));
  };

  return (
    <Accordion
      className="filters-panel"
      sx={{
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<FilterListIcon sx={{ marginLeft: 1, marginRight: 1 }} />}
        aria-controls="filter-panel"
        id="filter-panel"
        sx={{ flexDirection: 'row-reverse' }}
      >
        Фильтры
      </AccordionSummary>
      <div className="filters-panel__flex-cont">
        <AccordionDetails
          sx={{
            marginRight: 4,
            p: 0,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <Select
              value={orientation}
              onChange={handleOrientationChange}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none" sx={{ p: 0.5 }}>
                Все варианты ориентации
              </MenuItem>
              <MenuItem value={orientationPexels.landscape}>Горизонтальная</MenuItem>
              <MenuItem value={orientationPexels.portrait}>Вертикальная</MenuItem>
              <MenuItem value={orientationPexels.square}>Квадрат</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
        <AccordionDetails
          sx={{
            p: 0,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 240 }}>
            <Select
              value={size}
              onChange={handleSizeChange}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="none" sx={{ p: 0.5 }}>
                Все размеры
              </MenuItem>
              <MenuItem value={sizePexels.large}>Большой</MenuItem>
              <MenuItem value={sizePexels.medium}>Средний</MenuItem>
              <MenuItem value={sizePexels.small}>Маленький</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </div>
    </Accordion>
  );
};

export default FiltersPanel;
