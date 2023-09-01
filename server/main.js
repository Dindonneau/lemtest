import { Meteor } from "meteor/meteor"
import {
  MongoStateExportsCollection,
  ComponentStateExportsCollection
} from "../imports/api/ExportsCollection"

Meteor.startup(() => {
  // if (ExportsCollection.find().count() === 0) {
  //   ;[
  //     "Export 1",
  //     "Export 2",
  //     "Export 3",
  //     "Export 4",
  //     "Export 5",
  //     "Export 6"
  //   ].forEach(insertExport)
  // }
})
