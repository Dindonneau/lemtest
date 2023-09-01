export const objectPick = (originalObject, keysToKeep) =>
  Object.entries(originalObject).reduce(
    (acc, [key, value]) =>
      keysToKeep.includes(key) ? { ...acc, [key]: value } : acc,
    {}
  )
