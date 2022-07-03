import './FiltersPanel.scss';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { OrientationPexels, SizePexels } from '../../../types/apiService';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useTypedSelector from '../../../hooks/useTypedSelector';
import { imagesSlice } from '../../../redux/reducers/imagesSlice';

const FiltersPanel = () => {
  const reduxOrient = useTypedSelector((state) => state.images).orientation;
  const reduxSize = useTypedSelector((state) => state.images).size;
  const { changeOrientation, changeSize, cleanImages, nextPage } = imagesSlice.actions;
  const dispatch = useAppDispatch();
  const [orientation, setOrientation] = useState<string>(reduxOrient ? reduxOrient : 'none');
  const [size, setSize] = useState<string>(reduxSize ? reduxSize : 'none');

  const handleOrientationChange = (e: SelectChangeEvent<string>) => {
    let value: OrientationPexels | 'none';
    switch (e.target.value) {
      case OrientationPexels.landscape:
        value = OrientationPexels.landscape;
        break;
      case OrientationPexels.portrait:
        value = OrientationPexels.portrait;
        break;
      case OrientationPexels.square:
        value = OrientationPexels.square;
        break;
      default:
        value = 'none';
    }
    setOrientation(e.target.value);
    dispatch(cleanImages());
    dispatch(nextPage());
    dispatch(changeOrientation(value === 'none' ? null : value));
  };

  const handleSizeChange = (e: SelectChangeEvent<string>) => {
    let value: SizePexels | 'none';
    switch (e.target.value) {
      case SizePexels.large:
        value = SizePexels.large;
        break;
      case SizePexels.medium:
        value = SizePexels.medium;
        break;
      case SizePexels.small:
        value = SizePexels.small;
        break;
      default:
        value = 'none';
    }
    setSize(e.target.value);
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
        className="filters-panel__summary"
        expandIcon={<FilterListIcon sx={{ marginLeft: 1, marginRight: 1 }} />}
        aria-controls="filter-panel"
        id="filter-panel"
        sx={{ flexDirection: 'row-reverse' }}
      >
        <span className="filters-panel__text">Фильтры</span>
      </AccordionSummary>
      <div className="filters-panel__flex-cont">
        <AccordionDetails
          className="filters-panel__details"
          sx={{
            marginRight: 3,
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
                <span className="filters-panel__text">Все варианты ориентации</span>
              </MenuItem>
              <MenuItem value={OrientationPexels.landscape}>
                <span className="filters-panel__text">Горизонтальная</span>
              </MenuItem>
              <MenuItem value={OrientationPexels.portrait}>
                <span className="filters-panel__text">Вертикальная</span>
              </MenuItem>
              <MenuItem value={OrientationPexels.square}>
                <span className="filters-panel__text">Квадрат</span>
              </MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
        <AccordionDetails
          className="filters-panel__details"
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
                <span className="filters-panel__text">Все размеры</span>
              </MenuItem>
              <MenuItem value={SizePexels.large}>
                <span className="filters-panel__text">Большой</span>
              </MenuItem>
              <MenuItem value={SizePexels.medium}>
                <span className="filters-panel__text">Средний</span>
              </MenuItem>
              <MenuItem value={SizePexels.small}>
                <span className="filters-panel__text">Маленький</span>
              </MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </div>
    </Accordion>
  );
};

export default FiltersPanel;
