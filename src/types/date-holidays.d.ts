declare module 'date-holidays' {
    class Holidays {
        constructor(country: string);
        isHoliday(date: Date): boolean;
    }
    export default Holidays;
} 