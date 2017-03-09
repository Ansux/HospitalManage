import moment from 'moment'

export const parseTime = (time, formatString) => {
  return moment(time).format(formatString)
}
