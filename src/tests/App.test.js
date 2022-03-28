import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testando o componente App', () => {
  it('descreve se a aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByRole('link', { name: /Home/i });
    expect(homeText).toBeInTheDocument();

    const aboutText = screen.getByRole('link', { name: /About/i });
    expect(aboutText).toBeInTheDocument();

    const pokemonText = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(pokemonText).toBeInTheDocument();
  });

  it('deveria ir à página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeText = screen.getByRole('link', { name: /Home/i });
    expect(homeText).toBeInTheDocument();

    userEvent.click(homeText);
    // console.log(history);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('deveria ir à página About, na URL /about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutText = screen.getByRole('link', { name: /About/i });
    expect(aboutText).toBeInTheDocument();

    userEvent.click(aboutText);
    // console.log(history);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('deveria ir à URL /favorites ao clicar no link Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonText = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(pokemonText).toBeInTheDocument();

    userEvent.click(pokemonText);
    // console.log(history);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('deveria ir para uma página Not Found caso colocado uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/digimon-é-melhor');
    console.log(history);
    expect(history.location.pathname).toBe('/digimon-é-melhor');
  });
});
