import { Domoticz } from "domoticz-api-linker/src/index.js"
import { cookiesStorage } from "@ncisrc/cookies-storage"
import { defineStore } from "pinia"

export const useDomoticz = defineStore("domoticz", {
  state: () => {
    return {
      api: {},
      connected: false,
      server: {
        host: '',
        port: '',
        useSSL: true,
        username: '',
        password: '',
        rememberMe: true
      },
      version: null,
      datetimes : null,
      handlers: {
        version: null,
        datetimes: null
      }
    }
  },

  getters: {
    dayDuration() {
      if (!this.datetimes) return 'N/A'
      return 'todo'
    }
  },

  actions: {
    async reconnect() {
      await this.settingsLoad();
      return await this.connect();
    },

    async connect() {
      this.api = await Domoticz(this.server.host, {
        port: this.server.port,
        useSSL: this.server.useSSL,
        username: this.server.username,
        password: this.server.password
      });
      const success = await this.api.systemManager.checkCredentials();
      if (success) {
        this.connected = true;
        if (this.server.rememberMe) this.settingsSave();
      }
      return success
    },

    async refreshVersion() {
      if (this.handlers.version == null) {
        this.handlers.version = setInterval(this.api.refreshVersion, 3600000)
      }
      this.version = await this.api.systemManager.version();
    },

    async refreshDatetimes() {
      if (this.handlers.datetimes == null) {
        this.handlers.datetimes = setInterval(this.api.refreshDatetimes, 5000)
      }
      this.datetimes = await this.api.systemManager.datetimes();
    },

    async settingsSave() {
      const options = {
        maxAge: 7776000
      }
      return await cookiesStorage.setItem("server", JSON.stringify(this.server), options); // 3 Months
    },

    async settingsLoad() {
      const serializedData = await cookiesStorage.getItem("server");
      if (serializedData) this.server = JSON.parse(serializedData);
    }
  },
});
