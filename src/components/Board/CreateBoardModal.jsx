import { useEffect } from 'react'
import Modal from '@mui/material/Modal'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import AbcIcon from '@mui/icons-material/Abc'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PublicIcon from '@mui/icons-material/Public'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

const type = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  WORKSPACE: 'workspace'
}

const descriptionType = {
  PUBLIC: 'Anyone on the internet can see this board. Only board members can edit.',
  PRIVATE: 'Board members and Trello Workspace admins can see and edit this board.',
  WORKSPACE: 'All members of the Trello Workspace can see and edit this board.'
}

const alertConfig = {
  [type.PUBLIC]: {
    severity: 'warning',
    text: descriptionType.PUBLIC
  },
  [type.PRIVATE]: {
    severity: 'info',
    text: descriptionType.PRIVATE
  },
  [type.WORKSPACE]: {
    severity: 'success',
    text: descriptionType.WORKSPACE
  }
}

const visibilityOptions = [
  {
    value: type.PUBLIC,
    label: 'Public',
    icon: <PublicIcon fontSize="small" />,
    color: 'warning.main',
    bgColor: 'warning.light'
  },
  {
    value: type.PRIVATE,
    label: 'Private',
    icon: <LockOutlinedIcon fontSize="small" />,
    color: 'info.main',
    bgColor: 'info.light'
  },
  {
    value: type.WORKSPACE,
    label: 'Workspace',
    icon: <Groups2OutlinedIcon fontSize="small" />,
    color: 'success.main',
    bgColor: 'success.light'
  }
]

function CreateBoardModal({ ui, handler }) {
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

  const { handleClose, handleCreateBoard } = handler
  const { isOpen } = ui

  useEffect(() => {
    reset({
      title: '',
      description: '',
      visibility: type.PUBLIC
    })
  }, [isOpen, reset])

  const modalConfig = {
    'aria-labelledby': 'create-board-modal-title',
    closeAfterTransition: true,
    slots: { backdrop: Backdrop },
    slotProps: {
      backdrop: {
        timeout: 400
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
            width: { xs: '92%', sm: 640 },
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
            outline: 'none'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 3,
              py: 2.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography
                id="create-board-modal-title"
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Create board
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Set a title, description and board visibility.
              </Typography>
            </Box>

            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Body */}
          <Box sx={{ p: 3 }}>
            {/* Banner */}
            <Box
              sx={{
                width: '100%',
                height: 190,
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                mb: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1742156345582-b857d994c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.55) 100%)'
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  component="img"
                  src="https://trello.com/assets/14cda5dc635d1f13bc48.svg"
                  sx={{
                    width: 220,
                    filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))'
                  }}
                />
              </Box>
            </Box>

            <form onSubmit={handleSubmit(handleCreateBoard)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Title"
                    placeholder="Enter board title..."
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
                    error={!!errors.title}
                  />
                  <FieldErrorAlert errors={errors} fieldName="title" />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Description"
                    placeholder="Write a short description for this board..."
                    rows={4}
                    multiline
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: 'flex-start', mt: 1.2 }}
                        >
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
                    error={!!errors.description}
                  />
                  <FieldErrorAlert errors={errors} fieldName="description" />
                </Box>

                <Controller
                  name="visibility"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1.25,
                          fontWeight: 700,
                          color: 'text.primary'
                        }}
                      >
                        Visibility
                      </Typography>

                      <RadioGroup
                        row
                        {...field}
                        value={field.value}
                        onChange={(_, value) => field.onChange(value)}
                        sx={{
                          gap: 1.5,
                          flexWrap: 'wrap'
                        }}
                      >
                        {visibilityOptions.map((item) => {
                          const selected = field.value === item.value

                          return (
                            <FormControlLabel
                              key={item.value}
                              value={item.value}
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: selected ? item.color : 'text.secondary'
                                  }}
                                />
                              }
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      bgcolor: selected ? item.bgColor : 'action.hover',
                                      color: selected ? item.color : 'text.secondary'
                                    }}
                                  >
                                    {item.icon}
                                  </Box>
                                  <Typography sx={{ fontWeight: 600 }}>
                                    {item.label}
                                  </Typography>
                                </Box>
                              }
                              sx={{
                                m: 0,
                                minWidth: 170,
                                flex: '1 1 170px',
                                px: 1.5,
                                py: 1.2,
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: selected ? item.color : 'divider',
                                bgcolor: selected ? 'action.selected' : 'background.paper',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: 'action.hover'
                                }
                              }}
                            />
                          )
                        })}
                      </RadioGroup>

                      {field.value && (
                        <Alert
                          severity={alertConfig[field.value].severity}
                          sx={{
                            mt: 2,
                            borderRadius: 2.5
                          }}
                        >
                          {alertConfig[field.value].text}
                        </Alert>
                      )}
                    </Box>
                  )}
                />

                <Divider sx={{ mt: 1 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1.5,
                    pt: 1
                  }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      minWidth: 110,
                      borderRadius: 2.5,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      minWidth: 130,
                      borderRadius: 2.5,
                      textTransform: 'none',
                      fontWeight: 700,
                      boxShadow: 'none'
                    }}
                  >
                    Create board
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