import { DomoticzVersion } from './../interfaces/DomoticzVersions';
import { Domoticz } from "domoticz-api-linker/src/index.js"
import { defineStore } from "pinia"
import dayjs from "dayjs"
import { DomoticzDatetimes } from "../interfaces/DomoticzDatetimes"
import { DomoticzDevice } from "../interfaces/DomoticzDevice"

export const useDomoticz = defineStore("domoticz", {
  state: () => {
    return {
      api       : null,
      connected : false,
      server    : {
        host       : '',
        port       : '',
        useSSL     : true,
        username   : '',
        password   : '',
        rememberMe : true
      },
      datetime       : "",
      version        : {} as DomoticzVersion,
      datetimes      : {} as DomoticzDatetimes,
      devices        : [] as DomoticzDevice[],
      syncingDevices : false,
      handlers       : {
        datetime : {} as ReturnType<typeof setTimeout>,
        devices  : {} as ReturnType<typeof setTimeout>,
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
        port     : this.server.port,
        useSSL   : this.server.useSSL,
        username : this.server.username,
        password : this.server.password
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
      this.version = <DomoticzVersion> await this.api.systemManager.version();
    },

    async syncDatetimes() {
      this.datetimes = <DomoticzDatetimes> await this.api.systemManager.datetimes();
      this.datetime = this.datetimes.ServerTime;

      if (this.handlers.datetime != null) {
        clearInterval(this.handlers.datetime);
      }

      this.handlers.datetime = setInterval(() => {
        this.datetime = dayjs(this.datetime).add(1, "seconds").format('YYYY-MM-DD HH:mm:ss')
      }, 1000);
    },

    async syncDevices() {
      if (this.syncingDevices) return;

      this.syncingDevices = true;
      if (this.handlers.devices) clearTimeout(this.handlers.devices)
      this.devices = <DomoticzDevice[]> (await this.api.deviceManager.items()).result;

      this.handlers.devices = setTimeout(this.syncDevices, 2000);
      this.syncingDevices = false;
    },

    async toggleDevice(idx: string) {
      await this.api.deviceManager.toggle(idx);
      this.syncDevices();
    },

    findDevice(idx: string) {
      return this.devices.find( (device) => device.idx == idx);
    },

    // ------------------------------------------------------------------------

    async settingsSave() {
      localStorage.setItem('server', JSON.stringify(this.server))
    },

    async settingsLoad() {
      const serializedData = localStorage.getItem('server')
      if (serializedData) this.server = JSON.parse(serializedData);
    }
  },
});
