import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { closeErrorModal } from "src/Redux/Reducers/ErrorState"
import { ClearScreenData } from "src/Redux/Reducers/ScreenDataState"
import { ClearScreen } from "src/Redux/Reducers/ScreenState"
import { clearIndexDb } from "src/Utils/Helpers"

function useClearAppData() {
    const dispatch = useDispatch()

    useEffect(() => {
        // localStorage.clear()
        // clearIndexDb()
        // dispatch(closeErrorModal({ errorCode: '', errorMessage: '', isError: false }))
        // dispatch(ClearScreenData())
        // dispatch(ClearScreen())
    }, [])


}

export default useClearAppData