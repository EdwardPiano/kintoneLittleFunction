/* eslint-disable no-param-reassign */
import $ from 'jquery'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import '../css/app.css'
import getCalendarData from './getEventsSource'

const createElement = async () => {
  let space = null
  const $portal = $('<div class="main-content">')
  $portal.append(`
      <div class="left-content">
        <div class="left-container">
          <div class="custom-container-header-calender"><h2><b>エド行事曆</b></h2></div>
            <div class="custom-container-body-calender">
              <div id="calendars"></div>
              <div id="events"></div>
          </div>
        </div>
      </div>
  `)
  $portal.append(`
      <div class="right-content">
        <div class="right-container">
          <div class="custom-container-header-mail"><h3>メール</h3></div>
            <div class="custom-container-body-mail">
            <div class="loader-inner ball-grid-pulse"></div>
          </div>
        </div>
      </div>
  `)
  space = kintone.portal.getContentSpaceElement()
  $(space).append($portal)
  const schedule = await getCalendarData()
  console.log('schedule', schedule)
  const calendarEl = document.getElementById('calendars')
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    aspectRatio: 2,
    displayEventTime: false,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listMonth',
    },
    locale: 'zh',
    buttonText: {
      today: '今天',
      month: '月',
      week: '週',
      day: '天',
      list: '清單',
    },
    events: schedule,
    eventMouseEnter(calEvent) {
      // eslint-disable-next-line no-underscore-dangle
      calEvent.el.title = calEvent.event._def.extendedProps.description
    },
  })
  calendar.render()
}

kintone.events.on('portal.show', createElement)
