import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('testando o componente About', () => {
  it('descreve se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const getText = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(getText).toBeInTheDocument();

    const pharse = /a digital encyclopedia containing all Pokémons/igm;

    const getPara1 = screen.getByText(pharse);
    expect(getPara1).toBeInTheDocument();

    const getPara2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(getPara2).toBeInTheDocument();

    const imagePoke = screen.getByRole('img');
    expect(imagePoke).toBeInTheDocument();
    expect(imagePoke).toHaveAttribute('src');
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const getText = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(getText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pharse = /a digital encyclopedia containing all Pokémons/igm;

    const getPara1 = screen.getByText(pharse);
    expect(getPara1).toBeInTheDocument();

    const getPara2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(getPara2).toBeInTheDocument();
  });

  it('Teste se a página contém a url de uma Pokédex', () => {
    renderWithRouter(<About />);

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imagePoke = screen.getByRole('img');
    expect(imagePoke).toBeInTheDocument();
    expect(imagePoke).toHaveAttribute('src', src);
  });
});
