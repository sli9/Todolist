import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "common/components";
import {useState} from "react";
import {AddItemFormProps} from "common/components/AddItemForm/AddItemForm";


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
        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
            <AddItemForm {...args} addItem={addItemHandler}/>
            {titles.map(t => <div style={{
                width: '250px',
                border: '1px solid black',
                display: titles ? 'block' : 'none',
                marginTop: '100px',
                padding: '10px',
            }}>
                {t}
            </div>)}

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
    render: (args) => {
        const [titles, setTitles] = useState<string[]>([])

        const addItemHandler = (title: string) => setTitles((prevState) => [...prevState, title])

        return (
            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                <AddItemForm {...args} addItem={addItemHandler}/>
                {titles.map(t => <div style={{
                    width: '250px',
                    border: '1px solid black',
                    display: titles ? 'block' : 'none',
                    marginTop: '100px',
                    padding: '10px',
                }}>
                    {t}
                </div>)}

            </div>
        )
    }
};

export const WithHelpText: Story = {
    args: {
        disabled: false,
        helperText: "Description"
    },

    render: args => {
        const [titles, setTitles] = useState<string[]>([]);

        const addItemHandler = (title: string) => setTitles(prevState => [...prevState, title]);

        return (
            (<div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
                }}>
                <AddItemForm {...args} addItem={addItemHandler} />
                {titles.map(t => <div
                    style={{
                        width: "250px",
                        border: "1px solid black",
                        display: titles ? "block" : "none",
                        marginTop: "100px",
                        padding: "10px"
                    }}>
                    {t}
                </div>)}
            </div>)
        );
    }
};

