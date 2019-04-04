import Sugar from 'sugar-date'

/*
  This hack is overriding javascript Date object
  to send an iso8601 format that includes the timezone

  This is because broadworks does not support timezones
  so we need to know what the local time is

  Including the timezone too, in case we get a chance to use it
*/

Date.prototype.toJSON = function() {
  return Sugar.Date.format(this, 'ISO8601')
}
