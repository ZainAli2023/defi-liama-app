import { Box, CircularProgress } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
      <CircularProgress />
    </Box>
  )
}

export {LoadingIndicator};