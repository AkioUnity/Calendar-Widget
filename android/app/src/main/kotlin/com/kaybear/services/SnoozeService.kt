package com.kaybear.services

import android.app.IntentService
import android.content.Intent
import com.kaybear.extensions.config
import com.kaybear.extensions.eventsDB
import com.kaybear.extensions.rescheduleReminder
import com.kaybear.helpers.EVENT_ID

class SnoozeService : IntentService("Snooze") {
    override fun onHandleIntent(intent: Intent) {
        val eventId = intent.getLongExtra(EVENT_ID, 0L)
        val event = eventsDB.getEventWithId(eventId)
        rescheduleReminder(event, config.snoozeTime)
    }
}
