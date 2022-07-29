import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Anchor, Title, Autocomplete } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import AutoCompleteItem from './AutoCompleteItem';

function Navbar({ wordList }) {
    const { pathname: path } = useLocation();
    const isHome = path === '/';

    return (
        <nav style={{ padding: '10px 0' }}>
            <Container size="lg" style={isHome ? { justifyContent: 'center' } : {}}>
                <Anchor component={Link} to="/" underline={false} style={{ color: "#fff" }}><Title order={1}>Word Definition</Title></Anchor>
                <Autocomplete
                    style={isHome ? { display: 'none' } : {}}
                    placeholder="Word"
                    data={wordList}
                    icon={<FaSearch size={12} />}
                    size="sm"
                    itemComponent={AutoCompleteItem}
                />
            </Container>
        </nav>
    )
}

export default Navbar