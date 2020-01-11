package com.kaybear.services

import android.content.Intent
import android.widget.RemoteViewsService
import com.kaybear.adapters.EventListWidgetAdapter

class WidgetService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent) = EventListWidgetAdapter(applicationContext)
}
