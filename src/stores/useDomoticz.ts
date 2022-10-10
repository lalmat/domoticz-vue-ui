import { Domoticz } from "domoticz-api-linker/src/index.js"
import { cookiesStorage } from "@ncisrc/cookies-storage"
import { defineStore } from "pinia"
import dayjs from "dayjs"

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
      datetime: new Date,
      version: null,
      datetimes : null,
      handlers: {
        version: null,
        datetime: null
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

    // ------------------------------------------------------------------------

    async syncVersion() {
      this.version = await this.api.systemManager.version();
    },

    async syncDatetimes() {
      this.datetimes = await this.api.systemManager.datetimes();
      this.datetime = this.datetimes.ServerTime;

      if (this.handlers.datetime != null) {
        clearInterval(this.handlers.datetime);
      }

      this.handlers.datetime = setInterval(() => {
        this.datetime = dayjs(this.datetime).add(1, "seconds").format('YYYY-MM-DD HH:mm:ss')
      }, 1000);

    },

    // ------------------------------------------------------------------------

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
