import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface ShootDate {
  id: string;
  date: Date;
  location: string;
  scenes: string[];
  crew: string[];
}

interface ScheduleProps {
  shootDates: ShootDate[];
  onScheduleUpdate: (dates: ShootDate[]) => void;
}

export function Schedule({ shootDates, onScheduleUpdate }: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<ShootDate | null>(null);

  const locales = {
    'en-US': enUS
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = shootDates.map((date) => ({
    id: date.id,
    title: `Shooting at ${date.location}`,
    start: date.date,
    end: date.date,
    resource: date,
  }));

  const handleSelectEvent = (event: any) => {
    setSelectedDate(event.resource);
  };

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
}
