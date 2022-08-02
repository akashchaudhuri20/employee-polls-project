import React from 'react';
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Leaderboard from '../components/Leaderboard'
import Navbar from '../components/Navbar';
import Poll from '../components/Poll';
import {store} from '../index'
import Login from '../components/Login';

describe('Testing DOM Elements', () => {

    it('Answered component should be present', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Leaderboard />
                </Provider>
            </MemoryRouter>
        );
        const column = component.getByTestId('answered')
        expect(column).toBeInTheDocument();
    })

    it('Created component should be present', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Leaderboard />
                </Provider>
             </MemoryRouter>
            );
            const column = component.getByTestId('created')
            expect(column).toBeInTheDocument();
        })

    it('Should match snapshot', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Leaderboard />
                </Provider>
             </MemoryRouter>
            );
            expect(component).toMatchSnapshot();
        })

    it('Navbar component elements should be rendered', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Navbar />
                </Provider>
             </MemoryRouter>
        );
        
        const nav1 = component.getByTestId('home')
        expect(nav1).toBeInTheDocument()

        const nav2 = component.getByTestId('leaderboard')
        expect(nav2).toBeInTheDocument()

        const nav3 = component.getByTestId('new')
        expect(nav3).toBeInTheDocument()

        const img = component.getByTestId('logout')
        expect(img).toBeInTheDocument()
    })

    it('Select User dropdown should be present in the Login page', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
             </MemoryRouter>
        ); 
        const drop = component.getByTestId('dropdown')
        expect(drop).toBeInTheDocument() 
    })

    it('Login button should not be present in the Login page', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
             </MemoryRouter>
        ); 
        
        const login = component.queryAllByTestId('login')
        expect(login.length).toEqual(0)    
    })

    it('Login button should be present once an user is selected from the dropdown', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
             </MemoryRouter>
        ); 
        const drop = component.getByTestId('dropdown')
        fireEvent.change(drop, {target : {value: 'sarahedo'}})
        const login = component.getByTestId('login')
        expect(login).toBeInTheDocument()
    })

    it('Should return 404 when qid is not present', () => {
        const component =  render(
            <MemoryRouter>
                <Provider store={store}>
                    <Poll />
                </Provider>
             </MemoryRouter>
        ); 
        const err = component.getByTestId('404')
        expect(err).toBeInTheDocument()
    })
});