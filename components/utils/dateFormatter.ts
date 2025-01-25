export function formatDate(date: string): string {
    const dateObj = new Date(date)
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }
    return dateObj.toLocaleString("en-US", options)
  }
  
  