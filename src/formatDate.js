export function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Format the date to get the weekday and month
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    // Get the day and add the suffix
    const day = date.getDate();
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';
  
    // Replace the numeric day with the day + suffix
    formattedDate = formattedDate.replace(day, `${day}${suffix}`);
  
    return formattedDate;
  }
  
  console.log(formatDate('2025-01-01')); // Output: "Wednesday, January 1st"
  