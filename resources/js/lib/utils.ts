import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(birthdate: string): number {
  const birth = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}


export const dateNow = (): string => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months start at 0
  const year = String(now.getFullYear()); // Full year (e.g., 2025)

  return `${day}/${month}/${year}`;
};


export function isOver36Chars(str: string): boolean {
  return str?.length >= 36;
}


export function abbreviateMiddleName(middleName: string): string {
  if (!middleName?.trim()) return ''; // Handle empty or whitespace-only input

  return `${middleName?.trim()[0].toUpperCase()}.`;
}


export function formatBirthdate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return ''; // Invalid date

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
