import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PageContainer from '@ui/components/templates/PageContainer';

describe('PageContainer', () => {
  it('renders its children', (): void => {
    render(
      <PageContainer>
        {/* eslint-disable-next-line no-restricted-syntax */}
        <div>Test Content</div>
      </PageContainer>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('always renders a Container element', (): void => {
    const { container } = render(
      <PageContainer>
        {/* eslint-disable-next-line no-restricted-syntax */}
        <span>Child</span>
      </PageContainer>
    );
    // MUI Container renders as a div by default
    const div: HTMLDivElement | null = container.querySelector('div');
    expect(div).not.toBeNull();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
