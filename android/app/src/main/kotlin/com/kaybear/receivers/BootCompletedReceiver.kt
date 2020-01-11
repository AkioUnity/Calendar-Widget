package com.kaybear.receivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.kaybear.extensions.notifyRunningEvents
import com.kaybear.extensions.recheckCalDAVCalendars
import com.kaybear.extensions.scheduleAllEvents
import com.commons.helpers.ensureBackgroundThread

class BootCompletedReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        ensureBackgroundThread {
            context.apply {
                scheduleAllEvents()
                notifyRunningEvents()
                recheckCalDAVCalendars {}
            }
        }
    }
}
