import s from './paginator.module.sass'
import React, {useState} from "react";

const Paginator = ({portionSize = 10, ...props} ) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    let portionCount = Math.ceil(pagesCount / portionSize) //1300
    let [portionNumber, setPortionNumber] = useState(1) //1
    let leftPortionPageNumber = (portionNumber - 1) * portionSize +1 //0
    let rightPortionPageNumber = portionNumber * portionSize //10



    return <div>
        {portionNumber > 1 &&
            <button onClick={()=>{setPortionNumber(portionNumber -1)}} className={s.button}>‹</button>
        }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
            return <span key={p} className={props.currentPage === p ? s.pageSelect : s.page}
                         onClick={() => {
                             props.onPageChanged(p)
                         }}>{p}</span>
        })}
        {portionCount > portionNumber &&
        <button onClick={()=>{setPortionNumber(portionNumber +1)}} className={s.button}>›</button>
        }
    </div>
}

export default Paginator;