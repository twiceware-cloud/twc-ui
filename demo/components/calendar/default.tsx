import {Calendar} from '@/components/twc-ui/calendar'
import { useState } from 'react'
import {
  type CalendarDate,
  getLocalTimeZone,
  today
} from "@internationalized/date"


export const Demo = () => {
  const [date, setDate] = useState<CalendarDate>(today(getLocalTimeZone()))
  return (
    <div className="flex flex-col gap-2">
      <Calendar value={date} onChange={setDate}/>
      <p>Selected date: {date?.toString()}</p>
    </div>
  )
}
