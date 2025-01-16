import type { Meta, StoryObj } from '@storybook/react';
import { MenuButton } from '../MenuButton/MenuButton';


const meta = {
  component: MenuButton,
  tags: ['autodocs']
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof MenuButton>;


/** This example renders the component with its default styles and no props. */
export const Default: Story = {
  args: {
    backgroundcolor: '',
    children: 'Default Button'
  }
};

/** This example renders the component with a background color */
export const WithBackgroundcolor: Story = {
  args: {
    backgroundcolor: '#ea2e34',
    children: 'Colored Button'
  }
};
