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
import Box from '@mui/material/Box'
import { useUpdateBoardInfoForm } from '~/hooks/boardInfo.hook'
import { Alert } from '@mui/material'

function TabInfo() {
  const {
    register,
    handleSubmit,
    onSubmit,
    type,
    errors,
    control,
    alert,
    descriptionType
  } = useUpdateBoardInfoForm()

  const visibilityAlertConfig = {
    [type.PUBLIC]: {
      severity: 'warning',
      message: descriptionType.PUBLIC
    },
    [type.PRIVATE]: {
      severity: 'info',
      message: descriptionType.PRIVATE
    },
    [type.WORKSPACE]: {
      severity: 'success',
      message: descriptionType.WORKSPACE
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {alert.open && (
          <Alert severity={alert.severity}>
            {alert.message}
          </Alert>
        )}

        <Box sx={{ mt: 2 }}>
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
            error={!!errors.title}
          />
          <FieldErrorAlert errors={errors} fieldName="title" />
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Description"
            rows={3}
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
            error={!!errors.description}
          />
          <FieldErrorAlert errors={errors} fieldName="description" />
        </Box>

        <Controller
          name="visibility"
          control={control}
          render={({ field }) => (
            <Box sx={{ mt: 2 }}>
              <RadioGroup
                row
                {...field}
                onChange={(event, value) => field.onChange(value)}
                value={field.value}
                sx={{
                  gap: 2,
                  flexWrap: 'wrap'
                }}
              >
                <FormControlLabel
                  value={type.PUBLIC}
                  control={<Radio size="small" />}
                  label="Public"
                  sx={{
                    m: 0,
                    px: 1.5,
                    py: 1,
                    borderColor:
                      field.value === type.PUBLIC ? 'warning.main' : 'divider',
                    minWidth: 140
                  }}
                />

                <FormControlLabel
                  value={type.PRIVATE}
                  control={<Radio size="small" />}
                  label="Private"
                  sx={{
                    m: 0,
                    px: 1.5,
                    py: 1,
                    borderColor:
                      field.value === type.PRIVATE ? 'info.main' : 'divider',
                    minWidth: 140
                  }}
                />

                <FormControlLabel
                  value={type.WORKSPACE}
                  control={<Radio size="small" />}
                  label="Workspace"
                  sx={{
                    m: 0,
                    px: 1.5,
                    py: 1,
                    borderColor:
                      field.value === type.WORKSPACE ? 'success.main' : 'divider',
                    minWidth: 140
                  }}
                />
              </RadioGroup>

              {field.value && (
                <Alert
                  severity={visibilityAlertConfig[field.value]?.severity}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  {visibilityAlertConfig[field.value]?.message}
                </Alert>
              )}
            </Box>
          )}
        />

        <Box sx={{ alignSelf: 'flex-end', mt: 3 }}>
          <Button
            className="interceptor-loading"
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Change
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default TabInfo