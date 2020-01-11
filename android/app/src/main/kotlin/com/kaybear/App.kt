package com.kaybear

import androidx.multidex.MultiDexApplication
import com.commons.extensions.checkUseEnglish

class App : MultiDexApplication() {
    override fun onCreate() {
        super.onCreate()
        checkUseEnglish()
    }
}
