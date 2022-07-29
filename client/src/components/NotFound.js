import React from 'react';
import { Title } from '@mantine/core';

function NotFound() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: '150px' }}>
      <Title order={1}>Not Found</Title>
      <Title order={2}>Error 404</Title>
    </div>
  )
}

export default NotFound