# dayjs-business-days

This is a plugin for Day.js that allows for Date calculations to take place that only consider Business Days i.e Monday to Friday

- Calculate if date is a Business Day
- Add/Subtract Business Days
- Calculate difference between dates in Business Days
- Get Next/Prev Business Day
- Get all Business Days/Weeks in a Month
- Based off of [moment-business-days](https://www.npmjs.com/package/moment-business-days)

## Current CI/CD Status

CI not yet implemented

## Contents

- [dayjs-business-days](#dayjs-business-days)
  - [Current CI/CD Status](#current-cicd-status)
  - [Contents](#contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Usage Guide](#usage-guide)
  - [Local Development](#local-development)
  - [Contributing](#contributing)

## Getting Started

The following guide will help you use the plugin with Day.js, and explain the plugins API.

### Prerequisites

Day.js version 1.8.x installed

### Installing

You can install via Yarn or npm

```bash
yarn add dayjs-business-days
```

```bash
npm install dayjs-business-days
```

## Usage Guide

You will need to import the plugin and activate it via the Day.js `.extend()` function

```javascript
import dayjs from 'dayjs';
import dayjsBusinessDays from 'dayjs-business-days';

dayjs.extend(dayjsBusinessDays);
```

### isBusinessDay() => Boolean

Check if the date is a business day. Returns **true** or **false**

```javascript
// Christmas day is a Friday
dayjs('2020-12-25').isBusinessDay(); // returns true

// Boxing day is a Saturday
dayjs('2020-12-26').isBusinessDay(); // returns false
```

### businessDaysAdd(number) => Day.js Object

- `number` {`Number`} Number of Business Days to be added

Adds the `number` of Business Days to the current date. Returns the new date as a **Day.js object**

```javascript
dayjs('2020-12-25').businessDaysAdd(3).format('DD/MM/YYYY'); // returns 30/12/2020
```

### businessDaysSubtract(number) => Day.js Object

- `number` {`Number`} Number of Business Days to be subtracted

Subtracts the `number` of Business Days from the current date. Returns the new date as a **Day.js object**

```javascript
dayjs('2020-12-30').businessDaysSubtract(3).format('DD/MM/YYYY'); // returns 25/12/2020
```

### businessDiff(date) => Number

- `date` {`Day.js Date`} The date to be diffed from

Calculates the number of business days between a Day.js date and `date`. Returns the difference as a **positive or negative number**.

```javascript
dayjs('2020-12-25').businessDiff(dayjs('2020-12-30')); // returns -5
dayjs('2020-12-30').businessDiff(dayjs('2020-12-25')); // returns 5
```

### nextBusinessDay() => Day.js Object

Calculates the next Business Day. Returns a **Day.js object**

```javascript
// 25th December 2020 is a Friday. Next business day is Monday 28th December.
dayjs('2020-12-25').nextBusinessDay().format('DD/MM/YYYY'); // returns 28/12/2020
```

### prevBusinessDay() => Day.js Object

Calculates the previous Business Day. Returns a **Day.js object**

```javascript
// 28th December 2020 is a Monday. Previous business day is Friday 25th December.
dayjs('2020-12-28').prevBusinessDay().format('DD/MM/YYYY'); // returns 25/12/2020
```

### businessDaysInMonth() => [Day.js Object]

Calculates all of the business days in a given month. Returns an array of **Day.js objects**

```javascript
dayjs('2020-12-25').businessDaysInMonth();
// returns equivalent of [dayjs('2020-12-01'), dayjs('2020-12-02'), ...]
```

### businessWeeksInMonth() => [[Day.js Object]]

Calculates all of the business weeks and days in a given month. Returns an two dimensional array of **Day.js objects**

```javascript
dayjs('2020-12-25').businessWeeksInMonth();
// returns equivalent of
// [
//   [dayjs('2020-12-01'), dayjs('2020-12-02'), ...],
//   [dayjs('2020-12-07'), dayjs('2020-12-08'), ...],
//   ...
// ]
```

## Local Development and Contributing

We are more than happy to accept PRs for bugs, improvements or new features.
Developing your own changes locally is easy, you just need to clone the repo

```bash
git clone git@github.com/soar-tech/dayjs-business-days

cd dayjs-business-days
```

and install the dependencies with either `npm` or `yarn`

```bash
npm i
```

```bash
yarn
```

Tests can be ran with the `test` script

```bash
npm run test
```

```bash
yarn test
```
