import { Order, Protocol, ChainOption, CatetoryOption } from "../types";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const valueA = a[orderBy];
  const valueB = b[orderBy];
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueB - valueA;
  } else {
    if (valueB < valueA) {
      return -1;
    }
    if (valueB > valueA) {
      return 1;
    }
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getFilterOptions(data: Protocol[]) {
  const chainSet = new Set<string>();
  const categorySet = new Set<string>();
  data.forEach((item) => {
    chainSet.add(item.chain);
    categorySet.add(item.category);
  });

  const chainArray: ChainOption[] = Array.from(chainSet).map(chain => ({
    label: chain,
    value: chain,
  })).sort((a, b) => a.label.localeCompare(b.label));
  const categoryArray: CatetoryOption[] = Array.from(categorySet).map(category => ({
    label: category,
    value: category,
  })).sort((a, b) => a.label.localeCompare(b.label));
  return { chainArray: chainArray, categoryArray: categoryArray};
}

export {
  descendingComparator,
  getComparator,
  stableSort,
  getFilterOptions,
}