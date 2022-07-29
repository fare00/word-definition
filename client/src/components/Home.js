import React from 'react';
import { Link } from 'react-router-dom';
import { Autocomplete, Anchor, Container, Title, Box } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import AutoCompleteItem from './AutoCompleteItem';

function Home({ wordList }) {
  return (
    <Container size="lg" style={{ marginTop: '150px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
        <Title order={2}>Latest Added</Title>
        <Box style={{ display: 'flex', gap: '10px' }}>
          {wordList.slice(wordList.slice(wordList.length >= 5 ? wordList.length-5 : 0)).map(word => (
            <Anchor key={word.id} component={Link} to={`/definition/${word.id}`}>{word.value}</Anchor>
          ))}
        </Box>
      </div>
      <Autocomplete
        placeholder="Word"
        data={wordList}
        icon={<FaSearch size={24} />}
        size="lg"
        itemComponent={AutoCompleteItem}
      />
    </Container>
  )
}

export default Home