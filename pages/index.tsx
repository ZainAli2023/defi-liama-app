import React, { useEffect, useState, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProtocols } from '../slices/protocolsSlices';
import { AppDispatch } from '../store/store';
import { ProtocolsTable } from '../components/ProtocolsTable';
import { protocolHeadCells } from '../util/Constants';
import { getFilterOptions } from '../util/utilities';
import { Protocol, ChainOption, CatetoryOption } from '../types';
import Select, { OnChangeValue } from 'react-select';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {protocols, error} = useSelector((state: any) => state.protocols);
  const [renderProtocols, setRenderProtocols] = useState<Protocol[]>([]);
  const [chainOptions, setChainOptions] = useState<ChainOption[]>([]);
  const [filterChainOptions, setFilterChainOptions] = useState<OnChangeValue<ChainOption, true>>([]);
  const [categoryOptions, setCategoryOptions] = useState<CatetoryOption[]>([]);
  const [filterCategoryOptions, setFilterCatetoryOptions] = useState<OnChangeValue<CatetoryOption, true>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchProtocols());
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const {chainArray, categoryArray} = getFilterOptions(protocols);
    setChainOptions(chainArray);
    setCategoryOptions(categoryArray);
  }, [protocols]);

  useEffect(() => {
    let tempData:Protocol[] = protocols; 
    if (filterChainOptions.length > 0) {
      tempData = tempData.filter((protocol) => {
        return filterChainOptions.some((option) => protocol.chain === option.value);
      });
    }
  
    if (filterCategoryOptions.length > 0) {
      tempData = tempData.filter((protocol) => {
        return filterCategoryOptions.some((option) => protocol.category === option.value);
      });
    }

    setRenderProtocols(tempData);
  }, [protocols, filterChainOptions, filterCategoryOptions]);
  
  const handleChainChange = (selectedOptions: OnChangeValue<ChainOption, true>) => {
    if (selectedOptions) {
      setFilterChainOptions(selectedOptions);
    } else {
      setFilterChainOptions([]);
    }
  };

  const handleCategoryChange = (selectedOptions: OnChangeValue<CatetoryOption, true>) => {
    if (selectedOptions) {
      setFilterCatetoryOptions(selectedOptions);
    } else {
      setFilterCatetoryOptions([]);
    }
  };

  return (
    <Box sx={{marginTop: '100px'}}>
      { error ? (
        <Typography>{error}</Typography>
      ) : (
        <Box sx={{width: '95%', margin: 'auto'}}>
          <Box sx={{display: 'flex', marginBottom: '1rem', justifyContent: 'flex-end'}}>
            <Box sx={{width: '20%', zIndex: '1000'}}>
              <Select
              options={chainOptions}
              isMulti={true}
              value={filterChainOptions}
              placeholder="Select Chains..."
              onChange={handleChainChange}
              instanceId={useId()}
            />
            </Box>
            <Box sx={{width: '20%', zIndex: '1000', marginLeft: 4}}>
              <Select
                options={categoryOptions}
                isMulti={true}
                value={filterCategoryOptions}
                onChange={handleCategoryChange}
                placeholder="Select Categories..."
                instanceId={useId()}
              />
            </Box>
          </Box>
          <Box>
            { protocols && protocols.length > 0 && <ProtocolsTable rows={renderProtocols} headCells={protocolHeadCells} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
