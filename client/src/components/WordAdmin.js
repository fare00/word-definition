import React from 'react'
import { fetchUtils, Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import WordList from './WordList';
import WordCreate from './WordCreate';
import WordEdit from './WordEdit';

function WordAdmin() {
    const authProvider = {
        login: async ({ username, password }) => {
            const resp = await fetch('/auth/login', {
                method: "POST",
                body: JSON.stringify({ Username: username, Password: password }),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'include'
            });

            if (resp.status !== 200) return Promise.reject();

            return Promise.resolve();
        },
        checkError: error => {
            if (error.status === 401 || error.status === 403) return Promise.reject();

            return Promise.resolve();
        },
        checkAuth: async () => {
            const resp = await fetch('/api/words', {
                mode: 'cors',
                credentials: 'include'
            });

            if (resp.status === 401) return Promise.reject();

            return Promise.resolve();
        },
        logout: async () => {
            const resp = await fetch('/auth/logout', {
                method: "DELETE",
                mode: 'cors',
                credentials: 'include'
            });

            if (resp.status !== 200) return Promise.reject();

            return Promise.resolve();
        },
        getIdentity: () => Promise.resolve({ id: 0, fullName: 'Admin' }),
        getPermissions: () => Promise.resolve()
    };

    const httpClient = (url, options = {}) => {
        options.credentials = 'include';
        options.mode = 'cors';
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = restProvider('/api', httpClient);

    return (
        <Admin authProvider={authProvider} basename="/admin" dataProvider={dataProvider} requireAuth>
            <Resource name='words' list={WordList} create={WordCreate} edit={WordEdit} />
        </Admin>
    )
}

export default WordAdmin