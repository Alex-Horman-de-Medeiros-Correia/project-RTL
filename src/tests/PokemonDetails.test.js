import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemon25 = '/pokemons/25';

describe('teste o componente pokemonDetails', () => {
  it('diz se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);

    history.push(pokemon25);

    const pokeInfo = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pokeInfo).toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const param = screen.getByText(/This intelligent Pokémon/i);
    expect(param).toBeInTheDocument();
  });

  it('diz se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    history.push(pokemon25);

    const location = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(location).toBeInTheDocument();

    const locationReal = screen.getByText(/Kanto Viridian Forest/i);
    expect(locationReal).toBeInTheDocument();

    const locationReal2 = screen.getByText(/Kanto Power Plant/i);
    expect(locationReal2).toBeInTheDocument();

    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const imageOne = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imageOne[0]).toHaveAttribute('src', url1);
    expect(imageOne[1]).toHaveAttribute('src', url2);
  });

  it('diz se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    history.push(pokemon25);

    const checkPoke = screen.getByRole('checkbox');
    expect(checkPoke).toBeInTheDocument();
    const checkName = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkName).toBeInTheDocument();

    userEvent.click(checkPoke);

    const image = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(image).toBeInTheDocument();

    userEvent.click(checkPoke);

    expect(image).not.toBeInTheDocument();
  });
});
