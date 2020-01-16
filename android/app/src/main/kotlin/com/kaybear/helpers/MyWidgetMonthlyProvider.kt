package com.kaybear.helpers

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.res.Resources
import android.graphics.Color
import android.view.View
import android.widget.RemoteViews
import androidx.core.app.NotificationCompatExtras
import com.kaybear.R
import com.kaybear.activities.SplashActivity
import com.kaybear.extensions.config
import com.kaybear.extensions.launchNewEventIntent
import com.kaybear.interfaces.MonthlyCalendar
import com.kaybear.models.DayMonthly
import com.kaybear.models.Event
import com.commons.extensions.*
import org.joda.time.DateTime
import android.util.Log

class MyWidgetMonthlyProvider : AppWidgetProvider() {
    private val PREV = "prev"
    private val NEXT = "next"
    private val GO_TO_TODAY = "go_to_today"
    private val NEW_EVENT = "new_event"
    private val Next_Widget = "next_widget"
    private val First_Widget = "first_widget"

    companion object {
        private var targetDate = DateTime.now().withDayOfMonth(1).plusYears(10);
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        targetDate = DateTime.now().withDayOfMonth(1).plusYears(10);
        performUpdate(context)
    }

//    override fun onRestored(context: Context,  oldWidgetIds: IntArray, newWidgetIds: IntArray) {
//        performUpdate(context)
//    }
//
//    override fun onEnabled(context: Context) {
//        performUpdate(context)
//    }

    private fun performUpdate(context: Context) {
        MonthlyCalendarImpl(monthlyCalendar, context).getMonth(targetDate)
    }

    private fun getComponentName(context: Context) = ComponentName(context, MyWidgetMonthlyProvider::class.java)

    private fun setupIntent(context: Context, views: RemoteViews, action: String, id: Int) {
        Intent(context, MyWidgetMonthlyProvider::class.java).apply {
            this.action = action
            val pendingIntent = PendingIntent.getBroadcast(context, 0, this, 0)
            views.setOnClickPendingIntent(id, pendingIntent)
        }
    }

    private fun setupAppOpenIntent(context: Context, views: RemoteViews, id: Int, dayCode: String) {
        (context.getLaunchIntent() ?: Intent(context, SplashActivity::class.java)).apply {
            putExtra(DAY_CODE, dayCode)
            putExtra(VIEW_TO_OPEN, MONTHLY_VIEW)
            val pendingIntent = PendingIntent.getActivity(context, Integer.parseInt(dayCode.substring(0, 6)), this, 0)
            views.setOnClickPendingIntent(id, pendingIntent)
        }

    }

    private fun setupDayOpenIntent(context: Context, views: RemoteViews, id: Int, dayCode: String) {
        (context.getLaunchIntent() ?: Intent(context, SplashActivity::class.java)).apply {
            putExtra(DAY_CODE, dayCode)
            val pendingIntent = PendingIntent.getActivity(context, Integer.parseInt(dayCode), this, 0)
            views.setOnClickPendingIntent(id, pendingIntent)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            PREV -> getPrevMonth(context)
            NEXT -> getNextMonth(context)
            GO_TO_TODAY -> goToToday(context)
            NEW_EVENT -> context.launchNewEventIntent()
            Next_Widget -> getNextWidget(context)
            First_Widget->{
                Log.d("Log", "First_widget")
                targetDate = DateTime.now().withDayOfMonth(1).plusYears(10);
                performUpdate(context)
            }
            else -> {
                super.onReceive(context, intent)
            }
        }
    }

    private fun getPrevMonth(context: Context) {
        targetDate = targetDate!!.minusMonths(1)
        MonthlyCalendarImpl(monthlyCalendar, context).getMonth(targetDate!!)
    }

    private fun getNextMonth(context: Context) {
        targetDate = targetDate!!.plusMonths(1)
        MonthlyCalendarImpl(monthlyCalendar, context).getMonth(targetDate!!)
    }

    private fun getNextWidget(context: Context) {
        goToToday(context)
    }

    private fun goToToday(context: Context) {
        targetDate = DateTime.now().withDayOfMonth(1)
        MonthlyCalendarImpl(monthlyCalendar, context).getMonth(targetDate!!)
    }

    private fun updateDays(context: Context, views: RemoteViews, days: List<DayMonthly>) {
        val displayWeekNumbers = context.config.showWeekNumbers
        val textColor = context.config.widgetTextColor
        val dimPastEvents = context.config.dimPastEvents
        val smallerFontSize = context.config.getFontSize() - 3f
        val res = context.resources
        val len = days.size
        val packageName = context.packageName
        views.apply {
            setTextColor(R.id.week_num, textColor)
            setTextSize(R.id.week_num, smallerFontSize)
            setViewVisibility(R.id.week_num, if (displayWeekNumbers) View.VISIBLE else View.GONE)
        }

        for (i in 0..5) {
            val id = res.getIdentifier("week_num_$i", "id", packageName)
            views.apply {
                setText(id, "${days[i * 7 + 3].weekOfYear}:")    // fourth day of the week matters at determining week of the year
                setTextColor(id, textColor)
                setTextSize(id, smallerFontSize)
                setViewVisibility(id, if (displayWeekNumbers) View.VISIBLE else View.GONE)
            }
        }

        val weakTextColor = textColor.adjustAlpha(MEDIUM_ALPHA)
        for (i in 0 until len) {
            val day = days[i]
            val currTextColor = if (day.isThisMonth) textColor else weakTextColor
            val id = res.getIdentifier("day_$i", "id", packageName)
            views.removeAllViews(id)
            addDayNumber(context, views, day, currTextColor, id)
            setupDayOpenIntent(context, views, id, day.code)

            day.dayEvents = day.dayEvents.asSequence().sortedWith(compareBy({ it.flags and FLAG_ALL_DAY == 0 }, { it.startTS }, { it.title }))
                    .toMutableList() as ArrayList<Event>

            day.dayEvents.forEach {
                var backgroundColor = it.color
                var eventTextColor = backgroundColor.getContrastColor()

                if (!day.isThisMonth || (dimPastEvents && it.isPastEvent)) {
                    eventTextColor = eventTextColor.adjustAlpha(MEDIUM_ALPHA)
                    backgroundColor = backgroundColor.adjustAlpha(MEDIUM_ALPHA)
                }

                val newRemoteView = RemoteViews(packageName, R.layout.day_monthly_event_view).apply {
                    setText(R.id.day_monthly_event_id, it.title.replace(" ", "\u00A0"))
                    setTextColor(R.id.day_monthly_event_id, eventTextColor)
                    setTextSize(R.id.day_monthly_event_id, smallerFontSize - 3f)
                    setBackgroundColor(R.id.day_monthly_event_id, backgroundColor)
                }
                views.addView(id, newRemoteView)
            }
        }
    }

    private fun addDayNumber(context: Context, views: RemoteViews, day: DayMonthly, textColor: Int, id: Int) {
        val newRemoteView = RemoteViews(context.packageName, R.layout.day_monthly_number_view).apply {
            setText(R.id.day_monthly_number_id, day.value.toString())
            setTextSize(R.id.day_monthly_number_id, context.config.getFontSize() - 3f)

            if (day.isToday) {
                setBackgroundColor(R.id.day_monthly_number_id, textColor)
                setTextColor(R.id.day_monthly_number_id, textColor.getContrastColor())
            } else {
                setTextColor(R.id.day_monthly_number_id, Color.parseColor("#FFFFFF"))
            }
        }
        views.addView(id, newRemoteView)
    }

    private val monthlyCalendar = object : MonthlyCalendar {
        override fun updateMonthlyCalendar(context: Context, month: String, days: ArrayList<DayMonthly>, checkedEvents: Boolean, currTargetDate: DateTime) {
            val largerFontSize = context.config.getFontSize() + 3f
            val textColor = context.config.widgetTextColor
            val resources = context.resources

            val appWidgetManager = AppWidgetManager.getInstance(context)
            appWidgetManager.getAppWidgetIds(getComponentName(context)).forEach {
                val views = RemoteViews(context.packageName, R.layout.fragment_month_widget)
                views.setText(R.id.top_value, month)

//                views.setBackgroundColor(R.id.calendar_holder, context.config.widgetBgColor)

                views.setTextColor(R.id.top_value, textColor)
                views.setTextSize(R.id.top_value, largerFontSize)

                var bmp = resources.getColoredBitmap(R.drawable.ic_chevron_left_vector, textColor)
                views.setImageViewBitmap(R.id.top_left_arrow, bmp)

                bmp = resources.getColoredBitmap(R.drawable.ic_chevron_right_vector, textColor)
                views.setImageViewBitmap(R.id.top_right_arrow, bmp)

                bmp = resources.getColoredBitmap(R.drawable.ic_today_vector, textColor)
                views.setImageViewBitmap(R.id.top_go_to_today, bmp)

                bmp = resources.getColoredBitmap(R.drawable.ic_plus_vector, textColor)
                views.setImageViewBitmap(R.id.top_new_event, bmp)

//                bmp = resources.getColoredBitmap(R.drawable.ic_plus_vector, textColor)
//                views.setImageViewBitmap(R.id.first_widget_image, bmp)

                val shouldGoToTodayBeVisible = currTargetDate.withTime(0, 0, 0, 0) != DateTime.now().withDayOfMonth(1).withTime(0, 0, 0, 0)
                views.setVisibleIf(R.id.top_go_to_today, shouldGoToTodayBeVisible)

                val calendarVisible = currTargetDate.year<2029
                views.setVisibleIf(R.id.calendar_holder, calendarVisible)
                views.setVisibleIf(R.id.first_widget_image, !calendarVisible)

                updateDayLabels(context, views, resources, textColor)
                updateDays(context, views, days)

                setupIntent(context, views, PREV, R.id.top_left_arrow)
                setupIntent(context, views, NEXT, R.id.top_right_arrow)
                setupIntent(context, views, GO_TO_TODAY, R.id.top_go_to_today)
                setupIntent(context, views, NEW_EVENT, R.id.top_new_event)

                setupIntent(context, views, Next_Widget, R.id.first_widget_image)

                setupIntent(context, views, First_Widget, R.id.first_widget_btn)


                val monthCode = days.firstOrNull { it.code.substring(6) == "01" }?.code ?: Formatter.getTodayCode()
                setupIntent(context, views, First_Widget, R.id.top_value)
                setupAppOpenIntent(context, views, R.id.top_value, monthCode)
                setupAppOpenIntent(context, views, R.id.open_app_btn, monthCode)


                try {
                    appWidgetManager.updateAppWidget(it, views)
                } catch (ignored: RuntimeException) {
                }
            }
        }
    }

    private fun updateDayLabels(context: Context, views: RemoteViews, resources: Resources, textColor: Int) {
        val sundayFirst = context.config.isSundayFirst
        val smallerFontSize = context.config.getFontSize()
        val packageName = context.packageName
        val letters = context.resources.getStringArray(R.array.week_day_letters)
        for (i in 0..6) {
            val id = resources.getIdentifier("label_$i", "id", packageName)
            views.setTextColor(id, Color.parseColor("#0000FF"))
            views.setTextSize(id, smallerFontSize)

            var index = i
            if (sundayFirst) {
                index = (index + 6) % letters.size
            }

            views.setText(id, letters[index])
        }
    }
}
