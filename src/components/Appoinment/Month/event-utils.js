let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Appoinment 1',
    start: todayStr + 'T09:0:00',
    end: todayStr + 'T10:00:00',
    color:"#7EC8E3" //sky blue
  },
  {
    id: createEventId(),
    title: 'Appoinment 2',
    start: todayStr + 'T09:00:00',
    end: todayStr + 'T10:00:00',
    color:"#FA8128" //light orange
  },
  {
    id: createEventId(),
    title: 'Appoinment 3',
    start: todayStr + 'T10:30:00',
    end: todayStr + 'T11:00:00',
    color:"#FC94AF" //light pink
  },
  {
    id: createEventId(),
    title: 'Appoinment 4',
    start: todayStr + 'T09:45:00',
    end: todayStr + 'T11:00:00',
    color:"#40e0d0" //light green
  },
  {
    id: createEventId(),
    title: 'Appoinment 5',
    start: todayStr + 'T11:00:00',
    end: todayStr + 'T12:00:00',
    color:"#FC94AF" //light pink
  },


  {
    id: createEventId(),
    title: 'Appoinment 6',
    start: todayStr + 'T11:00:00',
    end: todayStr + 'T12:15:00',
    color:"#7EC8E3" //sky blue
  },
  {
    id: createEventId(),
    title: 'Appoinment 7',
    start: todayStr + 'T08:00:00',
    end: todayStr + 'T9:00:00',
    color:"#7EC8E3" //sky blue
  },
  {
    id: createEventId(),
    title: 'Appoinment 8',
    start: todayStr + 'T08:00:00',
    end: todayStr + 'T9:00:00',
    color:"#FA8128" //light orange
  },
  {
    id: createEventId(),
    title: 'Appoinment 9',
    start: todayStr + 'T08:00:00',
    end: todayStr + 'T9:00:00',
    color:"#FC94AF" //light pink
  }
]

export function createEventId() {
  return String(eventGuid++)
}