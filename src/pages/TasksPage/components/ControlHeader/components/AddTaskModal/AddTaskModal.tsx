import { CommonModal } from 'components/CommonModal';
import { Controller, useForm } from 'react-hook-form';
import { CreateTaskDefaultValues, TaskPriorityValues, TaskStatusValues } from './config';
import { CreateTaskSchema } from './schema';
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
import type { FC } from 'react';
import { type CreateTaskFormData } from './types';

interface AddTaskModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (taskData: CreateTaskFormData) => void;
}

export const AddTaskModal: FC<AddTaskModalProps> = ({ open, handleClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: CreateTaskDefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit((data: CreateTaskFormData) => {
    onSubmit(data);
    reset();
  });

  return (
    <CommonModal open={open} handleClose={handleClose} title="Add Task">
      <Box component="form" onSubmit={(e) => void handleFormSubmit(e)}>
        <DialogContent>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                onFocus={() => clearErrors('title')}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
                onFocus={() => clearErrors('description')}
              />
            )}
          />
          <Controller
            control={control}
            name="deadline"
            render={({ field }) => (
              <TextField
                {...field}
                label="Deadline"
                type="date"
                fullWidth
                margin="normal"
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
                onFocus={() => clearErrors('deadline')}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  {...field}
                  labelId="status-select-label"
                  label="Status"
                  onFocus={() => clearErrors('status')}
                >
                  {TaskStatusValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {TaskStatusLabels[value]}
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
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                  {...field}
                  labelId="priority-select-label"
                  label="Priority"
                  onFocus={() => clearErrors('priority')}
                >
                  {TaskPriorityValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {TaskPriorityLabels[value]}
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
                    label="Tags"
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
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Box>
    </CommonModal>
  );
};
