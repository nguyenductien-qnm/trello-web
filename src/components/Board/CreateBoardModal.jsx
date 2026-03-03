import { useEffect } from 'react'
import Modal from '@mui/material/Modal'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createNewBoardsAPI } from '~/apis'
import { Fade } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'

const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

function CreateBoardModal({ ui, handler }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const { handleClose } = handler

  const { isOpen } = ui

  useEffect(() => {
    reset()
  }, [isOpen, reset])

  const submitCreateNewBoard = (data) => {
    createNewBoardsAPI(data).then(() => {
      handleClose()
    })
  }

  const modalConfig = {
    'aria-labelledby': 'modal-modal-title',
    closeAfterTransition: true,
    slots: { backdrop: Backdrop },
    slotProps: {
      backdrop: {
        timeout: 500
      }
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose} {...modalConfig}>
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'white',
            boxShadow: 24,
            borderRadius: '8px',
            border: 'none',
            outline: 0,
            padding: '20px 30px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : 'white'
          }}
        >
          <Box id="modal-modal-description" sx={{ my: 2 }}>
            <form onSubmit={handleSubmit(submitCreateNewBoard)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Title"
                    type="text"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AbcIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    {...register('title', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: {
                        value: 3,
                        message: 'Min Length is 3 characters'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Max Length is 50 characters'
                      }
                    })}
                    error={!!errors['title']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'title'} />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Description"
                    type="text"
                    variant="outlined"
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    {...register('description', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: {
                        value: 3,
                        message: 'Min Length is 3 characters'
                      },
                      maxLength: {
                        value: 255,
                        message: 'Max Length is 255 characters'
                      }
                    })}
                    error={!!errors['description']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'description'} />
                </Box>

                <Controller
                  name="type"
                  defaultValue={BOARD_TYPES.PUBLIC}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={(event, value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio size="small" />}
                        label="Public"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio size="small" />}
                        label="Private"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  )}
                />

                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
export default CreateBoardModal
