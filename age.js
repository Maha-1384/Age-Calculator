// Array with days in each month (normal year)
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var Woptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Function to update months array based on leap year
function updateMonthsArray(year) {
  if (isLeapYear(year)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}

// Function to calculate exact age in years, months, and days
function ageCalculate() {
  var birthInputDate = new Date(document.getElementById('birth-date-input').value );
  var currentInputDate = new Date(document.getElementById('current-date-input').value);

  var birthDetails = {
    date: birthInputDate.getDate(),
    month: birthInputDate.getMonth() + 1,
    year: birthInputDate.getFullYear(),
  };

  var currentDetails = {
    date: currentInputDate.getDate(),
    month: currentInputDate.getMonth() + 1,
    year: currentInputDate.getFullYear(),
  };

  // Check if birth date is in future
  //   if (
  //     birthDetails.year > currentDetails.year ||
  //     (birthDetails.year === currentDetails.year &&
  //       birthDetails.month > currentDetails.month) ||
  //     (birthDetails.year === currentDetails.year &&
  //       birthDetails.month === currentDetails.month &&
  //       birthDetails.date > currentDetails.date)
  //   ) {
  //     document.getElementById(
  //       'agecalculated'
  //     ).innerHTML = `Date of birth cannot be in the future`;
  //     return;
  //   }

  // Calculate years
  var calculatedYear = currentDetails.year - birthDetails.year;

  // Calculate months
  var calculatedMonth;
  if (currentDetails.month >= birthDetails.month) {
    calculatedMonth = currentDetails.month - birthDetails.month;
  } else {
    calculatedYear--;
    calculatedMonth = 12 + currentDetails.month - birthDetails.month;
  }

  // Calculate days
  var calculatedDate;
  // Update months array for leap year if needed
  updateMonthsArray(currentDetails.year);

  if (currentDetails.date >= birthDetails.date) {
    calculatedDate = currentDetails.date - birthDetails.date;
  } else {
    calculatedMonth--;
    // Need to get days from previous month
    let prevMonth = currentDetails.month - 1;
    if (prevMonth === 0) {
      prevMonth = 12;
      updateMonthsArray(currentDetails.year - 1);
    }
    calculatedDate = months[prevMonth - 1] + currentDetails.date - birthDetails.date;

    if (calculatedMonth < 0) {
      calculatedMonth = 11;
      calculatedYear--;
    }
  }

    document.getElementById('agecalculated').innerHTML =
        `<b>≈</b> <b>${calculatedYear}</b> years, <b>${calculatedMonth}</b> months, <b>${calculatedDate}</b> days`;
}

// Function to calculate time units
function timeCalculate() {
  var birthInputDate = new Date( document.getElementById('birth-date-input').value );
  var currentInputDate = new Date( document.getElementById('current-date-input').value );

  var DOB_withDay = birthInputDate.toLocaleDateString('en-US', Woptions);
  var currentDate_withDay = currentInputDate.toLocaleDateString('en-US', Woptions );

  document.getElementById('BornDate').innerHTML = '<b>Born on : </b>' + DOB_withDay;
  document.getElementById('NowDate').innerHTML = '<b>Age on : </b>' + currentDate_withDay;

  var miliSeconds_Btw_DOB = birthInputDate.getTime();
  var age_in_MiliSeconds = currentInputDate.getTime() - miliSeconds_Btw_DOB;

  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30.4375; // Average month length
  var year = day * 365.25; // Account for leap years

  var years = Math.floor(age_in_MiliSeconds / year);
  var months = Math.floor(age_in_MiliSeconds / month);
  var weeks = Math.floor(age_in_MiliSeconds / week);
  var days = Math.floor(age_in_MiliSeconds / day);
  var hours = Math.floor(age_in_MiliSeconds / hour);
  var minutes = Math.floor(age_in_MiliSeconds / minute);
  var seconds = Math.floor(age_in_MiliSeconds / second);

  document.getElementById('Xyears').innerHTML = `<b>Age: ${years}</b> years`;
    document.getElementById('timecalculated').innerHTML =
        `<hr>Exact age in different time units: <br>
        <b>≈ ${years}</b> yrs<br>
        <b>≈ ${months}</b> months<br>
        <b>≈ ${weeks}</b> weeks<br>
        <b>≈ ${days}</b> days<br>
        <b>≈ ${minutes}</b> mins<br>
        <b>≈ ${hours}</b> hrs<br>
        <b>≈ ${seconds}</b> secs`;
}

// FUNCTION FOR DAYS LEFT
function displayDaysToNextBirthday() {
  var birthInputDate = new Date(   document.getElementById('birth-date-input').value  );
  const today = new Date();
  const currentYear = today.getFullYear();

  let nextBirthday = new Date(currentYear,  birthInputDate.getMonth(), birthInputDate.getDate()  );

  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const timeDifference = nextBirthday.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const nextBirthdayD = nextBirthday.toLocaleDateString('en-US', Woptions);
    document.getElementById('nxtBday').innerHTML =
        `<br><b> ≈ <i>${daysLeft} DAYS TILL NEXT BIRTHDAY </b> <span id="icons-colored">🎈🎁🎊🧧</span> <br> ${nextBirthdayD}</i>`;
}

// Initialize with current date
window.onload = function () {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  document.getElementById('current-date-input').value = formattedDate;
};

function calculateAge() {
  var birthInputDate = new Date(
    document.getElementById('birth-date-input').value
  );
  var currentInputDate = new Date(
    document.getElementById('current-date-input').value
  );
  const today = new Date();
  if (
    !birthInputDate ||
    isNaN(birthInputDate.getTime()) ||
    !currentInputDate ||
    isNaN(currentInputDate.getTime())
  ) {
    alert('ENTER YOUR DATE CORRECTLY');
  } else if (birthInputDate > today) {
    alert("BIRTHDAY CAN'T BE IN THE FUTURE");
  } else {
    ageCalculate();
    timeCalculate();
    displayDaysToNextBirthday();
  }
}
