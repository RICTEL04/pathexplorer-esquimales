import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the heading Prueba 3.0', () => {
    render(<Home />);
    const heading = screen.getByText(/Prueba 3.0/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the "Deploy now" button', () => {
    render(<Home />);
    const button = screen.getByRole('link', { name: /Deploy now/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', expect.stringContaining('vercel.com'));
  });

  it('renders footer links', () => {
    render(<Home />);
    const learnLink = screen.getByRole('link', { name: /Learn/i });
    const examplesLink = screen.getByRole('link', { name: /Examples/i });
    const nextjsLink = screen.getByRole('link', { name: /Go to nextjs.org/i });
    
    expect(learnLink).toBeInTheDocument();
    expect(examplesLink).toBeInTheDocument();
    expect(nextjsLink).toBeInTheDocument();
  });
});
