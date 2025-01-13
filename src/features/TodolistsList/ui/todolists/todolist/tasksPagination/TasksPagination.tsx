import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { ChangeEvent } from "react"
import s from "./TasksPagination.module.css"
import { TaskPageSize } from "common/enums"

type Props = {
    totalCount: number
    page: number
    setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
    const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <>
            <Pagination
                count={Math.ceil(totalCount / TaskPageSize.default)}
                page={page}
                onChange={changePageHandler}
                shape="rounded"
                color="primary"
                className={s.pagination}
            />
            <div className={s.totalCount}>
                <Typography variant="caption">Total: {totalCount}</Typography>
            </div>
        </>
    )
}
