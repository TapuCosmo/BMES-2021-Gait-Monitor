const config = {
  uuids: {
    primaryService: "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
    characteristic: "beb5483e-36e1-4688-b7f5-ea07361b26a8"
  }
};

export class BluetoothGaitMonitor {
  constructor(device) {
    this.device = device;
  }
  async connect() {
    this.server = await this.device.gatt.connect();
    this.service = await this.server.getPrimaryService(config.uuids.primaryService);
    this.characteristic = await this.service.getCharacteristic(config.uuids.characteristic);
    await this.characteristic.startNotifications();
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
