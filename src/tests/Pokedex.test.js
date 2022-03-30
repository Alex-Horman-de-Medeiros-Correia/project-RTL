import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('teste o componente Pokedex', () => {
  it('diz se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const foundH2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(foundH2).toBeInTheDocument();
  });

  it('diz se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const dois = screen.getByText(/charmander/i);
    expect(dois).toBeInTheDocument();
    userEvent.click(button);

    const tres = screen.getByText(/caterpie/i);
    expect(tres).toBeInTheDocument();
    userEvent.click(button);

    const quatro = screen.getByText(/ekans/i);
    expect(quatro).toBeInTheDocument();
    userEvent.click(button);

    const cinco = screen.getByText(/alakazam/i);
    expect(cinco).toBeInTheDocument();
    userEvent.click(button);

    const seis = screen.getByText(/mew/i);
    expect(seis).toBeInTheDocument();
    userEvent.click(button);

    const sete = screen.getByText(/rapidash/i);
    expect(sete).toBeInTheDocument();
    userEvent.click(button);

    const oito = screen.getByText(/snorlax/i);
    expect(oito).toBeInTheDocument();
    userEvent.click(button);

    const nove = screen.getByText(/dragonair/i);
    expect(nove).toBeInTheDocument();
    userEvent.click(button);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('deve se é mostrar apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const oneByOne = screen.getAllByTestId('pokemon-name');
    expect(oneByOne.length).toBe(1);
  });

  it('diz se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const quant = 7;

    const btnId = screen.getAllByTestId(/pokemon-type-button/i);

    const all = screen.getByRole('button', { name: /All/i });
    const electric = screen.getByRole('button', { name: /Electric/i });
    expect(electric).toBeInTheDocument();

    const fire = screen.getByRole('button', { name: /Fire/i });
    expect(fire).toBeInTheDocument();

    const bug = screen.getByRole('button', { name: /Bug/i });
    expect(bug).toBeInTheDocument();

    const Poison = screen.getByRole('button', { name: /Poison/i });
    expect(Poison).toBeInTheDocument();

    const psychic = screen.getByRole('button', { name: /Psychic/i });
    expect(psychic).toBeInTheDocument();

    const normal = screen.getByRole('button', { name: /Normal/i });
    expect(normal).toBeInTheDocument();

    const dragon = screen.getByRole('button', { name: /Dragon/i });
    expect(dragon).toBeInTheDocument();

    userEvent.click(bug);

    const View = screen.getByText(/Caterpie/i);
    expect(View).toBeInTheDocument();

    expect(all).toBeInTheDocument();
    expect(btnId).toHaveLength(quant);
  });

  it('deve testar se existe um botao para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();

    const bug = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(bug);
    const View = screen.getByText(/Caterpie/i);
    expect(View).toBeInTheDocument();

    userEvent.click(all);
    const first = screen.getByText(/Pikachu/i);
    expect(first).toBeInTheDocument();

    history.push('/');
    expect(first).toBeInTheDocument();
  });
});
