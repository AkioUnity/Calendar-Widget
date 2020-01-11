package com.kaybear.adapters

import android.view.Menu
import android.view.View
import android.view.ViewGroup
import com.kaybear.R
import com.kaybear.activities.SimpleActivity
import com.kaybear.dialogs.DeleteEventDialog
import com.kaybear.extensions.config
import com.kaybear.extensions.eventsHelper
import com.kaybear.extensions.handleEventDeleting
import com.kaybear.extensions.shareEvents
import com.kaybear.helpers.Formatter
import com.kaybear.helpers.ITEM_EVENT
import com.kaybear.helpers.ITEM_EVENT_SIMPLE
import com.kaybear.helpers.LOW_ALPHA
import com.kaybear.models.Event
import com.commons.adapters.MyRecyclerViewAdapter
import com.commons.extensions.adjustAlpha
import com.commons.extensions.applyColorFilter
import com.commons.extensions.beInvisible
import com.commons.extensions.beInvisibleIf
import com.commons.helpers.ensureBackgroundThread
import com.commons.views.MyRecyclerView
import kotlinx.android.synthetic.main.event_item_day_view.view.*

class DayEventsAdapter(activity: SimpleActivity, val events: ArrayList<Event>, recyclerView: MyRecyclerView, itemClick: (Any) -> Unit)
    : MyRecyclerViewAdapter(activity, recyclerView, null, itemClick) {

    private val allDayString = resources.getString(R.string.all_day)
    private val replaceDescriptionWithLocation = activity.config.replaceDescription
    private val dimPastEvents = activity.config.dimPastEvents

    init {
        setupDragListener(true)
    }

    override fun getActionMenuId() = R.menu.cab_day

    override fun prepareActionMode(menu: Menu) {}

    override fun actionItemPressed(id: Int) {
        when (id) {
            R.id.cab_share -> shareEvents()
            R.id.cab_delete -> askConfirmDelete()
        }
    }

    override fun getSelectableItemCount() = events.size

    override fun getIsItemSelectable(position: Int) = true

    override fun getItemSelectionKey(position: Int) = events.getOrNull(position)?.id?.toInt()

    override fun getItemKeyPosition(key: Int) = events.indexOfFirst { it.id?.toInt() == key }

    override fun onActionModeCreated() {}

    override fun onActionModeDestroyed() {}

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val layoutId = when (viewType) {
            ITEM_EVENT -> R.layout.event_item_day_view
            else -> R.layout.event_item_day_view_simple
        }
        return createViewHolder(layoutId, parent)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val event = events[position]
        holder.bindView(event, true, true) { itemView, layoutPosition ->
            setupView(itemView, event)
        }
        bindViewHolder(holder)
    }

    override fun getItemCount() = events.size

    override fun getItemViewType(position: Int): Int {
        val event = events[position]
        val detailField = if (replaceDescriptionWithLocation) event.location else event.description
        return if (detailField.isNotEmpty()) {
            ITEM_EVENT
        } else if (event.startTS == event.endTS) {
            ITEM_EVENT_SIMPLE
        } else if (event.getIsAllDay()) {
            val startCode = Formatter.getDayCodeFromTS(event.startTS)
            val endCode = Formatter.getDayCodeFromTS(event.endTS)
            if (startCode == endCode) {
                ITEM_EVENT_SIMPLE
            } else {
                ITEM_EVENT
            }
        } else {
            ITEM_EVENT
        }
    }

    private fun setupView(view: View, event: Event) {
        view.apply {
            event_item_frame.isSelected = selectedKeys.contains(event.id?.toInt())
            event_item_title.text = event.title
            event_item_description?.text = if (replaceDescriptionWithLocation) event.location else event.description
            event_item_start.text = if (event.getIsAllDay()) allDayString else Formatter.getTimeFromTS(context, event.startTS)
            event_item_end?.beInvisibleIf(event.startTS == event.endTS)
            event_item_color_bar.background.applyColorFilter(event.color)

            if (event.startTS != event.endTS) {
                val startCode = Formatter.getDayCodeFromTS(event.startTS)
                val endCode = Formatter.getDayCodeFromTS(event.endTS)

                event_item_end?.apply {
                    text = Formatter.getTimeFromTS(context, event.endTS)
                    if (startCode != endCode) {
                        if (event.getIsAllDay()) {
                            text = Formatter.getDateFromCode(context, endCode, true)
                        } else {
                            append(" (${Formatter.getDateFromCode(context, endCode, true)})")
                        }
                    } else if (event.getIsAllDay()) {
                        beInvisible()
                    }
                }
            }

            var newTextColor = textColor
            if (dimPastEvents && event.isPastEvent) {
                newTextColor = newTextColor.adjustAlpha(LOW_ALPHA)
            }

            event_item_start.setTextColor(newTextColor)
            event_item_end?.setTextColor(newTextColor)
            event_item_title.setTextColor(newTextColor)
            event_item_description?.setTextColor(newTextColor)
        }
    }

    private fun shareEvents() = activity.shareEvents(selectedKeys.distinct().map { it.toLong() })

    private fun askConfirmDelete() {
        val eventIds = selectedKeys.map { it.toLong() }.toMutableList()
        val eventsToDelete = events.filter { selectedKeys.contains(it.id?.toInt()) }
        val timestamps = eventsToDelete.map { it.startTS }
        val positions = getSelectedItemPositions()

        val hasRepeatableEvent = eventsToDelete.any { it.repeatInterval > 0 }
        DeleteEventDialog(activity, eventIds, hasRepeatableEvent) { it ->
            events.removeAll(eventsToDelete)

            ensureBackgroundThread {
                val nonRepeatingEventIDs = eventsToDelete.asSequence().filter { it.repeatInterval == 0 }.mapNotNull { it.id }.toMutableList()
                activity.eventsHelper.deleteEvents(nonRepeatingEventIDs, true)

                val repeatingEventIDs = eventsToDelete.asSequence().filter { it.repeatInterval != 0 }.mapNotNull { it.id }.toList()
                activity.handleEventDeleting(repeatingEventIDs, timestamps, it)
                activity.runOnUiThread {
                    removeSelectedItems(positions)
                }
            }
        }
    }
}
