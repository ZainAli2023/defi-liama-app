import React, { useState, useMemo }from 'react';
import { Box, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, Avatar, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Order, Protocol, ProtocolsTableHeadProps, ProtocolsTableProps } from '../types';
import { stableSort, getComparator } from '../util/utilities';
import FormatNumber from '../util/FormatNumber';

const ProtocolsTableHead: React.FC<ProtocolsTableHeadProps> = ( props => {
  const { headCells, order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Protocol) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
  return (
   <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography fontWeight="bold">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
});

const ProtocolsTable: React.FC<ProtocolsTableProps> = ({ rows, headCells }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Protocol>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Protocol,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() =>
    stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ), [order, orderBy, page, rowsPerPage, rows]);


  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer  sx={{ maxHeight: 500 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
          >
            <ProtocolsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer'}}
                  >
                    <TableCell scope="row" align="center">{row.id}</TableCell>
                    <TableCell align="center" sx={{display: 'flex', alignItems: 'center' }}>
                      <Avatar src={row.logo} alt={row.name} sx={{marginRight: '20px'}}/>
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.tvl ? '$' + FormatNumber(row.tvl) : '-'}</TableCell>
                    <TableCell align="center">{row.change_1h ? FormatNumber(row.change_1h) + '%' : '-'}</TableCell>
                    <TableCell align="center">{row.change_1d ? FormatNumber(row.change_1d) + '%' : '-'}</TableCell>
                    <TableCell align="center">{row.change_7d ? FormatNumber(row.change_1d) + '%' : '-'}</TableCell>
                    <TableCell align="center">{row.chain ? row.chain : '-'}</TableCell>
                    <TableCell align="center">{row.category ? row.category : '-'}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
};

export {ProtocolsTable}