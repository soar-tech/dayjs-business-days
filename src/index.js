export default (option = {}, dayjsClass, dayjsFactory) => {
  dayjsFactory.getHolidays = function () {
    return option.holidays;
  };

  dayjsFactory.setHolidays = function (holidays) {
    option.holidays = holidays;
  };

  dayjsFactory.setHolidayFormat = function (holidayFormat) {
    option.holidayFormat = holidayFormat;
  };

  dayjsFactory.getWorkingWeekdays = function () {
    return option.workingWeekdays;
  };

  dayjsFactory.setWorkingWeekdays = function (workingWeekdays) {
    option.workingWeekdays = workingWeekdays;
  };

  dayjsClass.prototype.isHoliday = function () {
    if (!option.holidays) return false;
    if (option.holidays.includes(this.format(option.holidayFormat))) return true;

    return false;
  };

  dayjsClass.prototype.isBusinessDay = function () {
    const workingWeekdays = option.workingWeekdays ? option.workingWeekdays : [1, 2, 3, 4, 5];

    if (this.isHoliday()) return false;
    if (workingWeekdays.includes(this.day())) return true;

    return false;
  };

  dayjsClass.prototype.businessDaysAdd = function (number) {
    const numericDirection = number < 0 ? -1 : 1;
    let currentDay = this.clone();
    let daysRemaining = Math.abs(number);

    while (daysRemaining > 0) {
      currentDay = currentDay.add(numericDirection, 'd');

      if (currentDay.isBusinessDay()) daysRemaining -= 1;
    }

    return currentDay;
  };

  dayjsClass.prototype.businessDaysSubtract = function (number) {
    let currentDay = this.clone();

    currentDay = currentDay.businessDaysAdd(number * -1);

    return currentDay;
  };

  dayjsClass.prototype.businessDiff = function (input) {
    const day1 = this.clone();
    const day2 = input.clone();

    const isPositiveDiff = day1 >= day2;
    let start = isPositiveDiff ? day2 : day1;
    const end = isPositiveDiff ? day1 : day2;

    let daysBetween = 0;

    if (start.isSame(end)) return daysBetween;

    while (start < end) {
      if (start.isBusinessDay()) daysBetween += 1;

      start = start.add(1, 'd');
    }

    return isPositiveDiff ? daysBetween : -daysBetween;
  };

  dayjsClass.prototype.nextBusinessDay = function () {
    const searchLimit = 7;
    let currentDay = this.clone();

    let loopIndex = 1;
    while (loopIndex < searchLimit) {
      currentDay = currentDay.add(1, 'day');

      if (currentDay.isBusinessDay()) break;
      loopIndex += 1;
    }

    return currentDay;
  };

  dayjsClass.prototype.prevBusinessDay = function () {
    const searchLimit = 7;
    let currentDay = this.clone();

    let loopIndex = 1;
    while (loopIndex < searchLimit) {
      currentDay = currentDay.subtract(1, 'day');

      if (currentDay.isBusinessDay()) break;
      loopIndex += 1;
    }

    return currentDay;
  };

  dayjsClass.prototype.businessDaysInMonth = function () {
    if (!this.isValid()) return [];

    let currentDay = this.clone().startOf('month');
    const monthEnd = this.clone().endOf('month');
    const businessDays = [];
    let monthComplete = false;

    while (!monthComplete) {
      if (currentDay.isBusinessDay()) businessDays.push(currentDay.clone());

      currentDay = currentDay.add(1, 'day');

      if (currentDay.isAfter(monthEnd)) monthComplete = true;
    }

    return businessDays;
  };

  dayjsClass.prototype.businessWeeksInMonth = function () {
    if (!this.isValid()) return [];

    let currentDay = this.clone().startOf('month');
    const monthEnd = this.clone().endOf('month');
    const businessWeeks = [];
    let businessDays = [];
    let monthComplete = false;

    while (!monthComplete) {
      if (currentDay.isBusinessDay()) businessDays.push(currentDay.clone());

      if (currentDay.day() === 5 || currentDay.isSame(monthEnd, 'day')) {
        businessWeeks.push(businessDays);
        businessDays = [];
      }

      currentDay = currentDay.add(1, 'day');

      if (currentDay.isAfter(monthEnd)) monthComplete = true;
    }

    return businessWeeks;
  };
};
