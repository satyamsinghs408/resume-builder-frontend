export const normalizeDate = (dateStr: string | undefined): string | null => {
  if (!dateStr) return null;

  const lower = dateStr.toLowerCase().trim();
  if (lower === 'present' || lower === 'current' || lower === 'now') {
    return 'PRESENT'; // Special sentinel for caller to handle "current" flag
  }

  // Try parsing "Month Year" or "Year"
  // Map months to numbers
  const months: { [key: string]: string } = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    january: '01', february: '02', march: '03', april: '04', june: '06',
    july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
    sept: '09'
  };

  // Remove periods from abbreviations like "Aug."
  const cleanStr = lower.replace(/\./g, '');

  // Patterns:
  // 1. "YYYY"
  const yearMatch = cleanStr.match(/^(\d{4})$/);
  if (yearMatch) {
    return `${yearMatch[1]}-01`; // Default to January
  }

  // 2. "Month YYYY" (e.g., "aug 2025", "may 2021")
  // Regex looks for (alpha) space (digits)
  const monthYearMatch = cleanStr.match(/^([a-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = months[monthYearMatch[1].substring(0, 3)]; // Try first 3 chars
    const year = monthYearMatch[2];
    if (month && year) {
        return `${year}-${month}`;
    }
  }

  // 3. Fallback: try JS date parser
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }

  return null; // Failed to parse
};

export const formatDateRange = (startDate: string, endDate: string | undefined, current: boolean): string => {
  const format = (dateStr: string) => {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        // If YYYY-MM, we want "Month YYYY"
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
        return dateStr;
    }
  };

  const start = format(startDate);
  if (current) return `${start} - Present`;
  const end = format(endDate || '');
  if (!end) return start;
  return `${start} - ${end}`;
};
