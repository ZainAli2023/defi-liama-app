export default (amount: number) => {
  if (!amount)
    return '0'
  return amount.toLocaleString(undefined, {minimumFractionDigits: 3})
}