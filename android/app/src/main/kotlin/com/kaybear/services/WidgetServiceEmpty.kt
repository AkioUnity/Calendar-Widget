package com.kaybear.services

import android.content.Intent
import android.widget.RemoteViewsService
import com.kaybear.adapters.EventListWidgetAdapterEmpty

class WidgetServiceEmpty : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent) = EventListWidgetAdapterEmpty(applicationContext)
}
