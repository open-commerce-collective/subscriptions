import { addDays, addWeeks, addMonths, addYears, parseISO } from 'date-fns';

type FrequencyUnit = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

export const calculateNextBillingDate = (startDate: string | Date, frequency: number, frequencyUnit: FrequencyUnit): Date => {
	let date = startDate instanceof Date ? startDate : parseISO(startDate);

	switch (frequencyUnit) {
		case 'DAY':
			return addDays(date, frequency);
		case 'WEEK':
			return addWeeks(date, frequency);
		case 'MONTH':
			return addMonths(date, frequency);
		case 'YEAR':
			return addYears(date, frequency);
		default:
			throw new Error(`Invalid frequency unit: ${frequencyUnit}`);
	}
}
