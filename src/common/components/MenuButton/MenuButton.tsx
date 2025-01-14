import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

type MenuButtonType = {
  backgroundcolor?: string
}

export const MenuButton = styled(Button)<MenuButtonType>(({ backgroundcolor, theme }) => ({
  color: "white",
  boxShadow: `0px 0px 20px 5px ${theme.palette.primary.dark}`,
  borderRadius: "12px",
  backgroundColor: backgroundcolor || `${theme.palette.primary.light}`,
  marginLeft: "25px",

  ["&:hover"]: {
    boxShadow: "0px 0px 30px 6px aqua",
  },
}))
