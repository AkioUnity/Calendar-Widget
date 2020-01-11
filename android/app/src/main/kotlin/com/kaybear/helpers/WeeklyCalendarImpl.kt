package com.kaybear.helpers

import android.content.Context
import com.kaybear.extensions.eventsHelper
import com.kaybear.interfaces.WeeklyCalendar
import com.kaybear.models.Event
import com.commons.helpers.WEEK_SECONDS
import java.util.*

class WeeklyCalendarImpl(val callback: WeeklyCalendar, val context: Context) {
    var mEvents = ArrayList<Event>()

    fun updateWeeklyCalendar(weekStartTS: Long) {
        val endTS = weekStartTS + WEEK_SECONDS
        context.eventsHelper.getEvents(weekStartTS, endTS) {
            mEvents = it
            callback.updateWeeklyCalendar(it)
        }
    }
}
