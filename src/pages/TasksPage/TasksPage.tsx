import { type FC, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Chip,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';

const TasksPage: FC = () => {
  const [selectValue, setSelectValue] = useState('option1');
  const [radioValue, setRadioValue] = useState('a');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" sx={{ width: '7rem', height: '3rem' }}>
          Contained
        </Button>
        <Button variant="contained" sx={{ width: '7rem', height: '3rem' }} disabled>
          Contained disabled
        </Button>
        <Button variant="outlined" sx={{ width: '7rem', height: '3rem' }}>
          Outlined
        </Button>
        <Button variant="outlined" sx={{ width: '7rem', height: '3rem' }} disabled>
          Outlined disabled
        </Button>
        <Button variant="contained" color="error" sx={{ width: '7rem', height: '3rem' }}>
          Destructive
        </Button>
        <Button variant="contained" color="error" sx={{ width: '7rem', height: '3rem' }} disabled>
          Destructive
        </Button>
        <Button variant="sirserg" sx={{ width: '7rem', height: '3rem' }}>
          Custom
        </Button>
        <Button variant="sirserg" sx={{ width: '7rem', height: '3rem' }} disabled>
          Custom disabled
        </Button>
      </Box>

      <Divider />
      <Typography variant="h1">H1</Typography>
      <Typography variant="h2">H2</Typography>
      <Typography variant="h3">H3</Typography>
      <Typography variant="h4">H4</Typography>
      <Typography variant="h5">H5</Typography>
      <Typography variant="h6">H6</Typography>

      <Typography variant="h6">Form Elements</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField label="Outlined Input" variant="outlined" />
        <TextField label="Outlined Input" error={true} variant="outlined" />
        <Select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
        <RadioGroup row value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
          <FormControlLabel value="a" control={<Radio />} label="Option A" />
          <FormControlLabel value="b" control={<Radio />} label="Option B" />
        </RadioGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip label="Primary Chip" color="primary" />
        <Chip label="Secondary Chip" color="secondary" variant="outlined" />
        <Chip label="Success Chip" color="success" />
      </Box>

      <Card sx={{ maxWidth: 320, height: 300 }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box>
            <Typography variant="h6">Card Example</Typography>
            <Typography variant="body2" color="text.secondary">
              This card helps you visualize how paper surfaces look with your theme.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button size="small" variant="contained">
              Action
            </Button>
            <Button size="small" variant="outlined">
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TasksPage;
