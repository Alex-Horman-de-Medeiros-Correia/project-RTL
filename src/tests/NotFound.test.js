import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('testa o componente notfound', () => {
  it('deve ter um heading h2 com o texto Page requested not found e um emoji', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(notFound).toBeInTheDocument();
  });

  it('deve mostrar uma imagem na tela', () => {
    renderWithRouter(<NotFound />);

    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const pikachu = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(pikachu).toBeInTheDocument();

    expect(pikachu).toHaveProperty('src', image);
  });
});
