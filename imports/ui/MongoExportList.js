import { Template } from "meteor/templating"
import { MongoStateExportsCollection } from "../api/ExportsCollection"

import { getRandomItem } from "../../utils/random"

import "./MongoExportList.html"
import "./Export.js"

Template.mongoExportList.helpers({
  exports() {
    return MongoStateExportsCollection.find()
  }
})

Template.mongoExportList.events({
  "click .mongo-export-button"() {
    const newExport = {
      progress: 0,
      url: null
    }

    newExport._id = MongoStateExportsCollection.insert(newExport)

    const interval = setInterval(() => {
      if (newExport.progress < 100) {
        newExport.progress += 5
        MongoStateExportsCollection.update(newExport._id, {
          $set: { progress: newExport.progress }
        })

        if (newExport.progress === 100) {
          MongoStateExportsCollection.update(newExport._id, {
            $set: {
              url: getRandomUrl(),
              createdAt: new Date()
            }
          })
          clearInterval(interval)
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
