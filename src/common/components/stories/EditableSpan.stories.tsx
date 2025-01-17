import {EditAbleSpan} from "common/components";
import type {Meta, StoryObj,} from "@storybook/react";
import {useState} from "react";
import {EditableSpanProps} from "common/components/EditableSpan/EditableSpan";
import {userEvent, within} from "@storybook/test";

const meta = {
    component: EditAbleSpan,
    tags: ['autodocs']
} satisfies Meta<typeof EditAbleSpan>;

export default meta;
type Story = StoryObj<typeof EditAbleSpan>;

function renderFunc(args: EditableSpanProps) {
    const [title, setTitle] = useState<string>(args.title)

    const changeTitleHandler = (title: string) => setTitle(title)

    return (
        <EditAbleSpan {...args} title={title} changeTitle={changeTitleHandler}/>
    )
}

export const Default: Story = {
    args: {
        title: 'Double click to edit',
    },
    render: renderFunc,
}

export const WithDisabledEditMode: Story = {
    args: {
        title: 'Double click to edit',
        disable: true
    },

    render: renderFunc
};

export const EditModeExample: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const dblClikedSpan = canvas.getByTestId('double-click-span');
        await userEvent.dblClick(dblClikedSpan, {delay: 500});

        const editModeInput = canvas.getByRole('textbox');
        await userEvent.type(editModeInput, 'new title');
    },
    render: renderFunc,
};
