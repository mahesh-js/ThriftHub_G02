/**
 * Theme: Robotech - Tailwind Admin Dashboard Template
 * Author: Mannatthemes
 * Calendar Js
 */


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialDate: '2023-01-12',
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectMirror: true,
    select: function(arg) {
      var title = prompt('Event Title:');
      if (title) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay
        })
      }
      calendar.unselect()
    },
    eventClick: function(arg) {
      if (confirm('Are you sure you want to delete this event?')) {
        arg.event.remove()
      }
    },
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2023-01-01',
        textColor: 'rgb(0,0,255)',
        backgroundColor:'rgba(0,0,255,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Long Event',
        start: '2023-01-07',
        end: '2023-01-10',
        textColor: 'rgb(255,165,0)',
        backgroundColor:'rgba(255,165,0,0.15)',
        borderColor: 'transparent',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2023-01-09T16:00:00',
        textColor: 'rgb(0,0,255)',
        backgroundColor:'rgba(0,0,255,0.15)',
        borderColor: 'transparent',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2023-01-16T16:00:00',
        textColor: 'rgb(0,0,255)',
        backgroundColor:'rgba(0,0,255,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Conference',
        start: '2023-01-11',
        end: '2023-01-13',
        textColor: 'rgb(60,179,113)',
        backgroundColor:'rgba(60,179,113,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Meeting',
        start: '2023-01-12T10:30:00',
        end: '2023-01-12T12:30:00',
        textColor: 'rgb(255,165,0)',
        backgroundColor:'rgba(255,165,0,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Lunch',
        start: '2023-01-12T12:00:00',
        textColor: 'rgb(0,0,255)',
        backgroundColor:'rgba(0,0,255,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Meeting',
        start: '2023-01-12T14:30:00',
        textColor: 'rgb(60,179,113)',
        backgroundColor:'rgba(60,179,113,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Happy Hour',
        start: '2023-01-12T17:30:00',
        textColor: 'rgb(0,0,255)',
        backgroundColor:'rgba(0,0,255,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Dinner',
        start: '2023-01-12T20:00:00',
        textColor: 'rgb(0,0,255)',
        backgroundColor:'rgba(0,0,255,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Birthday Party',
        start: '2023-01-13T07:00:00',
        textColor: 'rgb(60,179,113)',
        backgroundColor:'rgba(60,179,113,0.15)',
        borderColor: 'transparent',
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2023-01-28',
        textColor: 'rgb(60,179,113)',
        backgroundColor:'rgba(60,179,113,0.15)',
        borderColor: 'transparent',
      }
    ]
  });

  calendar.render();
});


