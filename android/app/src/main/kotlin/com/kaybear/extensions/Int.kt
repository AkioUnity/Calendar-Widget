package com.kaybear.extensions

import com.kaybear.helpers.MONTH
import com.kaybear.helpers.WEEK
import com.kaybear.helpers.YEAR

fun Int.isXWeeklyRepetition() = this != 0 && this % WEEK == 0

fun Int.isXMonthlyRepetition() = this != 0 && this % MONTH == 0

fun Int.isXYearlyRepetition() = this != 0 && this % YEAR == 0
