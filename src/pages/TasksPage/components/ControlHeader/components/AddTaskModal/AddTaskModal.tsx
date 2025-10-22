import { CommonModal } from 'components/CommonModal';
import { Controller, useForm } from 'react-hook-form';
import { CreateTaskDefaultValues, TaskPriorityValues, TaskStatusValues } from './config';
import { getCreateTaskSchema } from './schema';
import { TaskPriorityLabels, TaskStatusLabels } from '../../../../config';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, type FC } from 'react';
import { type CreateTaskFormData } from './types';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';

interface AddTaskModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (taskData: CreateTaskFormData) => void;
}

export const AddTaskModal: FC<AddTaskModalProps> = ({ open, handleClose, onSubmit }) => {
  const { t } = useTranslation('tasksPage');
  const createTaskSchema = useMemo(() => getCreateTaskSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: CreateTaskDefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit((data: CreateTaskFormData) => {
    onSubmit(data);
    reset();
  });

  useEffect(() => {
    if (open) {
      reset();
      clearErrors();
    }
  }, [open, reset, clearErrors]);

  return (
    <CommonModal open={open} handleClose={handleClose} title={t('add.title')}>
      <Box component="form" onSubmit={(e) => void handleFormSubmit(e)}>
        <DialogContent>
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="title"
            label={t('add.labels.title')}
            fullWidth
            margin="normal"
            helperText={t(errors.title?.message || '')}
          />
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="description"
            label={t('add.labels.description')}
            fullWidth
            multiline
            margin="normal"
            helperText={t(errors.description?.message || '')}
          />
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="deadline"
            label={t('add.labels.deadline')}
            type="date"
            fullWidth
            margin="normal"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            helperText={t(errors.deadline?.message || '')}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">{t('add.labels.status')}</InputLabel>
                <Select
                  {...field}
                  labelId="status-select-label"
                  label={t('add.labels.status')}
                  onFocus={() => clearErrors('status')}
                >
                  {TaskStatusValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {t(TaskStatusLabels[value])}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="priority-select-label">{t('add.labels.priority')}</InputLabel>
                <Select
                  {...field}
                  labelId="priority-select-label"
                  label={t('add.labels.priority')}
                  onFocus={() => clearErrors('priority')}
                >
                  {TaskPriorityValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {t(TaskPriorityLabels[value])}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={value}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={name}
                    label={t('add.labels.tags')}
                    margin="normal"
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                    onFocus={() => clearErrors('tags')}
                  />
                )}
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            {t('add.buttons.cancel')}
          </Button>
          <Button type="submit" variant="contained">
            {t('add.buttons.create')}
          </Button>
        </DialogActions>
      </Box>
    </CommonModal>
  );
};
