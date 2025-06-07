import * as React from "react"
import {
  CalendarDate,
  getLocalTimeZone,
  today
} from "@internationalized/date"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  type CalendarCellProps as AriaCalendarCellProps,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  type CalendarGridBodyProps as AriaCalendarGridBodyProps,
  CalendarGridHeader as AriaCalendarGridHeader,
  type CalendarGridHeaderProps as AriaCalendarGridHeaderProps,
  type CalendarGridProps as AriaCalendarGridProps,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  type CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
  type CalendarProps as AriaCalendarProps,
  type DateValue as AriaDateValue,
  Heading as AriaHeading,
  RangeCalendar as AriaRangeCalendar,
  type RangeCalendarProps as AriaRangeCalendarProps,
  RangeCalendarStateContext as AriaRangeCalendarStateContext,
  composeRenderProps,
  Text,
  useLocale,
} from "react-aria-components"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button"
import { useState } from "react"


type PickerView = 'decade' | 'year' | 'month' | 'calendar'

interface DatePickerState {
  selectedDecade?: number
  selectedYear?: number
  selectedMonth?: number
  currentView: PickerView
}

export interface YearPickerProps {
  minValue?: AriaDateValue
  maxValue?: AriaDateValue
  onDateSelect?: (year: number, month: number) => void
}

const getDecades = (minYear: number, maxYear: number) => {
  const startDecade = Math.floor(minYear / 10) * 10
  const endDecade = Math.ceil(maxYear / 10) * 10

  return Array.from(
    { length: (endDecade - startDecade) / 10 }, 
    (_, i) => startDecade + i * 10
  ).map(decade => ({
    start: decade,
    end: decade + 9,
    label: `${decade}-${decade + 9}`
  }))
}

const getYearsInDecade = (decade: number) => {
  return Array.from({ length: 10 }, (_, i) => decade + i)
}

const getMonths = () => {
  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ]

  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: monthNames[i]
  }))
}

export const YearPicker: React.FC<YearPickerProps> = ({ 
  minValue, 
  maxValue, 
  onDateSelect 
}) => {
  const currentYear = today(getLocalTimeZone()).year
  const minYear = minValue?.year || currentYear - 50
  const maxYear = maxValue?.year || currentYear + 20

  const [state, setState] = useState<DatePickerState>({
    currentView: 'decade'
  })

  const decades = getDecades(minYear, maxYear)

  const handleDecadeSelect = (decade: number) => {
    setState(prev => ({
      ...prev,
      selectedDecade: decade,
      currentView: 'year'
    }))
  }

  const handleYearSelect = (year: number) => {
    setState(prev => ({
      ...prev,
      selectedYear: year,
      currentView: 'month'
    }))
  }

  const handleMonthSelect = (month: number) => {
    if (state.selectedYear) {
      setState(prev => ({
        ...prev,
        selectedMonth: month,
        currentView: 'calendar'
      }))
      onDateSelect?.(state.selectedYear, month)
    }
  }

  const handleBackNavigation = () => {
    setState(prev => {
      switch (prev.currentView) {
        case 'year':
          return { ...prev, currentView: 'decade', selectedDecade: undefined }
        case 'month':
          return { ...prev, currentView: 'year', selectedYear: undefined }
        case 'calendar':
          return { ...prev, currentView: 'month', selectedMonth: undefined }
        default:
          return prev
      }
    })
  }

  const getCurrentTitle = () => {
    switch (state.currentView) {
      case 'decade':
        return 'Dekade auswählen'
      case 'year':
        return `Jahr auswählen (${state.selectedDecade}-${(state.selectedDecade || 0) + 9})`
      case 'month':
        return `Monat auswählen (${state.selectedYear})`
      case 'calendar': {
        const monthName = getMonths().find(m => m.value === state.selectedMonth)?.label || ''
        return `${monthName} ${state.selectedYear}`
      }
      default:
        return ''
    }
  }

  return (
    <div className="w-full">
      {/* Navigation Header */}
      <div className='mb-4 flex items-center justify-between'>
        {state.currentView !== 'decade' && (
          <Button
            variant="ghost"
            size="sm"
            slot={null}
            onClick={handleBackNavigation}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Zurück
          </Button>
        )}
        <h3 className='flex-1 text-center font-medium text-sm'>
          {getCurrentTitle()}
        </h3>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Decade Selection */}
      {state.currentView === 'decade' && (
        <div className="grid grid-cols-2 gap-2">
          {decades.map((decade) => (
            <Button
              key={decade.start}
              variant="outline"
              slot={null}
              onClick={() => handleDecadeSelect(decade.start)}
              className="h-12 text-sm"
            >
              {decade.label}
            </Button>
          ))}
        </div>
      )}

      {/* Year Selection */}
      {state.currentView === 'year' && state.selectedDecade && (
        <div className="grid grid-cols-5 gap-2">
          {getYearsInDecade(state.selectedDecade).map((year) => (
            <Button
              key={year}
              variant="outline"
              onClick={() => handleYearSelect(year)}
              slot={null}
              className="h-12 text-sm"
              disabled={year < minYear || year > maxYear}
            >
              {year}
            </Button>
          ))}
        </div>
      )}

      {/* Month Selection */}
      {state.currentView === 'month' && (
        <div className="grid grid-cols-3 gap-2">
          {getMonths().map((month) => (
            <Button
              key={month.value}
              slot={null}
              variant="outline"
              onClick={() => handleMonthSelect(month.value)}
              className="h-12 text-sm"
            >
              {month.label}
            </Button>
          ))}
        </div>
      )}

      {/* Calendar View Indicator */}
      {state.currentView === 'calendar' && (
        <div className='py-4 text-center text-muted-foreground text-sm'>
          Kalender für {getCurrentTitle()} wird angezeigt
        </div>
      )}
    </div>
  )
}

const BaseCalendar = AriaCalendar
const RangeCalendar = AriaRangeCalendar

interface CalendarHeadingProps extends React.HTMLAttributes<HTMLElement> {
  onHeaderClicked?: () => void
}

const CalendarHeading: React.FC<CalendarHeadingProps> = ({ onHeaderClicked, ...props }) => {
  const { direction } = useLocale()


  const handleHeaderClick = () => {
    onHeaderClicked?.()
  }


  return (
    <header className="flex w-full items-center gap-1 px-1 pb-4"  {...props}>
      <Button
        slot={null}
        variant="link"
        className="flex-1 justify-start"
        onClick={handleHeaderClick}
      >
        <AriaHeading />
      </Button>

      <Button
        slot="previous"
        type="button"
        variant="outline"
        size="icon-sm"
      >
        {direction === "rtl" ? (
          <ChevronRightIcon aria-hidden className="size-4" />
        ) : (
          <ChevronLeftIcon aria-hidden className="size-4" />
        )}
      </Button>

      <Button
        slot="next"
        type="button"
        variant="outline"
        size="icon-sm"
      >
        {direction === "rtl" ? (
          <ChevronLeftIcon aria-hidden className="size-4" />
        ) : (
          <ChevronRightIcon aria-hidden className="size-4" />
        )}
      </Button>
    </header>
  )
}

const CalendarGrid = ({ className, ...props }: AriaCalendarGridProps) => (
  <AriaCalendarGrid
    className={cn(
      " border-separate border-spacing-x-0 border-spacing-y-1 ",
      className
    )}
    {...props}
  />
)

const CalendarGridHeader = ({ ...props }: AriaCalendarGridHeaderProps) => (
  <AriaCalendarGridHeader {...props} />
)

const CalendarHeaderCell = ({
  className,
  ...props
}: AriaCalendarHeaderCellProps) => (
  <AriaCalendarHeaderCell
    className={cn(
      'w-8 rounded-md font-normal text-[0.8rem] text-muted-foreground',
      className
    )}
    {...props}
  />
)

const CalendarGridBody = ({
  className,
  ...props
}: AriaCalendarGridBodyProps) => (
  <AriaCalendarGridBody className={cn("[&>tr>td]:p-0", className)} {...props} />
)

const CalendarCell = ({ className, ...props }: AriaCalendarCellProps) => {
  const isRange = Boolean(React.useContext(AriaRangeCalendarStateContext))
  return (
    <AriaCalendarCell
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          buttonVariants({ variant: "ghost" }),
          'relative z-[60] flex size-8 cursor-pointer items-center justify-center p-0 font-normal text-sm',
          /* Disabled */
          renderProps.isDisabled && "text-muted-foreground opacity-50",
          /* Selected */
          renderProps.isSelected &&
          'bg-primary text-primary-foreground data-[focused]:bg-primary data-[focused]:text-primary-foreground',
          /* Hover */
          renderProps.isHovered &&
          renderProps.isSelected &&
          (renderProps.isSelectionStart ||
            renderProps.isSelectionEnd ||
            !isRange) &&
          "data-[hovered]:bg-primary data-[hovered]:text-primary-foreground",
          /* Selection Start/End */
          renderProps.isSelected &&
          isRange &&
          !renderProps.isSelectionStart &&
          !renderProps.isSelectionEnd &&
          "rounded-none bg-accent text-accent-foreground",
          /* Outside Month */
          renderProps.isOutsideMonth &&
          "text-muted-foreground opacity-50 data-[selected]:bg-accent/50 data-[selected]:text-muted-foreground data-[selected]:opacity-30",
          /* Current Date */
          renderProps.date.compare(today(getLocalTimeZone())) === 0 &&
          !renderProps.isSelected &&
          "bg-accent text-accent-foreground",
          /* Unavailable Date */
          renderProps.isUnavailable && "cursor-default text-destructive ",
          renderProps.isInvalid &&
          "bg-destructive text-destructive-foreground data-[focused]:bg-destructive data-[hovered]:bg-destructive data-[focused]:text-destructive-foreground data-[hovered]:text-destructive-foreground",
          className
        )
      )}
      {...props}
    />
  )
}

interface JollyCalendarProps<T extends AriaDateValue>
  extends AriaCalendarProps<T> {
  errorMessage?: string
}

export function Calendar<T extends AriaDateValue>({
  errorMessage,
  className,
  ...props
}: JollyCalendarProps<T>) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [displayMonth, setDisplayMonth] = useState(() => {
    const today = new Date()
    return new CalendarDate(today.getFullYear(), today.getMonth() + 1, 1)
  })

  const handleHeaderClicked = () => {
    setShowCalendar(!showCalendar)
  }

  const handleDateSelect = (year: number, month: number) => {
    const newDisplayMonth = new CalendarDate(year, month, 1)
    setDisplayMonth(newDisplayMonth)
    setShowCalendar(true)
  }

  return (
    <BaseCalendar
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
      // Forciere die Anzeige des ausgewählten Monats
      key={`${displayMonth.year}-${displayMonth.month}`}
      defaultFocusedValue={displayMonth as T}
      {...props}
    >
      <CalendarHeading onHeaderClicked={handleHeaderClicked} />

      {!showCalendar ? (
        <YearPicker
          minValue={props.minValue}
          maxValue={props.maxValue}
          onDateSelect={handleDateSelect}
        />
      ) : (
        <CalendarGrid>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <CalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
      )}


      {errorMessage && (
        <Text className='text-destructive text-sm' slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </BaseCalendar>
  )
}

interface JollyRangeCalendarProps<T extends AriaDateValue>
  extends AriaRangeCalendarProps<T> {
  errorMessage?: string
}

function JollyRangeCalendar<T extends AriaDateValue>({
  errorMessage,
  className,
  ...props
}: JollyRangeCalendarProps<T>) {
  return (
    <RangeCalendar
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
      {...props}
    >
      <CalendarHeading />
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className='text-destructive text-sm'>
          {errorMessage}
        </Text>
      )}
    </RangeCalendar>
  )
}

export {
  BaseCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  RangeCalendar,
}

export type { JollyCalendarProps, JollyRangeCalendarProps }