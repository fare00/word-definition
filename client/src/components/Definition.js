import { Container, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { FaVolumeUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function Definition() {
    const { id } = useParams();
    const [word, setWord] = useState({});
    const [audio, setAudio] = useState(undefined);

    useEffect(() => {
        fetch(`/api/words/${id}`)
            .then(resp => resp.json())
            .then(w => setWord(w))
            .catch(err => console.log(err));
    }, [id]);

    const playAudio = () => {
        if(!word.word) return;

        if(audio && audio.dataset.word === word) return audio.play();

        fetch(`/api/words/audio/${word.word}`)
            .then(resp => resp.text())
            .then(url => {
                const a = document.createElement('audio');
                a.src = url;
                a.dataset.word = word.word;
                setAudio(a);
                a.play();
            })
            .catch(err => console.log(err));
    }

    return (
        <Container size="lg" className='definition'>
            <header>
                <Title order={1}>{word.word}</Title>
                <FaVolumeUp size={20} style={{ cursor: 'pointer', marginTop: '7.5px' }} color="#fff" onClick={playAudio} />
            </header>
            <main>
                <Title order={3} style={{textTransform: 'uppercase'}}>Sentence</Title>
                <Text>{word.sentence}</Text>
                <Title order={3} style={{textTransform: 'uppercase'}}>Definition</Title>
                <Text>{word.definition}</Text>
            </main>
        </Container>
    )
}

export default Definition