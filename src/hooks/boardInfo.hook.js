import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectCurrentActiveBoard,
    updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { fetchUpdateBoardInfoAPI } from '~/apis/board.api'
import { useEffect, useState } from 'react'

export function useUpdateBoardInfoForm() {
    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)

    const type = {
        PUBLIC: 'public',
        PRIVATE: 'private',
        WORKSPACE: 'workspace'
    }

    const descriptionType = {
        PUBLIC: 'Anyone on the internet can see this board. Only board members can edit',
        PRIVATE: 'Board members and Trello Workspace Workspace admins can see and edit this board.',
        WORKSPACE: 'All members of the Trello Workspace Workspace can see and edit this board. ',
    }

    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: ''
    })

    const { boardId } = useParams()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            visibility: type.PUBLIC
        }
    })

    useEffect(() => {
        if (board) {
            reset({
                title: board.title || '',
                description: board.description || '',
                visibility: board.visibility || type.PUBLIC
            })
        }
    }, [board, reset])

    const onSubmit = async (payload) => {
        const res = await fetchUpdateBoardInfoAPI({ _id: boardId, data: payload })
        
        dispatch( // Phải có distpatch thì mới có thể update được trong Redux
            updateCurrentActiveBoard({
                ...board,
                ...res.metadata
            }) // JS tự động merge lại, phía sau sẽ update cho phía trước
        )
        reset({
            title: res.metadata.title || board?.title || '',
            description: res.metadata.description || board?.description || '',
            visibility: res.metadata.visibility || board?.visibility || type.PUBLIC
        })
        
        setAlert({
            open: true,
            severity: 'success',
            message: res.message
        })
    }


    return {
        register,
        handleSubmit,
        errors,
        reset,
        onSubmit,
        type,
        control,
        board,
        alert,
        descriptionType
    }
}