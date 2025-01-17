import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "common/components";
import {useState} from "react";
import {AddItemFormProps} from "common/components/AddItemForm/AddItemForm";
import {userEvent, within} from "@storybook/test";


const meta = {
    component: AddItemForm,
    tags: ['autodocs']
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof AddItemForm>;

function renderFunc(args: AddItemFormProps) {
    const [titles, setTitles] = useState<string[]>([])

    const addItemHandler = (title: string) => setTitles((prevState) => [...prevState, title])

    return (
        <div>
            <AddItemForm {...args} addItem={addItemHandler}/>
            <div style={{
                display: titles.length ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '30px',
            }}>
                {titles.map((title, index) => <div key={index}
                                                   style={{
                                                       width: '250px',
                                                       border: '1px solid black',
                                                       padding: '10px',
                                                   }}
                >
                    {title}
                </div>)}
            </div>
        </div>
    )
}


export const Default: Story = {
    args: {
        helperText: '',
        disabled: false,
    },
    render: renderFunc
};


export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: renderFunc,
};

export const WithHelpText: Story = {
    args: {
        disabled: false,
        helperText: "Description"
    },

    render: renderFunc,
};

// interactions
export const AddEmptyItemExample: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const addButton = canvas.getByRole('button');

        await userEvent.click(addButton);
    },
};
