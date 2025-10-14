import { CommonModal } from 'components/CommonModal';
import { TaskPriority, TaskStatus } from 'types/task';
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
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormClearErrors,
} from 'react-hook-form';
import type { FC, FormEvent } from 'react';
import { type CreateTaskFormData } from '../types';
import type { ValueOf } from 'types/utils';

const TaskStatusLabels: Record<ValueOf<typeof TaskStatus>, string> = {
  [TaskStatus.PENDING]: 'Pending',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.COMPLETED]: 'Completed',
};

const TaskPriorityLabels: Record<ValueOf<typeof TaskPriority>, string> = {
  [TaskPriority.LOW]: 'Low',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.HIGH]: 'High',
};

interface AddTaskModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  control: Control<CreateTaskFormData>;
  errors: FieldErrors<CreateTaskFormData>;
  clearErrors: UseFormClearErrors<CreateTaskFormData>;
}

export const AddTaskModal: FC<AddTaskModalProps> = ({
  open,
  handleClose,
  onSubmit,
  control,
  errors,
  clearErrors,
}) => {
  return (
    <CommonModal open={open} handleClose={handleClose} title="Add Task">
      <Box component="form" onSubmit={(e) => void onSubmit(e)}>
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
                  {Object.values(TaskStatus).map((value) => (
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
                  {Object.values(TaskPriority).map((value) => (
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
