import DataStore from 'nedb'

export function makeCreateFunction<T>(store: DataStore<T>) {
  return (doc: T): Promise<[Error, T]> => {
    return new Promise((resolve) => {
      store.insert<T>(doc, (err, doc) => {
        resolve([err, doc])
      })
    })
  }
}

export function makeFindFunction<T>(store: DataStore<T>) {
  return (
    query: {
      [K in keyof T]?: T[K]
    }
  ): Promise<[Error, T[]]> => {
    return new Promise((resolve) => {
      store.find(query, (err, docs) => {
        resolve([err, docs])
      })
    })
  }
}

export function makeUpdateFunction<T>(store: DataStore<T>) {
  return (
    query: {
      [K in keyof T]?: T[K]
    },
    update: Partial<T>
  ): Promise<[Error, number]> => {
    return new Promise((resolve) => {
      store.update(query, update, {}, (err, numAffected) => {
        resolve([err, numAffected])
      })
    })
  }
}

export function makeRemoveFunction<T>(store: DataStore<T>) {
  return (
    query: {
      [K in keyof T]?: T[K]
    }
  ): Promise<[Error, number]> => {
    return new Promise((resolve) => {
      store.remove(query, {}, (err, numRemoved) => {
        resolve([err, numRemoved])
      })
    })
  }
}
