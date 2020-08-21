input으로 들어오는 오디오 파일은 엠프리 튜드

푸리에 변환(Fourier transform)통해

프리퀀시 영역을 얻음.



STFT



오디오를 딥러닝에 넣어보자.(Audio Task)



Speech Classification - input을 넣었을 때 activation되는 기능을한다. 즉, 음성을 정확히 인식하려면 sound classification을 잘해야한다. 헬로빅스비

음성을 이해하려면 Speech Recognition(STT) - 연어로 무엇을 만들 수 있어?

Speech Synthesis(TTS) - 만들 수 있는 걸을 알려줌



위의 3가정을 커버하는게 Audio Task이다.

Task에 대해 알았으니 이제 러닝 쪽으로 가자



---

딥러닝은 레고카다. input, output 모듈, Network architectures, Losses 만 잘 정리하면, 자동차 레고카를 만들 수 있다.

레고박스 - 레고를 담을 수 있다. 플랫폼(하드웨어나 GPU)

레고설명서와 조립방법이 필요 - tensorflow, pytorch

Datasets

즉, Platforms, Frameworks, Datasets



---

input and output/ Architectures/ Losses 이렇게 세가지를 조립한다



---

### Deep Learning Building Blocks

![KakaoTalk_20200805_013317794](C:\Users\multicampus\Desktop\KakaoTalk_20200805_013317794.png)

**Connectivity Patterns** 에 **Nonlinearity modules**를 붙이고, 레고를 몇개 쌓는다.

몇개를 쌓고 맞는 방향으로 가고 있는가에 대해 이상적인 레고랑 비교해서 방향성을 찾는 **Loss function**을 정의해야한다.

**Loss function**에서 Optimal을 찾는게 **Optimizer** 방식이다.

위의 모든 과정에서 추가로 세부 조정을 할 때 사용하는 것이 **Hyper Parameters** 방식이 있다.





##### Connectivity Patterns

Fully-Connected

Convolutional Neural Networks - 

 

Audio(CNN)에서는 Frequenct, Time의 프리퀀시가 인풋으로 보통 들어가서 Channel이 없다.

RNN -> input을 x라고 하고, 



cloud api