import Holidays from 'date-holidays';
export function isDayOff(date: number, location: string) {
    // Convert serial date to JavaScript Date object
    const jsDate = new Date(Math.round((date - 25569) * 86400 * 1000));

    // Check if weekend
    const dayOfWeek = jsDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return true;
    }

    // Check if holiday
    const holidays = new Holidays(location);
    const dateStr = jsDate.toISOString().split('T')[0];

    return Array.isArray(holidays.isHoliday(dateStr));
}