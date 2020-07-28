## 사회적 약자를 위한 독서기

:star: Welcome!

몸이 불편하긴 분들을 위해 음성만으로 동작이 가능한 독서기

### Table of content

- Installation
- Setup
- Simulation

### 사운드 센서 제어하기

- python 설치
- 하드웨어 설계
- 코드
- import RPi.GPIO as GPIO
  from time import sleep
  GPIO.setmode(GPIO.BOARD)
  soundpin = 7
  GPIO.setup(soundppin, GPIO.IN)

  while(True):
  soundlevel = GPIO.input(soundpin)
  print("soundlevel", soundlevel)
  sleep(1)
