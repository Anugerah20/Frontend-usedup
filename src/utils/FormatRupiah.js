// Define a function to format amount into IDR currency
export const formatToIDR = (amount) => {
  amount = Number(amount);
  // Ensure amount is a number
  if (typeof amount !== 'number') {
    return 'Invalid amount';
  }

  // Format the amount to IDR currency
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // You can change this to adjust the decimal places
  }).format(amount);

  return formattedAmount;
};