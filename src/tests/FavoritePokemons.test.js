import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('testa o componente FavoritePokemons', () => {
  it('diz se exibido no favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const titleNotFound = screen.getByText('No favorite pokemon found');
    expect(titleNotFound).toBeInTheDocument();
  });

  it('descreve se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByRole('link', { name: /Home/i });
    expect(homeText).toBeInTheDocument();

    const linkpoke = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkpoke);

    const check = screen.getByRole('checkbox');

    userEvent.click(check);

    const pokemonText = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(pokemonText);

    const favorite = screen.getByTestId('pokemon-name');
    expect(favorite).toBeInTheDocument();
  });
});
