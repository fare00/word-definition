import { MantineProvider } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Definition from './Definition'
import Footer from './Footer'
import Home from './Home'
import Navbar from './Navbar'
import NotFound from './NotFound'

function Layout() {
    const [wordList, setWordList] = useState([]);

    useEffect(() => {
        fetch('/api/words/word-list')
            .then(resp => resp.json())
            .then(wl => setWordList(wl))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <MantineProvider theme={{ colorScheme: 'dark', fontFamily: 'Nunito, sans-serif', headings: { fontFamily: 'Nunito, sans-serif' } }} withGlobalStyles withNormalizeCSS></MantineProvider>
                <div>
                    <Navbar wordList={wordList} />
                    <Routes>
                        <Route path='/' element={<Home wordList={wordList} />} />
                        <Route path='/definition/:id' element={<Definition />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            <MantineProvider />
        </div>
    )
}

export default Layout