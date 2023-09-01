import { Template } from "meteor/templating"
import { moment } from "meteor/momentjs:moment"

import "./Export.html"

Template.registerHelper("formatDate", function (date, format) {
  return moment(new Date(date)).format(format)
})
