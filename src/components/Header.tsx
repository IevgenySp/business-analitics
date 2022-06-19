import React, { useContext } from 'react';
import styles from './Header.module.scss';
import { AppBar } from "@mui/material";
import NikeIcon from '../assets/images/nike.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { DataContext } from "./Analitics";

const PrettoSlider = styled(Slider)({
    color: '#4caf50',
    height: 6,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 10,
        background: 'unset',
        padding: 0,
        width: 16,
        height: 16,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#4caf50',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

export const Header: React.FC = () => {
    const { setData, setHeightCoef } = useContext(DataContext);
    const reader = new FileReader();
    const handleOnChange = (event: any) => {
        const file = event.nativeEvent.target.files[0];

        reader.readAsText(file);
        reader.onload = function() {
            const res = JSON.parse(reader.result as string);
            setData(res);
        };
    };
    const valuetext = (value: number) => {
        return `${value}%`;
    };
    const handleSliderChange = (data: any) => {
      setHeightCoef(data.target.value);
    };

    return (
        <div className={styles?.container}>
            <AppBar position="static" className={styles?.appBar}>
                <div className={styles?.logo}><img src={ NikeIcon }/></div>
                <input
                    accept=".json"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleOnChange}
                />
                <label htmlFor="raised-button-file">
                    <Button
                        variant="contained"
                        component="span"
                        style={{
                            background: "#8bc34a",
                            height: "50px"
                        }}
                    >
                        Upload data
                    </Button>
                </label>
                <Box sx={{ width: 100, marginLeft: '20px', marginTop: '25px' }}>
                    <PrettoSlider
                        aria-label="Heighte"
                        defaultValue={100}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        onChange={handleSliderChange}
                        step={10}
                        marks
                        min={100}
                        max={200}
                        color="secondary"
                    />
                </Box>
            </AppBar>
        </div>
    )
};

export default Header;
