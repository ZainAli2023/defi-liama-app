import { HeadCell } from "../types";

const protocolHeadCells: HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'tvl',
    numeric: true,
    disablePadding: true,
    label: 'TVL',
  },
  {
    id: 'change_1h',
    numeric: true,
    disablePadding: true,
    label: '1h %',
  },
  {
    id: 'change_1d',
    numeric: true,
    disablePadding: true,
    label: '24h %',
  },
  {
    id: 'change_7d',
    numeric: true,
    disablePadding: true,
    label: '7d %',
  },
  {
    id: 'chain',
    numeric: false,
    disablePadding: true,
    label: 'Chain',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: true,
    label: 'Category',
  },
];

export {
  protocolHeadCells,
}