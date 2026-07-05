export interface DayDetails {
  dayOfWeek: string;
  service: string;
  pillar: string;
  formattedDate: string;
}

export function getTodayISTDetails(date: Date = new Date()): DayDetails {
  // Get date and day name in India Standard Time (IST)
  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long'
  });
  
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const dayOfWeek = dayFormatter.format(date);
  const formattedDate = dateFormatter.format(date);

  let service = 'Flexible';
  let pillar = 'CONNECT';

  switch (dayOfWeek) {
    case 'Monday':
      service = 'AI Automation';
      pillar = 'TEACH';
      break;
    case 'Tuesday':
      service = 'Web Design';
      pillar = 'PROVE';
      break;
    case 'Wednesday':
      service = 'AI Automation';
      pillar = 'SHOW';
      break;
    case 'Thursday':
      service = 'Web Design';
      pillar = 'TEACH';
      break;
    case 'Friday':
      service = 'AI Automation';
      pillar = 'PROVE';
      break;
    case 'Saturday':
      service = 'Graphics Design';
      pillar = 'PROVE';
      break;
    case 'Sunday':
      service = 'Flexible';
      pillar = 'CONNECT'; // Or MYTH, we can make it dynamic
      break;
  }

  return {
    dayOfWeek,
    service,
    pillar,
    formattedDate
  };
}
