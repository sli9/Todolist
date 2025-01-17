import type {Meta, StoryObj} from "@storybook/react";
import {Header} from "common/components";
import {Provider} from "react-redux";
import {store} from "../../../app/store";
import {ThemeProvider} from "@mui/material";
import {legacy_createStore} from "redux";
import {getTheme} from "common/theme";
import {RequestStatus} from "common/types";
import {ThemeMode} from "../../../app/appSlice";
import {userEvent, within} from "@storybook/test";


const meta = {
    component: Header,
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

const renderFunc = ({isLoggedIn = false, status = 'succeeded', theme = 'light' }  : {isLoggedIn?: boolean, status?: RequestStatus, theme?: ThemeMode}) => {
    const customeStore = legacy_createStore((state = {
        ...store.getState(),
        app: {...store.getState().app, isLoggedIn, status}
    }) => state)
    return(
        <Provider store={customeStore}>
            <ThemeProvider theme={getTheme(theme)}>
                <Header/>
            </ThemeProvider>
        </Provider>
    )
}

/** This example show the Header when user is not authorized. */
export const NotAuthorizedHeader: Story = {
    render: () => {
        return (
            <Provider store={store}>
                <ThemeProvider theme={getTheme('light')}>
                    <Header/>
                </ThemeProvider>
            </Provider>
        )
    }
}

/** This example show the Header when user is authorized. */
export const AuthorizedHeader: Story = {
    render: renderFunc.bind(null, {isLoggedIn: true})
}

/** This example show the Header when app status is loading. */
export const WithLoadingStatusHeader: Story = {
    render: renderFunc.bind(null, {status: 'loading'})
}

/** This example show the Header when app theme is dark. */
export const WithDarkThemeHeader: Story = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      const ThemeSwitcher = canvas.getByRole('checkbox');
      await userEvent.click(ThemeSwitcher);
    },

    render: renderFunc.bind(null, {theme: 'dark'})
}