import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function VerticalSlider({ setLineWidth, lineWidth }) {
    function preventHorizontalKeyboardNavigation(event) {
        
        event.target.value > 0 ? setLineWidth(event.target.value) : setLineWidth(event.target.value + 1)
        event.preventDefault();
    }
    lineWidth > 0 ? lineWidth = lineWidth : lineWidth += 1

    return (
        <Box sx={{ height: 217 }}>
            <Slider
                sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                }}
                orientation="vertical"
                value={lineWidth}
                aria-label="Temperature"
                onChange={preventHorizontalKeyboardNavigation}
                max={50}
            />
        </Box>
    );
}
