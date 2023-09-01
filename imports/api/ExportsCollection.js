import { Mongo } from "meteor/mongo"

export const MongoStateExportsCollection = new Mongo.Collection(
  "mongoStateExports"
)

export const ComponentStateExportsCollection = new Mongo.Collection(
  "componentStateExports"
)
