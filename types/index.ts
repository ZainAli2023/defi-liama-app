type Order = 'asc' | 'desc';

interface Protocol {
  id: number;
  name: string;
  logo: string;
  tvl: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  chain: string;
  category: string;
}

interface ProtocolsTableProps {
  rows: Protocol[];
  headCells: HeadCell[];
}

interface ProtocolsState {
  protocols: Protocol[];
  error: string | null;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Protocol;
  label: string;
  numeric: boolean;
}

interface ProtocolsTableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Protocol) => void;
  headCells: HeadCell[];
  order: Order;
  orderBy: string;
}

interface ChainOption {
  label: string,
  value: string,
}

interface CatetoryOption {
  label: string,
  value: string,
}

export type {
  Protocol,
  ProtocolsTableProps,
  ProtocolsState,
  HeadCell,
  ProtocolsTableHeadProps,
  Order,
  ChainOption,
  CatetoryOption,
}