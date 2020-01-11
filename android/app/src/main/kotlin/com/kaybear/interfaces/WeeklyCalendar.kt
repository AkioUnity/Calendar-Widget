package com.kaybear.interfaces

import com.kaybear.models.Event

interface WeeklyCalendar {
    fun updateWeeklyCalendar(events: ArrayList<Event>)
}
