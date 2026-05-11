// Array of full month names for display purposes
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];


export const getMonthName = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Unknown';
  return MONTH_NAMES[date.getUTCMonth()];
};


export const getYear = (dateString) => {
  if (!dateString) return NaN;
  return new Date(dateString).getUTCFullYear();
};


export const getMonthYearKey = (dateString) => {
  return `${getMonthName(dateString)} ${getYear(dateString)}`;
};


export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};


export const compareDatesAsc = (a, b) => {
  return new Date(a) - new Date(b);
};

export const compareDatesDesc = (a, b) => {
  return new Date(b) - new Date(a);
};

export default {
  getMonthName,
  getYear,
  getMonthYearKey,
  formatDate,
  compareDatesAsc,
  compareDatesDesc,
};
