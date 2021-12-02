const config = {
  uuids: {
    primaryService: "",
    characteristic: ""
  }
};

export class BluetoothGaitMonitor {
  constructor(device) {
    this.device = device;
  }
  async connect() {
    this.server = await this.device.gatt.connect();
    this.service = this.server.getPrimaryService(config.uuids.primaryService);
    this.characteristic = this.service.getCharacteristic(config.uuids.characteristic);
    return this.server;
  }
  disconnect() {
    this.device.gatt.disconnect();
  }
  on(evt, handler) {
    this.editListener("addEventListener", evt, handler);
  }
  off(evt, handler) {
    this.editListener("removeEventListener", evt, handler);
  }
  editListener(action, evt, handler) {
    switch (evt) {
      case "newValue": {
        this.characteristic[action]("characteristicvaluechanged", handler);
        break;
      }
      case "disconnect": {
        this.device[action]("gattserverdisconnected", handler);
        break;
      }
    }
  }
}

export async function requestDevice() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{
      services: [config.uuids.primaryService]
    }]
  });
  return device;
}
