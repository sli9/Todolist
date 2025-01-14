import { createTheme } from "@mui/material"

export const getTheme = (themeMode: "dark" | "light" | undefined) => {
  return createTheme({
    palette: {
      mode: themeMode === "dark" ? "dark" : "light",
      primary: {
        main: "#00b2b2",
      },
    },
  })
}
