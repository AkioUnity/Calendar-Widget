package com.commons.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.commons.extensions.*
import com.commons.helpers.SIDELOADING_TRUE
import com.commons.helpers.SIDELOADING_UNCHECKED

abstract class BaseSplashActivity : AppCompatActivity() {
    abstract fun initActivity()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (baseConfig.appSideloadingStatus == SIDELOADING_UNCHECKED) {
            if (checkAppSideloading()) {
                return
            }
        } else if (baseConfig.appSideloadingStatus == SIDELOADING_TRUE) {
            showSideloadingDialog()
            return
        }

        if (isThankYouInstalled() && baseConfig.appRunCount == 0) {
            getSharedTheme {
                if (it != null) {
                    baseConfig.apply {
                        wasSharedThemeForced = true
                        isUsingSharedTheme = true
                        wasSharedThemeEverActivated = true

                        textColor = it.textColor
                        backgroundColor = it.backgroundColor
                        primaryColor = it.primaryColor
                        appIconColor = it.appIconColor
                        navigationBarColor = it.navigationBarColor
                    }
                }
                initActivity()
            }
        } else {
            initActivity()
        }
    }
}
