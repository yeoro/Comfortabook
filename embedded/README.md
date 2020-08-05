임베디드 관련 이슈

7월 4째주 목표

- 웹 서버 연결 후 pdf 다운 받아 저장
- 음성 제어 시스템 & 아두이노와의 연결

---

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

---

### 사운드로 LED Turn on, off하기

- 특성 등록

- 명령 처리

```python

    googlesamples-assistant-pushtotalk => 샘플 실행으로서 제대로 음성을 받는지 확인
    git clone https://github.com/googlesamples/assistant-sdk-python => 소스 코드를 받는다
    cd assistant-sdk-python/google-assistant-sdk/googlesamples/assistant/grpc
    nano pushtotalk.py => turn on, off 파일을 파이썬으로 생성

    https://developers.google.com/assistant/sdk/guides/service/python/extend/handle-device-commands => 홈페이지 참조.
```

---

#### Tensorflow

tensorflow를 시작하려한다.

\- 머신러닝과 딥러닝을 도와주는 라이브러리

\- 머신러닝과 딥러닝을 도와주는 API

일단 TensorFlow 홈페이지에 들어가서, 나는 라즈베리파이 위에 올릴 Tensorflow 가 필요했는데, Iot 위에 올리는 TensorFlow Lite 가이드가 있어서 눌렀다. 여기서는 여러분의 시간은 중요하기 때문에 중요 개념만 넣어보았다.

https://www.tensorflow.org/lite/guide?hl=ko



TensorFlow Lite 가이드

TensorFlow Lite는 개발자가 휴대기기, 내장형 기기 및 IoT 기기에서 TensorFlow 모델을 실행할 수 있도록 지원하는 도구 모음입니다. 기기 내 지연 시간이 짧고 바이너리 크기가 작은 머신러닝 추론을 ��

[www.tensorflow.org

TensorFlow Lite는 2가지로 구성된다.



### TensorFlow Lite inference

inference(유추)라는 용어의 의미는 input 데이터를 예측하기 위한 절차이다. inference를 수행하려면 반드시 interpreter를 통해 작동해야한다. 



##### Important concepts

TensorFlow LIte inference는 다음 스텝을 따른다.

1. Loading a model

   수행 그래프를 포함한 `.tflite` 모델을 메모리로 로드해야한다.

2. Transforming data

   가공되지 않는 input 데이터와 모델에서 기대하는 input 데이터는 다르다. 예를 들면, 이미지를 모델과 호환시키려면 반드시 이미지의 크기를 바꾸던가 이미지 포맷을 해야한다.

3. Running inference

   이 단계에서는 TensorFlow Lite API를 사용하여 모델을 실행한다. 다음 단계에서 설명 하는 것과 같이 tensor를 할달하고 interpreter를 만드는 것들도 포함한다.

4. Interpreting output

   model inference로 부터 결과를 받을 때, 응용프로그램에 유용하고 의미있는 방식으로 tensor를 해석해야한다.



##### 지원 platforms

TensorFlow inference APIs는 대부분의 일반적인 mobile과 embedded platforms에서 사용된다. 예를 들면 안드로이드, IOS, Linux 같은 다양한 프로그램 언어에서 사용가능하다.



### TensorFlow Lite converter

TensorFlow Lite converter(변환기)는 TensorFlow 모델을 사용하여 TensorFlow Lite `FlatBuffer`(`.tflite`) 파일을 생성한다. The converter supports [SavedModel directories](https://www.tensorflow.org/guide/saved_model), [`tf.keras` models](https://www.tensorflow.org/guide/keras/overview), and [concrete functions](https://tensorflow.org/guide/concrete_function).

- FlatBuffer는 C ++, C #, C, Go, Java, Kotlin, JavaScript, Lobster, Lua, TypeScript, PHP, Python, Rust 및 Swift를위한 효율적인 크로스 플랫폼 직렬화 라이브러리(작은 크기와 이식성에 최적화)

쉽게 말하면 여기서 일반 TensorFlow파일을 변환해서 가볍게 만든다고 생각하면 된다.





**이미지를 분류하는 신경망 모델**에 대해 알아보자. 쭉 읽어보면된다. 

기본이미지 분류하는 코드가 아래라고 한다.

```
from __future__ import absolute_import, division, print_function, unicode_literals, unicode_literals

# tensorflow와 tf.keras를 임포트합니다
import tensorflow as tf
from tensorflow import keras

# 헬퍼(helper) 라이브러리를 임포트합니다
import numpy as np
import matplotlib.pyplot as plt

print(tf.__version__)


fashion_mnist = keras.datasets.fashion_mnist

(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()


class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']
```

### 코드 해석

위 코드를 하나씩 보자,  
**from future import absolute\_import, division, print\_function, unicode\_literals, unicode\_literals**

이부분은 사실 아직 멀 가져 오는지 모르겠다.

**import tensorflow as tf**

tensorflow를 불러오고 지금부터는 tensorflow를 tf라고 쓰겠다.  
**from tensorflow import keras**

keras는 tensorflow를 쉽게 쓰려고 만든 것이라고 생각하자. (텐서플로 모델을 만들고 훈련할 수 있는 고수준 API인 tf.keras를 사용한다.)


**import numpy as np**  

이건 파이썬 함수!

**import matplotlib.pyplot as plt**

Matplotlib은 파이썬에서 data를 차트나 Plot으로 그려주는 라이브러리 패키지로 가장 많이 사용되는 Data Visualization(데이타 시각화) 패키지 이다. 사용법은 위와 같이 matplotlib.pyplot를 import하면된다.

ex)

```
from matplotlib import pyplit as plt
plt.plot([1, 2, 4], [10, 11, 9])
plt.show()
```

위와 같이 하면 (1, 10), (2, 11), (4, 9)를 꼭지점으로 하나씩 직선으로 연결된 그래프가 나온다

**print(tf.version)**

tensorflow의 버전을 확인할 수 있다.

**fashion\_mnist = keras.datasets.fashion\_mnist**

keras안의 datasets 안의 fashion\_mnist를 fashion\_mnist라는 변수에 담았군

**(train\_images, train\_labels), (test\_images, test\_labels) = fashion\_mnist.load\_data()**

load\_data() 함수를 호출하면 네 개의 NumPy 배열이 반환된다고 한다. 이때 앞의 train\_image랑 train\_labels배열은 모델학습에 사용되는 **훈련 세트**라고 한다. 뒤의 test\_images와 test\_labels는 테스트에 사용되는 **테스트**라고 한다. 먼말인지 모르겠지만 일단 쭉쭉 읽어보자. 여기서 나오는 4가지에 대해서는 밑의 데이터 탐색에서 알아보자.

**class\_names = \['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',**  
**'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot'\]**

기본적으로 우리가 분석할 이미지는 28x28 크기의 넘파이 배열이고 픽셀 값은 0과 255 사이이다. label은 0에서 9까지의 정수 배열이다. label 0은 T-shirt/top, 1은 Trouser... 이런식으로 인덱스에 따른 옷의 클래스가 정해져있다. 각 이미지는 위의 label중 하나에 mapping 되어있다. 그런데 데이터 자체에 숫자만 들어가있고 클래스 이름은 들어가 있지 않기 때문에 별도의 리스트로 만들어 class\_names라는 변수에 저장한거다. 나중에 이미지 출력 시 숫자가 아닌 class\_names\[1\]이라고 하면 문자로 출력 가능하다.

### 데이터 탐색(**train\_images, train\_labels, test\_images, test\_labels**)

모델을 훈련하기 전에 load\_data 함수에나 나온 4가지 NumPy 배열에 대해 알아보자. 

\> train\_images.shape

< (6000, 28, 28)

훈련 세트가 60,000개가 있고 각 이미지는 28x28이라는 것을 알 수 있다.

\> len(train\_labels)

< 60000

훈련 set에는 60,000개의 label이 있다.

\> train\_labels

< arr(\[9, 0, 0, ..., 3, 0, 5\], dtype=uint8)

배열안에 0과 9사이의 label이 있군.

\> test\_images.shape

< (10000, 28, 28)

10000개의 이미지와 28x28 픽셀로 표현된다.

\> len(test\_labels)

< 10000





```
## Tensorflow

#### 2.0 호환성

tf.Session API 삭제-Session 부분은 사라졌다. => @tf.function annotation

​```
# TensorFlow 1.X
outputs = session.run(f(placeholder), feed_dict={placeholder: input})
# TensorFlow 2.0
outputs = f(input)
​```



tf.placeholder API 삭제 =>@tf.function annotation



ex) 버전1과 2를 비교해보자.

1.x tensorflow

​```python
in_a = tf.placeholder(dtype=tf.float32, shape=(2))
in_b = tf.placeholder(dtype=tf.float32, shape=(2))

def forward(x):
  with tf.variable_scope("matmul", reuse=tf.AUTO_REUSE):
    W = tf.get_variable("W", initializer=tf.ones(shape=(2,2)),
                        regularizer=tf.contrib.layers.l2_regularizer(0.04))
    b = tf.get_variable("b", initializer=tf.zeros(shape=(2)))
    return W * x + b

out_a = forward(in_a)
out_b = forward(in_b)

reg_loss = tf.losses.get_regularization_loss(scope="matmul")

with tf.Session() as sess:
  sess.run(tf.global_variables_initializer())
  outs = sess.run([out_a, out_b, reg_loss],
                feed_dict={in_a: [1, 0], in_b: [0, 1]})
​```



2.x Tensorflow

​```python
W = tf.Variable(tf.ones(shape=(2,2)), name="W")
b = tf.Variable(tf.zeros(shape=(2)), name="b")

@tf.function
def forward(x):
  return W * x + b

out_a = forward([1,0])
print(out_a)
​```



그렇다면 기존의 v1은 v2에서 사용 못하나? 그렇지는 않다. v1-> v2로 **마이그레이션** 가이드를 공개했다.

​```python
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
​```

v1 형태의 코드를 v2 형태의 코드로 변경하고자 할 때는 기존의 v1 코드에서 tf.placeholder와 tf.Session을 사용하던 부분을 삭제하고 @tf.function으로 대체하면서 전체 코드 구조를 변경한다.
```

---



## Google assistant

원하는 장치 핸들러하기

아래는 오픈소스 코드이다.

https://github.com/googlesamples/assistant-sdk-python/tree/master/google-assistant-sdk/googlesamples/assistant/grpc

위의 깃헙사이트 들어가보자. 그러면 수정해야할 코드들이 보인다. 우리는 pushtotalk.py 파일을 수정해야한다.

```python
    device_handler = device_helpers.DeviceRequestHandler(device_id)

    @device_handler.command('action.devices.commands.OnOff')
    def onoff(on):
        if on:
            logging.info('Turning device on')
        else:
            logging.info('Turning device off')

```

412번째 줄 부터 나오는 내용이다.

위의 방식을 참고해서 우리가 하고자 하는 것들을 만들면된다.

아래의 주소는 Handlers 방식에 대한 예시이다.

https://developers.google.com/assistant/sdk/guides/service/python/extend/add-trait-and-handler

##### 작성 양식

```python
@device_handler.command('action.devices.commands.command-name')
def my-function(parameter-name):
    if conditional:
        logging.info('Something happened.')
    else:
        logging.info('Something else happened.')
```

| 코드           | 설명                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| command-name   | https://developers.google.com/assistant/sdk/reference/traits<br />에 나오는 표중에서 찾아서 이름을 적어주자. |
| my-function    | 자유롭게 원하는 핸들러 함수를 지정해 준다.                                                                   |
| parameter-name | 각각의 명령어가 가지는 parameters를 적어주자. 정확하게 작성해줘야한다.                                       |
| conditional    | 엄격하게 만들 필요는 없지만, 작동의 차별화를 주는데 도움을 줄것이다.                                         |

ex)

```python
@device_handler.command('action.devices.commands.BrightnessAbsolute')
def brightnessCheck(brightness):
    if brightness > 50:
        logging.info('brightness > 50')
    else:
        logging.info('brightness <= 50')

@device_handler.command('action.devices.commands.ColorAbsolute')
def color(color):
    if color.get('name') == "blue":
        logging.info('color is blue')
    else:
        logging.info('color is not blue')
```

# 라즈베리파이\_DB+웹연결

라즈베리파이4 설치가이드

```
https://projects.raspberrypi.org/en/projects/raspberry-pi-setting-up
```

#### MariaDB

> MySQL의 발전된 형태다.

apt-get을 최신 상태로 업데이트하기

```
$ sudo apt-get update
$ sudo apt-get upgrade
```

Mariadb 설치

```
$ sudo apt-get install mariadb-server
```

제거하기

```
$ sudo apt-get remove mariadb-server
```

설치확인

```
$ dpkg -l | grep mariadb
```

구동확인

```
$ ps -ef | grep mysql
```

```
$ systemctl status mysql
```

MariaDB server 시작과 중지

(명령어를 사용한 제어 start | stop | status )

```
$ sudo systemctl stop mysqld.service
```

```
$ sudo systemctl start mysqld.service
```

of 스크립트를 활용한 제어

```
$ sudo /etc/init.d/mysql stop
```

```
$ sudo /etc/init.d/mysql status
```

```
$ sudo /etc/init.d/mysql start
```

서버 시작 시 MariaDB Server 자동 구동 여부 설정

```
$ sudo systemctl disable mysqld.service
```

```
$ sudo systemctl enable mariadb.service
```

동작중인 모든 서비스 목록 확인

```
$ sudo systemctl list-units --type=service --state=running
```

자동시작 서비스 목록 확인

```
$ sudo systemctl list-files --type=service --state=enabled
```

대소문자 구별을 하지 않도록 설정 파일 변경

```
$ sudo mysql -uroot -p
```

치고 설정한 비밀번호로 바꾸면

MariaDB [(none)]>

```
MariaDB [(none)]> show variables like '%case%';
```

위와 같은 shell이 뜬다.

```
pi@raspberrypi:~ $ sudo mysql -uroot -p
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 36
Server version: 10.3.22-MariaDB-0+deb10u1 Raspbian 10

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show variables like '%case%';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | OFF   |
| lower_case_table_names | 0     |
+------------------------+-------+
2 rows in set (0.005 sec)

MariaDB [(none)]>

```

lower_case_table_names 의 값이 0이면 대소문자를 구별한다. 이제 1로 바꿔보자.

```
$ sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf
```

아래의 설정 값 입력

lower_case_table_names=1

- 아래의 리눅스 편집 하는 것들 확인하자.

파일 저장 후 mariadb 재시작

```
$ sudo systemctl restart mysqld.service
```

적용 여부 재확인

```
MariaDB [(none)]> show variables like '%case%';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | OFF   |
| lower_case_table_names | 1     |
+------------------------+-------+
2 rows in set (0.003 sec)

```

MariaDB 나가는 법은 `quit;`

##### 외부 접속을 위한 계정 생성 및 설정 파일 변경

외부에서 접속 가능한 계정 생성 및 모든 권한 부여

```
$ sudo mysql -uroot -p
```

DB 사용자 확인

```
MariaDB [(none)]> select host,user from mysql.user;
+-----------+------+
| host      | user |
+-----------+------+
| localhost | root |
+-----------+------+
1 row in set (0.001 sec)

```

모든 IP 대역(%)에서 접속 가능한 ssafy/ssafy 계정 생성

```
MariaDB [(none)]> create user ssafy@'%' identified by 'ssafy';
Query OK, 0 rows affected (0.001 sec)
```

ssafy 계정에 모든 권한 부여

```
MariaDB [(none)]> grant all privileges on *.* to ssafy@'%';
Query OK, 0 rows affected (0.001 sec)
```

주석처리

```
$ sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf
```

`# bind-address = 127.0.0.1`

위 부분을 주석처리를 하자.

파일 저장 후 mariadb 재시작

```
$ sudo systemctl restart mysqld.service
```

아래의 명령어 실행하여 MariaDB 가 모든 IP 대역을 수신하는지 여부 확인

```
$ sudo netstat -ntl
```

페이지 소스는 프론트서버에게만 받고, API를 호출 할 때만 백엔드 서버를 통해 데이터 베이스와 상호작용한다.

\_ Raspberry Pi 내에 아두이노와 연동된 장치를 제어하기 위한 드라이버가 존재해, 키오스크 클라이언트와 주기적으로 통신하며 정보를 주고 받는다.

---

이 후로는 mysql과 동일하다.

```
sudo mysql
```

을 입력하면 mysql로 접속하게 된다.

---

기본적으로 mariadb는 내부에서만 쓸 수 있다. 따라서 설정을 통해 외부 접속이 가능하게 변경을 해야한다. 아래의 명령어는 root 계정에 권한을 주는 것이다. 즉, 모든 주소로 접속이 가능하게 하자.

```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '비밀번호';
FLUSH PRIVILEGES;
```

/etc/mysql/my.cnf를 nano로 열면 내용 중에 127.0.0.1 즉 내부에서만 접속이 가능하도록 세팅된 부분이 있습니다. 이걸 앞에 #를 붙여서 주석처리하거나 127.0.0.1을 0.0.0.0 으로 변경합니다. 그리고 여기서 포트 번호도 변경가능합니다. 디폴트는 3306이다.

```
bind-addreess = 127.0.0.1
```

아래의 명령어를 통해 방화벽 설정을 하자.

```
sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --dport 3306 -j ACCEPT
sudo iptables-save
```

그리고 공유기를 통하고 있다면 포트포워드 기능을 통해서 접속 가능하게 설정해줘야 합니다.

내부포트는 3306 외부포트는 임의의 포트로 지정하는 것이 좋겠죠? (앞쪽에서 다른 서비스들과 중복되는 포트를 쓰면 문제가 생길 수 있습니다)

그렇게 하면 준비가 완료됩니다. 외부에서 접속할 때는 공유기에 들어오고 있는 기본 ip 주소:임의의 포트입니다. 예를 들면 123.456.789.012:8808 같은 형식으로 SQL 접속을 하면 되는 것을 볼 수 있습니다.

---

데이터 저장

- [CREATE DATABASE](https://mariadb.com/kb/en/create-database/) 는 비어있는 데이터베이스를 새롭게 만들려고 할 때 사용한다.
- [DROP DATABASE](https://mariadb.com/kb/en/drop-database/) 는 존재하고 있는 데이터베이스를 완전히 제거하기 위해서 사용한다.
- [USE](https://mariadb.com/kb/en/use/) 는 기본 데이터베이스를 지정하는데 사용한다.
- [CREATE TABLE](https://mariadb.com/kb/en/create-table/) 은, 여러분의 데이터가 실제로 저장되는, 새로운 테이블을 생성하는데 사용한다.
- [ALTER TABLE](https://mariadb.com/kb/en/alter-table/) 은 존재하고 있는 테이블의 정의를 변경할 때에 사용한다.
- [DROP TABLE](https://mariadb.com/kb/en/drop-table/) 은 존재하고 있는 테이블을 완전히 제거하기 위해서 사용한다.
- [DESCRIBE](https://mariadb.com/kb/en/describe/) 는 테이블의 구조를 보여준다.

데이터 조작

- [SELECT](https://mariadb.com/kb/en/select/) 는 데이터를 읽고(혹은 조회하고) 싶을 때 사용한다.
- [INSERT](https://mariadb.com/kb/en/insert/) 는 데이터를 추가(혹은 삽입)하려할 때 사용한다.
- [UPDATE](https://mariadb.com/kb/en/update/) 는 데이터를 변경(혹은 갱신)하려할 때 사용한다.
- [DELETE](https://mariadb.com/kb/en/delete/) 는 존재하는 데이터를 제거(혹은 삭제)하려할 때 사용한다.
- [REPLACE](https://mariadb.com/kb/en/replace/) 는 새로운 데이터를 추가하거나 존재하는 데이터를 변경(혹은 대체)하려할 때 사용한다.
- [TRUNCATE](https://mariadb.com/kb/en/truncate-table/) 는 테이블 내 모든 데이터를 비우려(혹은 삭제하려)할 때 사용한다.

트랜잭션

- [START TRANSACTION](https://mariadb.com/kb/en/start-transaction/) 는 트랜잭션을 시작할 때 사용한다.
- [COMMIT](https://mariadb.com/kb/en/commit/) 는 변경사항을 적용하고 트랜잭션을 종료한다.
- [ROLLBACK](https://mariadb.com/kb/en/rollback/) 는 변경사항을 포기하고 트랜잭션을 종료한다.

예제

```
CREATE DATABASE mydb; -- mydb 데이터베이스 생성
USE mydb; -- 기본 데이터베이스로 mydb를 지정
CREATE TABLE mytable ( id INT PRIMARY KEY, name VARCHAR(20) ); -- mytable 테이블 생성
INSERT INTO mytable VALUES ( 1, 'Will' ); -- 데이터 입력
INSERT INTO mytable VALUES ( 2, 'Marry' );
INSERT INTO mytable VALUES ( 3, 'Dean' );
SELECT id, name FROM mytable WHERE id = 1;
UPDATE mytable SET name = 'Willy' WHERE id = 1;
SELECT id, name FROM mytable;
DELETE FROM mytable WHERE id = 1;
SELECT id, name FROM mytable;
DROP DATABASE mydb;
SELECT count(1) from mytable; gives the number of records in the table
```

---

### 리눅스 참고 명령어

VI 문서 편집기 사용하기

파일 열기

vi test.txt

편집모드

i - 커서 앞에 텍스트 삽입

a - 커서 뒤에 텍스트 삽입

o - 현재 행 아래에 텍스트 삽입

텍스트 교체

r- 한 글자만 교체

R - 커서가 있는 자리부터 여러문자 교체

커서이동

왼쪽 - h , Delete

아래 - j

위 - k

오른쪽 - l

신속이동

w - 오른쪽으로 특수문자 혹은 한 단어의 처음으로 이동

b - 왼쪽으로 특수 문자 혹은 한 단어의 처음으로 이동

W - 오른쪽으로 한 단어의 처음으로 이동

B - 왼쪽으로 한 단어의 처음으로 이동

한 행 안에서의 이동

0 (숫자) - 행의 맨 처음으로 이동

\$ - 행의 맨 마지막으로 이동

페이지 이동

G - 문서의 맨 끝 행으로 이동

nG - n번째 행으로 이동

C-f 한페이지 아래로 이동

C-b 한페이지 위로 이동

삭제명령

dw - 한 단어 삭제

dd - 한 줄 삭제

D - 커서부터 행 끝까지 삭제

x - 한 글자 삭제

텍스트 복사

yw - 한단어 복사

y\$ - 커서부터 행 끝까지 복사

yy - 한줄 모두 복사

텍스트 탐색

/ - 전방 탐색

? - 후방 탐색

n - 같은 방향으로 탐색 계속

N - 반대 방향으로 탐색 계속

/ - 전방 탐색 계속

? - 후방 탐색 계속

행 번호 붙이기

: set nu

행 번호 없애기

:set nonu

특정 행 번호로 이동

:1 - 1번째 행으로 이동

:\$ - 마지막 행으로 이동

:\$= - 현재 문서의 총 줄(행) 수

:. = - 현재 위치의 행번호

-명령모드-

명령모드에서 벗어나 편집모드로 진입하기

i : 커서가 놓여 있는 위치의 문자를 밀어내고 삽입된다.

a : 커서가 놓여 있는 위치의 문자 뒤에 삽입된다.

o (소문자 o) : 현재 행의 아래행을 밀어내고 입력 모드로 전환 된다.

O (대문자 O) : 현재 행을 한 줄 아래로 밀어내고 입력 모드로 전환된다.

입력모드와 삽입모드를 습관적으로 변환하기

입력모드 : **ESC** 누르면 명령모드로 변경되어 이동,삭제,검색,치환,저장,종료,열기 가능하다.

명령모드 : **i, a, o, O** 누르면 삽입모드로 입력이 가능하다.

VI 방식의 종료와 저장, 새이름으로 저장

:q - 저장하기 않고 vi 종료하기

:q! - 강제 종료

:w - 현재 내용을 저장

:w! - 일기 전용인 파일을 수정 후 강제로 저장

:wq - 저장하기 않고 종료

:wq! - 일기 전용인 파일을 수정 후 강제로 저장하고 종료하기

:w 새파일명 - 새이름으로 저장

---

### mariaDB 참고 명령어

로그인
mysql -u -D -p
mysql -p

데이터베이스 확인
show databases;

DB 접속
use mysql;

테이블 리스트 보기
show tables;

나가기
quit;

톱켓 데몬스크립트 파일명
cp /usr/local/cafe24/mariadb/support-files/[mysql.server](https://jg-seo.tistory.com/mysql.server)

데몬 설정 리스트 확인(/etc/init.d)
chkconfig

데몬 설정 추가 예시
chkconfig mariadb on

데몬 설정 켜기/끄기
/etc/init.d/mariadb stop
/etc/init.d/mariadb stop

---

### Chromium

Raspberry Pi에 Chrome 설치는 안되지만, Chromium을 설치가 가능하다.

참고 내용

https://www.danpurdy.co.uk/web-development/raspberry-pi-kiosk-screen-tutorial/

라즈베리파이 홈페이지 참고 내용

https://tutorials-raspberrypi.com/google-chrome-for-raspberry-pi/

```
$ sudo apt-get install chromium-browser
```

오류가 난다면 아래의 명령을 실행하고 다시 설치를 해보자.

```
$ sudo apt-get update
```

### 마이크 장비

라즈베리파이 제로 제로W AI 음성인식 개발 2 MICs 햇

https://www.techshenzhen.com/goods/goods_view.php?goodsNo=1000000899

마이크 스피커 작동 확인

https://m.blog.naver.com/skyshin0304/221291564090

---

### 장치에서 DB 받기

https://blog.naver.com/PostView.nhn?blogId=simjk98&logNo=221229266764&redirect=Dlog&widgetTypeCall=true&directAccess=false

마리아 DB 설치

```
sudo apt-get install mariadb-server
```

설치 후 정상 가동 확인

```
ps -ef | grep mysql
```

DB 접속

```
sudo mysql -u root -p
```

데이터베이스 생성

```
create database raspi_db
character set utf8 collate utf8_general_ci;
```

유니코드사용(한글사용)을 위해 캐릭터 셋을 uft8로 지정하고 문자비교시에도 utf8을 이용하여 비교할 수 있도록 collate를 지정해 준다.

사용자 생성 및 원한 설정

```
> create user 'raspi_user'@'%'identified by '패스워드';
> grant all privileges on raspi_db.* to 'raspi_user'@'%';
```

raspi_user로 접속하여 raspi_db에 테이블 생성

```
sudo mysql -u raspi_user -p
```

```
[(none)]> use raspi_db;
```

이렇게 친 후에 DB 테이블 생성을 아래와 같이 하면된다.

```
MariaDB [raspi_db]> create table collect_data(
	-> sensor varchar(30) not null,
	-> collect_time datetime not null,
	-> value1 float,
	-> value2 float);
```

DB를 확인해 보자.

```
MariaDB [raspi_db]> show tables;
----------------------
Tables_in_raspi_db
----------------------
collect_data
----------------------
```

##### 외부 접속 허용

maria DB의 초기설정의 외부 IP에서 접속하지 못하고 localhost에서만 접속하도록 셋팅되어 있는데, 바꿔주자. /etc/mysql/mariadb.conf.d 디렉토리의 50-server.cnf 파일의 `bind-address = 127.0.0.1을 주석처리하자.

재가동하면 외부접속 허용이 완료된다.

```
sudo service mysql restart
```

##### 파이썬으로 DB 접속하기

DB 생성을 완료 했으면 파이썬에서 DB에 접속하여 데이터를 쓰고 읽어오게 하는 소스를 생성해얗나다.

파이썬에서 mariaDB를 연결하기 위해서는 DB연동 패키지를 설치하자.(pymysql)

```
sudo pip3 install pymysql
```

DB에 접속하는 코드 작성(한 행씩 처리하게 가능하다)

온도습도센서라고 하면 40비트의 데이터로 온도 습도를 전송해준다.

제어할 라이브러리는 git clone으로 받아온다. 그리고 설치.

GND에 관련 핀에서 연결해서 데이터를 수집

데이터에 맞게 필요한 파이썬 라이브러리를 찾아서 사용.

---

### 음성 센서 관련

https://blog.naver.com/PostView.nhn?blogId=simjk98&logNo=221230495875&parentCategoryNo=&categoryNo=7&viewDate=&isShowPopularPosts=false&from=postView

음성 센서 확정 짓기.(MQTT 통신이냐 다른 통신이냐/ 디지털 센서이냐 아날로그 센서이냐.)

pdf파일 저장

---

### 전자서적 저장

전자서적(document)을 XML로 바꿔서 라즈베리파이에 저장

![document by XML](C:\Users\multicampus\Desktop\pjt_2\s03p12d204\embedded\picture\document by XML.PNG)

##### document -> XML

Q. 전자서적.

##### XML -> 라즈베리파이

음성인식

https://diy-project.tistory.com/88

```
pcm.!default {
  type asym
  capture.pcm "mic"
  playback.pcm "speaker"
}
pcm.mic {
  type plug
  slave {
    pcm "hw:<card number>,<device number>"
  }
}
pcm.speaker {
  type plug
  slave {
    pcm "hw:<card number>,<device number>"
  }
}
```

위와 같은것이 나노 에디터이다. 저장을 하기 위해서는

https://swiftcoding.org/cli-and-nano-editor

컨트롤+O

---

우리가 가지고 있는 마이크 spec

https://learn.adafruit.com/usb-audio-cards-with-a-raspberry-pi/recording-audio

Google Assistant 확장\_Python

https://developers.google.com/assistant/sdk/guides/service/python/embed/setup

##### Google Assistant gRPC API 용 Python 샘플

https://github.com/googlesamples/assistant-sdk-python/tree/master/google-assistant-sdk/googlesamples/assistant/grpc
