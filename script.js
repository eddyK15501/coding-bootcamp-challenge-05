// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // get the current hour in 24-hour clock time using day.js
  const hour = dayjs().format('HH');

  // set the color of the time block 
  const setColor = () => {
    $('.time-block').each(function() {
      // grab the id of each time block 
      const timeBlock = this.id;

      // if the id matches the current hour, then set color of the timeblock accordingly
      if (timeBlock === hour) {
        $(this).removeClass('past future').addClass('present');
      } else if (timeBlock > hour) {
        $(this).removeClass('past present').addClass('future');
      } else {
        $(this).removeClass('present future').addClass('past');
      }
    })
  }

  // render the current date and time in the header of the HTML
  const updateHeader = () => {
    const currentDay = $('#currentDay');
    const date = dayjs().format('ddd. MMMM D, YYYY');
    const time = dayjs().format('hh:mm:ss A');

    // update innerText using template literals
    currentDay.text(`${date} | ${time}`);
  }

  // save notes to localStorage, when clicking the save button
  const saveDate = () => {
    $('.btn').on('click', function () {
      // set localStorage key as the id of each time block 
      const key = $(this).parent().attr('id');
      // set localStorage value as the string written in the textarea
      const value = $(this).siblings('textarea').val();

      localStorage.setItem(key, value);
    })
  }

  // get notes that were saved to localStorage, upon initial render
  const getDate = () => {
    $('.time-block').each(function () {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key)

      $(this).children('textarea').val(value)
    })
  }
  
  // setColor and updateHeader every second to update application
  setInterval(setColor, 1000)
  setInterval(updateHeader, 1000)
  saveDate()
  getDate()
});