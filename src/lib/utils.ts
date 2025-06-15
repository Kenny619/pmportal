import type { Filter } from "@/stores/wbsStore";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import holidays from "date-holidays"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Excel serial number to JST Date
export function excelSerialToJST(serial: number): Date {
  // Excel's epoch starts from 1899-12-30
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const utcDate = new Date(excelEpoch.getTime() + serial * millisecondsPerDay);

  // Convert to JST by adding 9 hours
  return new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
}


// Convert Excel serial number to Date
export function excelSerialToDate(serial: number): Date {
  // Excel's epoch starts from 1899-12-30
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return new Date(excelEpoch.getTime() + serial * millisecondsPerDay);
}

// Convert Date to Excel serial number
export function dateToExcelSerial(date: Date) {
  const excelEpoch = new Date(1899, 11, 30);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor(
    (date.getTime() - excelEpoch.getTime()) / millisecondsPerDay,
  );
}

//check if the filter is on
export function isCalendarFilterOn(currentFilter: Filter, defaultFilter: Filter) {

  for (const key of Object.keys(currentFilter)) {
    if (currentFilter[key as keyof Filter].length !== defaultFilter[key as keyof Filter].length) {
      return true;
    }
  }
  return false;
}

//get work days between two dates
export function getWorkDaysBetweenDates(startDate: Date, endDate: Date) {
  const hd = new holidays('JP');
  let workDays = 0;
  const currentDate = new Date(startDate);
  while (currentDate < endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !hd.isHoliday(currentDate)) {
      workDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return workDays;
}

export function getWorkdaysUntilFriday(date: Date) {
  const hd = new holidays('JP');
  let workDays = 0;
  const currentDate = new Date(date);
  while (currentDate.getDay() !== 5) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6 && !hd.isHoliday(currentDate)) {
      workDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return workDays;
}
