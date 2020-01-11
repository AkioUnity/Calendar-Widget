package com.kaybear.receivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.kaybear.extensions.config
import com.kaybear.extensions.recheckCalDAVCalendars
import com.kaybear.extensions.refreshCalDAVCalendars
import com.kaybear.extensions.updateWidgets

class CalDAVSyncReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (context.config.caldavSync) {
            context.refreshCalDAVCalendars(context.config.caldavSyncedCalendarIds, false)
        }

        context.recheckCalDAVCalendars {
            context.updateWidgets()
        }
    }
}
