#include <Arduino.h>
/*
    BMES GAIT MONITOR

   Create a BLE server that, once we receive a connection, will send periodic notifications.
   The service advertises itself as: 4fafc201-1fb5-459e-8fcc-c5c9c331914b
   And has a characteristic of: beb5483e-36e1-4688-b7f5-ea07361b26a8

   The design of creating the BLE server is:
   1. Create a BLE Server
   2. Create a BLE Service
   3. Create a BLE Characteristic on the Service
   4. Create a BLE Descriptor on the characteristic
   5. Start the service.
   6. Start advertising.

   A connect hander associated with the server starts a background task that performs notification
   every couple of seconds.
*/
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <Wire.h>

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint32_t value = 0;

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"


class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

// i2c accelerometer vars

int gyro_x, gyro_y, gyro_z;
long gyro_x_cal, gyro_y_cal, gyro_z_cal;
boolean set_gyro_angles;
long acc_x, acc_y, acc_z, acc_total_vector;
float angle_roll_acc, angle_pitch_acc;
float angle_pitch, angle_roll;
int angle_pitch_buffer, angle_roll_buffer;
float angle_pitch_output, angle_roll_output;
long loop_timer;
int temp;
boolean once = true;

char buffer[36] = "";
void setup_MPU6050_registers();
void read_MPU6050_data();

void setup() {
  Serial.begin(115200);

  // Setup Accelerometer
  Serial.println("Setting up Accelerometers");
  Wire.begin();
  setup_MPU6050_registers();
  Serial.println("1");
  for (int cal_int = 0; cal_int < 1000; cal_int++) {
    Serial.println("geez");
    read_MPU6050_data();
    Serial.println("read");
    gyro_x_cal += gyro_x;
    gyro_y_cal += gyro_y;
    gyro_z_cal += gyro_z;
    delay(3);
  }
  gyro_x_cal /= 1000;
  gyro_y_cal /= 1000;
  gyro_z_cal /= 1000;
  Serial.println("2");
  loop_timer = micros();


  Serial.println("Setting up BLE");

  // Create the BLE Device
  BLEDevice::init("BMES Left Gait Monitor");

  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );

  // https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.descriptor.gatt.client_characteristic_configuration.xml
  // Create a BLE Descriptor
  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(false);
  pAdvertising->setMinPreferred(0x0);  // set value to 0x00 to not advertise this parameter
  BLEDevice::startAdvertising();
  Serial.println("Waiting a client connection to notify...");
}

void loop() {
    // notify changed value

    //int accel1Vals[6] = {gyro_x, gyro_y, gyro_z, acc_x, acc_y, acc_z};

    sprintf(buffer, "%05d,%05d,%05d,%05d,%05d,%05d", gyro_x, gyro_y, gyro_z, acc_x, acc_y, acc_z);
    Serial.println(buffer);

    if (deviceConnected) {
        pCharacteristic->setValue(buffer);
        pCharacteristic->notify();
        value++;
        Serial.println(value);
        delay(30); // bluetooth stack will go into congestion, if too many packets are sent, in 6 hours test i was able to go as low as 3ms
    }
    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500); // give the bluetooth stack the chance to get things ready
        pServer->startAdvertising(); // restart advertising
        Serial.println("start advertising");
        oldDeviceConnected = deviceConnected;
    }
    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        // do stuff here on connecting
        oldDeviceConnected = deviceConnected;
    }
  read_MPU6050_data();
  gyro_x_cal -= gyro_x;
  gyro_y_cal -= gyro_y;
  gyro_z_cal -= gyro_z;
  angle_pitch += gyro_x * 0.0000611;
  angle_roll += gyro_y * 0.0000611;
  angle_pitch += angle_roll * sin(gyro_z * 0.000001066);
  angle_roll -= angle_pitch * sin(gyro_z * 0.000001066);
  acc_total_vector = sqrt((acc_x*acc_x)+(acc_y*acc_y)+(acc_z*acc_z));
  angle_pitch_acc = asin((float)acc_y/acc_total_vector) * 57.296;
  angle_roll_acc = asin((float)acc_x/acc_total_vector) * -57.296;
  angle_pitch_acc -= 0.0;
  angle_roll_acc -= 0.0;
  if (set_gyro_angles) {
    angle_pitch = angle_pitch * 0.9996 + angle_pitch_acc * 0.0004;
    angle_roll = angle_roll * 0.9996 + angle_roll_acc * 0.0004;
  } else {
    angle_pitch = angle_pitch_acc;
    angle_roll = angle_roll_acc;
    set_gyro_angles = true;
  }
  //Serial.print(" ");
  //Serial.println(acc_total_vector);
  while(micros() - loop_timer < 4000);
  loop_timer = micros();
}

void setup_MPU6050_registers() {
  Wire.beginTransmission(byte(0x68));
  Wire.write(byte(0x6B));
  Wire.write(byte(0x00));
  Wire.endTransmission(true);

  Wire.beginTransmission(byte(0x68));
  Wire.write(byte(0x1C));
  Wire.write(byte(0x10));
  Wire.endTransmission(true);

  Wire.beginTransmission(byte(0x68));
  Wire.write(byte(0x1B));
  Wire.write(byte(0x08));
  Wire.endTransmission(true);

}

void read_MPU6050_data() {
  Wire.beginTransmission(byte(0x68));
  Wire.write(byte(0x3B));
  Wire.endTransmission(false);
  Wire.requestFrom(byte(0x68), 14);
  if (once) {
    Serial.println(Wire.available());
    once = false;
  }
  while (Wire.available() < 14);
  acc_x = Wire.read()<<8|Wire.read();
  acc_y = Wire.read()<<8|Wire.read();
  acc_z = Wire.read()<<8|Wire.read();
  temp = Wire.read()<<8|Wire.read();
  gyro_x = Wire.read()<<8|Wire.read();
  gyro_y = Wire.read()<<8|Wire.read();
  gyro_z = Wire.read()<<8|Wire.read();
}
