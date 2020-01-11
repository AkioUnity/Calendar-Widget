package com.commons.dialogs

import androidx.appcompat.app.AlertDialog
import com.kaybear.R
import com.commons.activities.BaseSimpleActivity
import com.commons.extensions.*
import kotlinx.android.synthetic.main.dialog_export_settings.view.*

class ExportSettingsDialog(val activity: BaseSimpleActivity, val defaultFilename: String, callback: (path: String) -> Unit) {
    init {
        val lastUsedFolder = activity.baseConfig.lastExportedSettingsFolder
        var folder = if (lastUsedFolder.isNotEmpty() && activity.getDoesFilePathExist(lastUsedFolder)) {
            lastUsedFolder
        } else {
            activity.internalStoragePath
        }

        val view = activity.layoutInflater.inflate(R.layout.dialog_export_settings, null).apply {
            export_settings_filename.setText(defaultFilename)
            export_settings_path.text = activity.humanizePath(folder)
            export_settings_path.setOnClickListener {
                FilePickerDialog(activity, folder, false, showFAB = true) {
                    export_settings_path.text = activity.humanizePath(it)
                    folder = it
                }
            }
        }

        AlertDialog.Builder(activity)
                .setPositiveButton(R.string.ok, null)
                .setNegativeButton(R.string.cancel, null)
                .create().apply {
                    activity.setupDialogStuff(view, this, R.string.export_settings) {
                        getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener {
                            val filename = view.export_settings_filename.value
                            if (filename.isEmpty()) {
                                activity.toast(R.string.filename_cannot_be_empty)
                                return@setOnClickListener
                            }

                            activity.baseConfig.lastExportedSettingsFile = filename
                            val newPath = "${folder.trimEnd('/')}/$filename"
                            if (!newPath.getFilenameFromPath().isAValidFilename()) {
                                activity.toast(R.string.filename_invalid_characters)
                                return@setOnClickListener
                            }

                            activity.baseConfig.lastExportedSettingsFolder = folder
                            if (activity.getDoesFilePathExist(newPath)) {
                                val title = String.format(activity.getString(R.string.file_already_exists_overwrite), newPath.getFilenameFromPath())
                                ConfirmationDialog(activity, title) {
                                    callback(newPath)
                                    dismiss()
                                }
                            } else {
                                callback(newPath)
                                dismiss()
                            }
                        }
                    }
                }
    }
}
