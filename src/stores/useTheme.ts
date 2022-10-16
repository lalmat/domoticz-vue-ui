import { themeDevice } from './../interfaces/ThemeDevice';
import { defineStore } from "pinia"

export const useTheme = defineStore("theme", {
  state: () => {
    return {
      classes: {
        bgPanel     : {},
        devicesGrid : {},
        version     : {}
      },

      loaded           : false,
      name             : '',
      bgPanelClass     : '',
      devicesGridClass : '',
      devices          : <themeDevice[]>[]
    }
  },

  getters: {
    slots(): themeDevice[] {
      return this.devices.sort((device1: themeDevice, device2: themeDevice) => {
        if (device1.slot > device2.slot) return 1;
        if (device1.slot < device2.slot) return -1;
        return 0;
      })
    }
  },

  actions: {
    async load(url: string) {
      this.loaded = false

      const response = await fetch(url)
      const data = await response.json()

      this.name    = <string>data.name
      this.classes.bgPanel     = this.stringToClass(data.classes.bgPanel)
      this.classes.devicesGrid = this.stringToClass(data.classes.devicesGrid)
      this.classes.version     = this.stringToClass(data.classes.version)
      this.devices = <themeDevice[]> data.devices

      this.loaded = true
    },

    stringToClass(str: string) {
      const items = str.split(' ');
      const result = {}
      for(const key of items) {
        console.log(key);
        result[key] = true;
      }
      console.log(result);
      return result;
    }
  }
});
