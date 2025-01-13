export const getListItemSx = (isDone: boolean) => {
    return {
        p: 0,
        opacity: isDone ? 0.5 : 1,
    }
}
