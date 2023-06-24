// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  const hour = dayjs().format('HH');

  const setColor = () => {
    $('.time-block').each(function() {
      const timeBlock = this.id;

      if (timeBlock === hour) {
        $(this).removeClass('past future').addClass('present');
      } else if (timeBlock > hour) {
        $(this).removeClass('past present').addClass('future');
      } else {
        $(this).removeClass('present future').addClass('past');
      }
    })
  }

  const updateHeader = () => {
    const currentDay = $('#currentDay');
    const date = dayjs().format('ddd. MMMM D, YYYY');
    const time = dayjs().format('hh:mm:ss A');

    currentDay.text(`${date} | ${time}`);
  }

  const saveDate = () => {
    $('.btn').on('click', function () {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('textarea').val();

      localStorage.setItem(key, value);
    })
  }

  const getDate = () => {
    $('.time-block').each(function () {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key)

      $(this).children('textarea').val(value)
    })
  }



  setInterval(setColor, 1000)
  setInterval(updateHeader, 1000)
  saveDate()
  getDate()
});