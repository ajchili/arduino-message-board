#include <LiquidCrystal.h>
#include <math.h>

LiquidCrystal lcd(7, 8, 9, 10, 11, 12);
String message = "";
int lastRefresh = 0;

void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  Serial.begin(9600);
  lcd.begin(16, 2);
}

void loop() {
  if (message.length() > 16) {
    lcd.clear();
    refreshMessage();
    delay(1000);
  } else if (message.length() > 0) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(message);
    delay(1000);
  }
}

void serialEvent() {
  message = Serial.readString();
  digitalWrite(13, HIGH);
  Serial.println("Recieved data: " + message);
}

void refreshMessage() {
  lastRefresh = millis() / 1000;
  lcd.autoscroll();
  lcd.setCursor(16, 0);
  for (int i = 0; i < message.length(); i++) {
    lcd.print(message.charAt(i));
    delay(350);
  }
  lcd.noAutoscroll();
}

