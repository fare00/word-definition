import React from 'react';
import { Box } from '@mantine/core';

function Footer() {
  return (
    <footer>
        <Box sx={theme => ({ textAlign: 'center', borderTop: '1px solid '+theme.colors.dark[2], padding: '10px 0' })}>&copy; 2022 Word Definition</Box>
    </footer>
  )
}

export default Footer