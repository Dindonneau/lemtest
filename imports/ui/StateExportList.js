import { Template } from "meteor/templating"
import { ComponentStateExportsCollection } from "../api/ExportsCollection"
import { ReactiveVar } from "meteor/reactive-var"

import { getRandomItem } from "../../utils/random"
import { objectPick } from "../../utils/object"

import "./StateExportList.html"
import "./Export.js"

Template.stateExportList.onCreated(function () {
  this.currentExports = new ReactiveVar([])
})

Template.stateExportList.helpers({
  exports() {
    return ComponentStateExportsCollection.find()
  },
  currentExports() {
    return Template.instance().currentExports.get()
  }
})

Template.stateExportList.events({
  "click .state-export-button"() {
    const template = Template.instance()
    const currentExports = template.currentExports.get()

    const newExport = {
      tag: new Date().getTime(),
      progress: 0,
      url: null,
      intervalId: null
    }

    template.currentExports.set([...currentExports, newExport])

    newExport.intervalId = setInterval(() => {
      const updatedExports = [...template.currentExports.get()]
      const currentExport = updatedExports.find(e => e.tag === newExport.tag)

      if (currentExport?.progress < 100) {
        currentExport.progress += 5
        template.currentExports.set(updatedExports)

        if (currentExport.progress === 100) {
          currentExport.url = getRandomUrl()
          clearInterval(newExport.intervalId)
          template.currentExports.set(updatedExports)

          // Remove completed export from the list
          const remainingExports = updatedExports.filter(e => e.progress < 100)
          template.currentExports.set(remainingExports)

          // Insert the completed export into MongoDB
          ComponentStateExportsCollection.insert({
            ...objectPick(currentExport, ["tag", "url"]),
            createdAt: new Date()
          })
        }
      }
    }, 1000)
  }
})

function getRandomUrl() {
  const urls = [
    "https://www.lempire.com/",
    "https://www.lemlist.com/",
    "https://www.lemverse.com/",
    "https://www.lemstash.com/"
  ]
  return getRandomItem(urls)
}
