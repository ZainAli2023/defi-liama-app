import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProtocolsState } from '../types';

const initialState: ProtocolsState = {
  protocols: [],
  error: null,
};

export const fetchProtocols = createAsyncThunk('protocols/fetchProtocols', async () => {
  try {
    const response = await fetch('https://api.llama.fi/protocols');
    const temp = await response.json();
    const data = temp.map((item: any) => {return {...item, id: parseFloat(item.id)}})
    return data;
  } catch (error) {
    console.error('Failed to fetch protocols:', error);
    throw new Error('Failed to fetch protocols');
  }
});

const protocolsSlice = createSlice({
  name: 'protocols',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtocols.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProtocols.fulfilled, (state, action) => {
        state.protocols = action.payload;
        state.error = null;
      })
      .addCase(fetchProtocols.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch protocols';
      });
  },
});

export default protocolsSlice.reducer;
