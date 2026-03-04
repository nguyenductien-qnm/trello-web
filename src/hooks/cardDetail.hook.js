import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAndHideCurrentActiveCard,
  selectCurrentActiveCard,
  updateCurrentActiveCard,
  selectIsShowModalActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { updateCardInBoard } from '~/redux/activeBoard/activeBoardSlice'
import { updateCardDetailsAPI } from '~/apis'

const useCardDetail = () => {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const isShowModalActiveCard = useSelector(selectIsShowModalActiveCard)
  const currentUser = useSelector(selectCurrentUser)
  const handleCloseModal = () => {
    dispatch(clearAndHideCurrentActiveCard())
  }

  const callApiUpdateCard = async (updateData) => {
    const updatedCard = await updateCardDetailsAPI(activeCard?._id, updateData)
    dispatch(updateCurrentActiveCard(updatedCard))
    dispatch(updateCardInBoard(updatedCard))
  }

  const onUpdateCardTitle = (newTitle) => {
    callApiUpdateCard({ title: newTitle.trim() })
  }

  const onUpdateCardDescription = (newDescription) => {
    callApiUpdateCard({ description: newDescription })
  }

  const onUploadCardCover = (event) => {
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    toast.promise(
      callApiUpdateCard(reqData).finally(() => {
        event.target.value = ''
      }),
      { pending: 'Updating...' }
    )
  }

  const onAddCardComment = async (commentToAdd) => {
    await callApiUpdateCard({ commentToAdd })
  }

  const onUpdateCardMembers = async (incomingMemberInfo) => {
    callApiUpdateCard({ incomingMemberInfo })
  }

  return {
    activeCard,
    isShowModalActiveCard,
    currentUser,
    handleCloseModal,
    onUpdateCardTitle,
    onUpdateCardDescription,
    onUploadCardCover,
    onAddCardComment,
    onUpdateCardMembers
  }
}
export default useCardDetail
