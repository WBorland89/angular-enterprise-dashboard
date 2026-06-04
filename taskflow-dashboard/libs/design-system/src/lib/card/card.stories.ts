import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card';

const meta: Meta<CardComponent> = {
  title: 'Design System/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['flat', 'raised', 'elevated']
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large']
    },
    clickable: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    title: 'Project Alpha',
    subtitle: 'Frontend Development',
    elevation: 'raised',
    padding: 'medium'
  }
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    elevation: 'elevated'
  }
};

export const Clickable: Story = {
  args: {
    ...Default.args,
    clickable: true
  }
};

export const NoHeader: Story = {
  args: {
    elevation: 'raised',
    padding: 'medium'
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-card [elevation]="elevation" [padding]="padding" [clickable]="clickable">
        <p>This card has no header - just content.</p>
        <p>Great for dashboards and task cards.</p>
      </ds-card>
    `
  })
};