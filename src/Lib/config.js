import Store from "electron-store"

const schema = {
  port: {
    type: "number",
    default: 9090,
  },
  commandHistory: {
    type: "number",
    default: 500,
  },
}

const configStore = new Store({ schema })

// Setup defaults
if (!configStore.has("port")) {
  configStore.set("port", 9090)
}
if (!configStore.has("commandHistory")) {
  configStore.set("commandHistory", 500)
}

export default configStore
