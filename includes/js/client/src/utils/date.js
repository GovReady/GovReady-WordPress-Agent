import config from 'config';

// date in form: 2016-06-06T07:00:00.000Z
export function isoToDate(date: string) {
  return window.moment(date).format(config.dateFormat);
}

// date in form June 6th 2016
export function dateToIso(date: string) {
  let moment = window.moment(date, config.dateFormat);
  if(moment.isValid()) {
    return moment.toISOString();
  }
  else {
    return window.moment().toISOString();
  }
  return null;
}

// date in form June 6th 2016
export function dateToMoment(date: string) {
  let moment = window.moment(date, config.dateFormat);
  if(moment.isValid()) {
    return moment;
  }
  else {
    return window.moment();
  }
  return null;
}

export function isoSort(collection, field = 'datetime') {
  return collection.sort((a, b) => {
    return (a[field] < b[field]) ? -1 : ((a[field] > b[field]) ? 1 : 0);
  })
}