#### MFCC(Mel Frequency Cepstral Coefficient)

- 음성인식에서 가장 널리 사용되는 알고리즘이다.
- MFCC는 오디오 파형의 작은 시간 조각을 가져와서 푸리에 변환(Fourier Transform)으로 각 주파수의 전력량을 빠르게 계산을 한다
- 그 타임 슬라이스는 빠른 푸리에 변환에 필터 세트를 적용한다.



음성 인식 시 가장 필요한 것은 입력된 신호에서 노이즈 및 배경 소리로 부터 실제 유효한 소리의 특징을 추출하는 것이다. MFCC는 바로 소리의 특징을 추출하는 기법인데, 입력된 소리 전체를 대상으로 하는 것이 아니라, 일정 구간(Sort time)식 나누어, 이 구간에 대한 스펙트럼을 분석하여 특징을 추출하는 기법이다. _ 1980



MFCC 이전에는 HMM Classifier를 이용한 Linear Prediction Coefficients(LPC)와 Linear Prediction Cepstral Coefficient(LPCC) 기법이 음성 인식 기법으로 주로 활용되어 왔다.



##### MFCC의 단계

1. 입력 시간 도메인의 소리 신호를 작은 크기 프레임으로 자른다.(Take FFT of window)
2. 각 프레임에 대하여 Power Spectrum의 Periodogram estimate (Periodogram Spectral Estimate)를 계산한다. 진폭 대 주파수 특성을 검사하기 위한 가장 일반적인 도구이다.
3. 2번에서 구한 Power Spectrum에 Mel Filter bank를 적용하고, 각 필터에 에너지를 합한다.
4. 3번에서 구한 모든 필터 뱅크 에너지의 Log를 취한다
5. 4번 값에 DCT를 취한다.
6. DCT를 취한 값에 Coefficients 2~13반 남기고 나머지는 버린다.



##### 단계별 구체화

1 단계. 시간영역에서 입력된 소리 신호는 지속적으로 변화하게 된다. 따라서, 이런 변화를 간단히 하기 위해서 짧은 시간 내에서는 소리가 많이 변하지 않는다고 가정한다. 이 때 '많이 변하지 않는다'는 것은 실제 소리 신호의 변화가 없다는 말이 아니라, 짧은 구간에서 통계적으로 변화가 거의 없다는 것이다.
일반적으로 MFCC에서는 이 프레임의 길이는 20~40ms 정도로 정하고 있다. 물론 Sampling Rate에 따라 쌤플의 수는 달라지겠지만, 44.1KHz 기준으로 대략 천개의 샘플이 된다. 만약 이 샘플 수 가 너무 적으면 주파수 분석에 신뢰도가 떨어지고, 이 값이 너무크면 신호의 변화가 한 프레인 내에서 너무 크게 되기 때문에, 분석이 어렵다.

2 단계. 각 프레임에 대해 파워 스팩트럼(주파수)를 계산한다. (Periodogram Spectral Estimation) 해부학적으로 인간의 귀는 입력된 소리의 주파수에 따라 달팽이관의 진동하는 부위가 다르다. 즉, 달팽이관의 어떤 지점이 진동하느냐에 따라, 각 달팽이관 신경들이 뇌에 어떤 주파수가 입력되었는지 알려주게 된다. MFCC 에서 Periodogram Estimation (주기도 평가)은 인간의 이러한 기능과 비슷한 역할을 한다고 할 수 있다.사실, Periodogram Spectral Estimation 은 여전히 음성인식에 불필요한 많은 정보를 가지고 있다.

특히, 달팽이관은 인접한 주파수들 크게 구분하지 못한다. 저주파의 경우 잘 구분하지만, 고주파로 올라갈 수록 주파수 구분을 잘 못하게 된다. 따라서 Periodogram Bin 들의 그룹을 만들고, 이 그룹들을 합하는 방식으로 다양한 주파수들 사이에서 얼마만큼의 에너지가 있는지 얻을 수 있다. 이를 위하여 Mel Filter Bank를 활용한다.



3 단계. Mel Filter Bank

처음 필터는 매우 얇으며, 특히 0Hz(저주파) 주변에서 얼마만큼의 에너지가 있는지을 알려준다. 그리고, 주파수가 올라가면 갈 수록 필터의 폭은 넓어지며, 고주파가 되면 거의 고려하지 않게된다. 우리는 관심은 각 구간에서 얼마만큼의 에너지가 발생하지 대략적으로 아는 것에 있으며, **Mel Scale**은 Filter Bank를 나눌 때 어떤 간격으로 나누어야 하는지 알려주며, **간격을 나누는 방법**은 다음과 같다.

**Mel Scale**
Convert Frequency to Mel Scale :  ![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1r8vi71njeet6.jpg%22&type=w2) (1)

Convert Mel Scale to Frequency : ![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1ranzdgzgknsx.jpg%22&type=w2) (2)



4 단계. Filter Bank 에너지가 입력되면, 이 값에 로그를 취한다. 이 압축 연산은 인간이 실제로 듣는것과 유사하게 소리의 특징을 만들 수 있다. 여기서 다시 Cube Root가 아니라, 로그를 취하는 이유는, 로그를 쓰게 되면, 이후에 채널 Noramlization 기법인 Cepstral Mean Subtraction을 사용할 수 있게 되기 때문이다. 로그를 취하는 이유는 인간의 귀는 소리의 크기를 Linear Scale 로 감지하는 것이 아니기 때문이다. 일반적으로 소리가 두배 크게 들리기 위해서는 실제로 에너지의 8배를 인가해야 한다고 한다. 이 말은 즉, 만약 소리의 전체 크기가 크다면, 에너지 변화가 좀 크더라 하더라도 실제 큰 차이가 없을 수가 있다.



5 단계. 로그가 취해진 Filter Bank 에너지에 DCT를 계산한다. 이 이유는 두가지 인데, Filter Bank는 모두 Overlapping 되어 있기 때문에 Filter Bank 에너지들 사이에 상관관계가 존재하기 때문이다. DCT는 에너지들 사이에 이러한 상관관계를 분리 해주는 역활을 하며, 따라서 Diagonal Covariance Matrice 를 사용할 수 있게 된다. (HMM Classifier 와 유사함)



6 단계. 하지만 여기서 26개 DCT Coefficient 들 중 12만 남겨야 하는데, 그 이유는 DCT Coefficient 가 많으면, Filter Bank 에너지의 빠른 변화를 나타내게 되고, 이것은 음성인식의 성능을 낮추게 되기 때문이다.



#### 구현방법

**Sampling Rate : 96KHz**



1. 소리 획득

앞에서 언급한바와 같이 MFCC 는 20~40ms 정도로 Frame를 자르는 것이 일반적이다. 본 구현에서 하드웨어로 FFT 할 계획이기 때문에 한 프레임을 2048Point 할 수 있는 21.33ms 로 정한다.

첫 프레밍과 다음 프레임은 오버랩 되도록 하는 것이 일반적이므로, 첫 프레임은 신호의 인덱스0 부터 시작하고 그 다음 2048 샘플은 1024 에서 시작하도록 한다.

그리고, 소리가 2048 샘플을 모두 채우지 못할 경우 무음 신호는 0으로 대체 한다.



2. DFT (Fourier Transform) -> Periodogram based Power Spectral Estimate

위 단계에서 획득한 1개 프레임(2048 샘플) 에 대해서만 고려하며,12 개의 MFCC Coefficient 는 각각의 프레임에 대해 독립적으로 만들어진다.

단일 프레임에 대해 DFT를 취하면, 다음 식과 같다.

![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1rbor2zcb8oum.jpg%22&type=w2)

기호 :

s(n) : 시간 영역에서의 신호

si(n) : n 은 1 ~ 2048 의 샘플, i 는 프레임의 번호

h(n) : N 개의 샘플을 가지는 윈도우

K : Length of DFT



DFT 결과를 이용하여 Periodogram-based power spectral Estimate 구하면 다음 식과 같다.

![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1rboxnb21m8hg.jpg%22&type=w2)

2048 포인트 DFT를 하게 되면, 실제 얻는 Coefficent는 1025개가 된다.



\3. Filter Bank를 계산한다. 이 필터 뱅크는 20~40개의 삼각필터 세트로 이루어지는데, 26개가 일반적이다. 즉, FFT 결과 Coefficient가 1025 포인트 개 인데, 총 1025 개 포인트를 가지는 삼각파형 백터가 총 26개가 생성된다. 이 필터를 위에서 구한 Periodogram-Based Power Spectral Estimate (1025개 Coefficient) 의 결과에 적용한다. 각 백터의 자기 스팩트럼에 해당하는 일부 구간을 제외한 다른 주파수 영역에 대해서는 모두 0의 값을 가지게 된다. 

Filter Bank Energy를 구하기 위하여, 각 Filter Bank의 포인트와 각 Power Spectrum 포인트를 곱하고, Coefficient를 더한다.**(즉, Filter Bank와 Power Spectrum 사이의 행렬 곱을 함)** 따라서 계산을 수행하면 오직 26개의 수만 남게 되고 이 값이 각 Filterbank 에서 얼마만큼의 에너지를 가지는 보여주게 된다.





Filter Bank 계산방법에 대해 자세히 알아보자.



이해를 쉽게 하기 위해서 본 설명에서는

Filter Bank를 10개로 하고, Sampling Rate를 16KHz로 정의하고 구해보도록 한다.

아래 그림의 (a) 를 얻기 위하여 먼저 최저 및 최대 주파수 범위를 정의해야 하는데, 보통 최저주파수는 300Hz로 정의하고 최고주파수는 8KHz로 정의하는 것이 일반적이다. (하지만, 이 범위는 당연히어플레이션에 목적에 따라 달라질 수 있다.)

\- 먼저 식1을 이용해서 최저/최고 주파수에 대한 M(f)를 구한다. (본 예에서는 300Hz의 경우 401.25가 되고, 8KHz의 경우 2834.99가 된다.)

\- 본 예에서는 10 Filter Bank를 만들기로 했기 때문에, 실제 12개 포인트가 필요하다. 즉 401.25와 2834.99 Mel 사이에 10개의 포인트 균등하게 넣어보면,

\- m(i) = 401.25, 622.50, 843.75, 1065.00, 1286.25, 1507.50, 1728.74, 1949.99, 2171.24, 2392.49, 2613.74, 2834.99 가 되고,

\- 이 값을 다시 식(2) 를 용하여 각 포인트에 대한 주파수를 구할 수 있다.

\- h(i) = 300, 517.33, 781.90, 1103.97, 1496.04, 1973.32, 2554.33, 3261.62, 4122.63, 5180.76, 6446.70, 8000

\- 위에서 계산한 포인트에 필터를 넣어야 하는데 주파수의 Resolution 을 모르기 때문에 위에서 구한 주파수를 반올림하여 최고 가까운 FFT Bin 값을 찾아야 한다.

h(i) 주파수를 FFT Bin 위치(index)로 변환하기 위하여 FFT size와 Samplerate를 활용하면 된다.

![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1rdlt9tlhfykk.jpg%22&type=w2)

![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1rdnifg1j40xv.jpg%22&type=w2)



\- 이제, Filter Bank를 만들면 된다.

첫번째 Filter Bank는 첫번째 포인트에서 시작하여 두번째 포인트에서 최대가 되고, 3번째 포인트에서 0이 된다.

두번째 Filter Bank는 두번째 포인트에서 시작하여, 3번째 포인트에서 최대가 되고, 4번째 포인트에서 0이 된다. 이것을 시작으로 나타내면 다음과 같다.

![img](https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fssl.pstatic.net%2Fimages.se2%2Fsmedit%2F2017%2F4%2F21%2Fj1rdz9p4mr1yfx.jpg%22&type=w2)

M : Filter의 수

m : Filter의 인덱스

f() : M+2Mel-Spaced Frequency 의 리스트



![img](https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjZfMTIg/MDAxNDkzMTY3Mzg5ODM0._iolVsDnvQY9_lVt3FOVUkZoONFBSrSwpY77leWySvcg.4XXVKo4BKeiofKeBUTuHJ-aTlRv2mwPPFwIRAXtUHpIg.PNG.mylogic/10_filt_melfb.png?type=w2) 



10개의 filter를 가진 Mel-Filterbank . - 위 filterbank는 0Hz 부터 8KHz 까지300Hz 부터 시작 한다.

 

![img](https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjZfMTM3/MDAxNDkzMTY3MzUyNTM5.CU_nVZA5H6D61ge7wL4aT7Y0YowNcuECBKGszJrgD1Yg.8bqsFFnEgcwrBNh9mYuTAa_oUSFAt7wfefeIkIMLli4g.PNG.mylogic/mel_filterbank_example.png?type=w2)

(위 예제는 DFT의 결과에 대한 Coefficient 개수가 257일때를 가정한 것임, 512 Point DFT)



\4. 3에서 구한 26개 에너지들에 대해 Log 를 구한다.



\5. 26개의 Cepstral Coefficient를 구하기 위해 26 log filter bank 에너지에 대해 DCT를 구한다. 음성 인식에서는 낮은 12~13개 Coefficient만 남기도 나머지는 버린다.



**마지막 남은 12~13개의 Coefficient들을 Mel Frequency Cepstral Coefficient 라 한다.** 





# MFCC (Mel Frequency Cepstral Coefficient) 튜토리얼

자동 음성 인식 시스템의 첫 번째 단계는 특징을 추출하는 것입니다. 즉, 언어 컨텐츠를 식별하고 배경 소음, 감정 등과 같은 정보를 전달하는 다른 모든 것을 버리는 데 적합한 오디오 신호의 구성 요소를 식별하는 것입니다.

음성에 대해 이해해야 할 주요 요점은 사람이 생성 한 소리가 혀, 이빨 등을 포함한 성대 형태로 필터링된다는 것입니다.이 형태는 어떤 소리가 나오는지를 결정합니다. 모양을 정확하게 결정할 수 있다면, 생성 되는 [음소를](http://en.wikipedia.org/wiki/Phoneme) 정확하게 표현할 수있을 것입니다. 성대의 형태는 단시간 전력 스펙트럼의 엔벌 로프에서 나타나며 MFCC의 역할은이 엔벨로프를 정확하게 나타내는 것입니다. 이 페이지는 MFCC에 대한 간단한 자습서를 제공합니다.

MFCC (Mel Frequency Cepstral Coefficents)는 자동 음성 및 스피커 인식에 널리 사용되는 기능입니다. 그들은 1980 년대에 Davis와 Mermelstein에 의해 소개되었으며, 그 이후로 최첨단 기술이되었습니다. MFCC를 도입하기 전에 LPC (Linear Prediction Coefficients) 및 LPCC (Linear Prediction Cepstral Coefficients) (두뇌 [및 LPCC에 대한 자습서를](http://www.practicalcryptography.com/miscellaneous/machine-learning/tutorial-cepstrum-and-lpccs/) 보려면 [여기를](http://www.practicalcryptography.com/miscellaneous/machine-learning/tutorial-cepstrum-and-lpccs/) 클릭 [하십시오](http://www.practicalcryptography.com/miscellaneous/machine-learning/tutorial-cepstrum-and-lpccs/) )이며 특히 [HMM](http://practicalcryptography.com/miscellaneous/machine-learning/hidden-markov-model-hmm-tutorial/) 분류기 를 사용하는 자동 음성 인식 (ASR)의 주요 기능 유형이었습니다. . 이 페이지에서는 MFCC의 주요 측면, ASR에 유용한 기능 및 구현 방법에 대해 설명합니다.

## 한눈에 보는 단계 

우리는 구현 단계에 대해 높은 수준의 소개를 한 다음 왜 우리가하는 일을하는지 깊이있게 다룰 것입니다. 마지막으로 MFCC를 계산하는 방법에 대해 더 자세히 설명하겠습니다.

1. 신호를 짧은 프레임으로 구성하십시오.
2. 각 프레임 에 대해 전력 스펙트럼 의 [주기도 추정치](http://en.wikipedia.org/wiki/Periodogram) 를 계산하십시오 .
3. 멜 필터 뱅크를 전력 스펙트럼에 적용하고 각 필터의 에너지를 합산하십시오.
4. 모든 필터 뱅크 에너지의 로그를 취하십시오.
5. 로그 필터 뱅크 에너지의 DCT를 가져옵니다.
6. DCT 계수를 2-13으로 유지하고 나머지는 버립니다.

일반적으로 수행되는 작업이 몇 가지 더 있으며 때로는 프레임 에너지가 각 특징 벡터에 추가됩니다. [델타 및 델타 델타](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/#deltas-and-delta-deltas) 기능도 일반적으로 추가됩니다. 리프팅은 일반적으로 최종 기능에도 적용됩니다.

## 왜 이런 일을합니까? 

이제 단계를 조금 더 천천히 진행하고 각 단계가 필요한 이유를 설명하겠습니다.

오디오 신호는 지속적으로 변하기 때문에 짧은 시간에 오디오 신호가 크게 변하지 않는다고 가정하는 것을 단순화하기 위해 (우리가 변하지 않는다고 말할 때 통계적으로 정지 해 있음을 의미합니다. 샘플은 지속적으로 변합니다. 짧은 시간 비늘). 이것이 우리가 신호를 20-40ms 프레임으로 만드는 이유입니다. 프레임이 훨씬 짧으면 신뢰할 수있는 스펙트럼 추정치를 얻을 수있는 샘플이 충분하지 않습니다. 프레임이 길면 신호가 프레임 전체에서 너무 많이 변경됩니다.

다음 단계는 각 프레임의 전력 스펙트럼을 계산하는 것입니다. 이것은 들어오는 소리의 주파수에 따라 다른 지점에서 진동하는 인간 달팽이관 (귀의 기관)에 의해 유발됩니다. 진동하는 달팽이관의 위치 (작은 모발을 흔들림)에 따라 다른 신경이 발화되어 특정 주파수가 있음을 뇌에 알립니다. 우리의 주기도 추정은 우리에게 비슷한 작업을 수행하여 프레임에 어떤 주파수가 있는지 식별합니다.

주기도 스펙트럼 추정값에는 여전히 ASR (Automatic Speech Recognition)에 필요하지 않은 많은 정보가 포함되어 있습니다. 특히 달팽이관은 밀접하게 이격 된 두 주파수 간의 차이를 식별 할 수 없습니다. 이 효과는 주파수가 증가함에 따라 더욱 두드러집니다. 이러한 이유로 우리는 주기도 빈의 덩어리를 취해 여러 주파수 영역에 얼마나 많은 에너지가 존재하는지에 대한 아이디어를 얻습니다. 이는 Mel 필터 뱅크에 의해 수행됩니다. 첫 번째 필터는 매우 좁으며 0 Hertz 근처에 얼마나 많은 에너지가 존재하는지 나타냅니다. 주파수가 높아질수록 변동에 대한 걱정이 줄어들수록 필터가 넓어집니다. 우리는 대략 각 지점에서 얼마나 많은 에너지가 발생하는지에 관심이 있습니다. Mel 스케일은 필터 뱅크의 간격을 어떻게 정하고 얼마나 넓게 만들 수 있는지 알려줍니다. 참조 [아래](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/#computing-the-mel-filterbank) 간격을 계산하는 방법.

필터 뱅크 에너지가 확보되면 로그를 취합니다. 이것은 또한 인간의 청각에 의해 유발됩니다 : 우리는 선형 적으로 소리가 들리지 않습니다. 일반적으로 감지되는 음량을 두 배로 늘리려면 8 배의 에너지를 넣어야합니다. 즉, 소리가 크게 들리면 에너지의 큰 변화가 다를 수는 없습니다. 이 압축 작업은 우리의 기능이 사람이 실제로 듣는 것과 더 밀접하게 일치하도록합니다. 왜 큐브 루트가 아닌 로그인가? 로그는 채널 정규화 기술인 두근 평균 뺄셈을 사용할 수있게합니다.

마지막 단계는 로그 필터 뱅크 에너지의 DCT를 계산하는 것입니다. 이것이 수행되는 두 가지 주요 이유가 있습니다. 필터 뱅크가 모두 겹치므로 필터 뱅크 에너지는 서로 매우 밀접한 관련이 있습니다. DCT는 에너지를 장식합니다. 즉 대각선 공분산 행렬을 사용하여 HMM 분류기 등의 형상을 모델링 할 수 있습니다. 그러나 26 개의 DCT 계수 중 12 개만 유지됩니다. DCT 계수가 높을수록 필터 뱅크 에너지의 빠른 변화를 나타 내기 때문에 이러한 빠른 변화는 실제로 ASR 성능을 저하시키는 것으로 나타났습니다.

## 멜 스케일은 무엇입니까? 

Mel 스케일은 순수한 톤의 인식 된 주파수 또는 피치를 실제 측정 된 주파수와 관련시킵니다. 인간은 고주파수보다 저주파수에서 피치의 작은 변화를 식별하는 것이 훨씬 낫습니다. 이 척도를 통합하면 우리의 기능이 사람의 의견과 더 밀접하게 일치합니다.

주파수에서 멜 스케일로 변환하는 공식은 다음과 같습니다.

![img](http://practicalcryptography.com/media/latex/369d64804e572729863c874aaa092e582bf5eb56-11pt.png)

Mels에서 주파수로 돌아가려면 :

![img](http://practicalcryptography.com/media/latex/05d74bc31f4c2a9c375dd9c95d4642d558f455a0-11pt.png)

## 구현 단계 

음성 신호로 시작해서 16kHz로 샘플링했다고 가정하겠습니다.

\1. 신호를 20-40ms 프레임으로 프레임하십시오. 25ms가 표준입니다. 이것은 16kHz 신호의 프레임 길이가 0.025 * 16000 = 400 샘플임을 의미합니다. 프레임 단계는 일반적으로 10ms (160 개 샘플)와 비슷하며 프레임과 겹칠 수 있습니다. 첫 번째 400 샘플 프레임은 샘플 0에서 시작하고 다음 400 샘플 프레임은 음성 파일의 끝에 도달 할 때까지 샘플 160 등에서 시작합니다. 음성 파일이 짝수 개의 프레임으로 나뉘 지 않으면 0으로 채 웁니다.

다음 단계는 모든 단일 프레임에 적용되며 각 프레임에 대해 12 개의 MFCC 계수 세트가 추출됩니다. 표기법에 대한 짧은 점은 다음과 같습니다 ![img](http://practicalcryptography.com/media/latex/70d1b299ee52431700f44e5e87a9e7c17349a16f-11pt.png). 시간 도메인 신호라고 합니다. 일단 프레임되면 ![img](http://practicalcryptography.com/media/latex/9b3dc4b224cc0c356406dbbdacd54dc5ab3cae9a-11pt.png)n은 1-400 이상의 범위 (프레임이 400 샘플 인 경우)와 ![img](http://practicalcryptography.com/media/latex/2166dcb5865f974c0c285d3bcb1464f65d895074-11pt.png)프레임 수의 범위를 갖습니다 . 우리는 복잡한 DFT를 계산하면, 우리가 얻을 ![img](http://practicalcryptography.com/media/latex/59416aead1098181fc51ad81b9d8070401c7cf04-11pt.png)- (가) 어디에서 ![img](http://practicalcryptography.com/media/latex/2166dcb5865f974c0c285d3bcb1464f65d895074-11pt.png)시간 도메인 프레임에 해당하는 프레임 수를 나타낸다. ![img](http://practicalcryptography.com/media/latex/4f6522a52e781c1d01ef30df3b8534d2b920758e-11pt.png)그러면 프레임의 전력 스펙트럼입니다 ![img](http://practicalcryptography.com/media/latex/2166dcb5865f974c0c285d3bcb1464f65d895074-11pt.png).

\2. 프레임의 이산 푸리에 변환을 수행하려면 다음을 수행하십시오.

![img](http://practicalcryptography.com/media/latex/c970f070a776e4c900bd3e8a2082a2971236b013-11pt.png)

여기서 ![img](http://practicalcryptography.com/media/latex/dc52f5afe0e59b4ed07b222ebcb7832bfa6579ad-11pt.png)인 ![img](http://practicalcryptography.com/media/latex/50ec1aff7eaddddda99094b6cc7c602dc3c98245-11pt.png)샘플 긴 분석 윈도우 (예를 들어, 해밍 윈도우) 및 ![img](http://practicalcryptography.com/media/latex/6eee515a89159b28568cb0744e3a8d5a68ab8d26-11pt.png)DFT 길이이다. 음성 프레임에 대한 주기도 기반 전력 스펙트럼 추정치 ![img](http://practicalcryptography.com/media/latex/9b3dc4b224cc0c356406dbbdacd54dc5ab3cae9a-11pt.png)는 다음과 같이 제공됩니다.

![img](http://practicalcryptography.com/media/latex/c526edb9d52e631812798237ea3f2beea496d181-11pt.png)

이것을 전력 스펙트럼의 주기도 추정이라고합니다. 복잡한 푸리에 변환의 절대 값을 취하고 결과를 제곱합니다. 일반적으로 512 포인트 FFT를 수행하고 처음 257 개의 계수 만 유지합니다.

\3. 멜 간격 필터 뱅크를 계산합니다. 이 단계는 2 단계의 주기도 전력 스펙트럼 추정에 적용되는 20-40 (26 표준) 삼각형 필터 세트입니다. 필터 뱅크는 길이가 257 인 26 개의 벡터 형태입니다 (FFT 설정이 2 단계 인 경우). 각 벡터는 대부분 0이지만 스펙트럼의 특정 섹션에서는 0이 아닙니다. 필터 뱅크 에너지를 계산하기 위해 각 필터 뱅크에 전력 스펙트럼을 곱한 다음 계수를 더합니다. 이 작업이 수행되면 26 개의 숫자가 남게되어 각 필터 뱅크의 에너지 양을 나타냅니다. 필터 뱅크 계산 방법에 대한 자세한 설명은 [아래를](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/#computing-the-mel-filterbank) 참조하십시오 . 다음은 희망 사항을 정리하는 도표입니다.

![Mel Filterbank 플롯 및 윈도우 파워 스펙트럼](http://practicalcryptography.com/media/miscellaneous/files/mel_filterbank_example.png)Mel Filterbank 플롯 및 윈도우 파워 스펙트럼

\4. 3 단계에서 26 개 에너지 각각의 로그를 가져옵니다. 그러면 26 개의 로그 필터 뱅크 에너지가 남습니다.

\5. 26 개의 로그 필터 뱅크 에너지의 이산 코사인 변환 (DCT)을 취해 26 개의 뇌 혈관을 제공합니다. ASR의 경우 26 개의 계수 중 하위 12-13 만 유지됩니다.

결과 기능 (각 프레임 당 12 개 숫자)을 Mel Frequency Cepstral Coefficients라고합니다.

## Mel 필터 뱅크 계산하기 

이 섹션에서는 예제가 표시하기 쉽기 때문에 10 개의 필터 뱅크를 사용합니다. 실제로 26-40 개의 필터 뱅크를 사용합니다.

그림 1 (a)에 표시된 필터 뱅크를 얻으려면 먼저 낮은 주파수와 높은 주파수를 선택해야합니다. 좋은 값은 낮은 주파수의 경우 300Hz이고 높은 주파수의 경우 8000Hz입니다. 물론 음성이 8000Hz로 샘플링되면 상위 주파수는 4000Hz로 제한됩니다. 그런 다음 다음 단계를 수행하십시오.

1. [방정식 1을](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/#eqn1) 사용 하여 상위 및 하위 주파수를 Mels로 변환하십시오. 우리의 경우 300Hz는 401.25 Mels이고 8000Hz는 2834.99 Mels입니다.

2. 이 예에서는 10 개의 필터 뱅크를 수행하는데 12 포인트가 필요합니다. 이것은 401.25와 2834.99 사이에 선형으로 10 개의 추가 포인트가 필요하다는 것을 의미합니다. 이것은 다음과 같습니다.

   ```
   m (i) = 401.25, 622.50, 843.75, 1065.00, 1286.25, 1507.50, 1728.74, 
          1949.99, 2171.24, 2392.49, 2613.74, 2834.99
   ```

3. 이제 

   방정식 2

    를 사용 하여 이들을 다시 Hertz로 변환하십시오.

   ```
   h (i) = 300, 517.33, 781.90, 1103.97, 1496.04, 1973.32, 2554.33, 
          3261.62, 4122.63, 5170.76, 6446.70, 8000
   ```

   시작점과 끝 점이 원하는 주파수에 있습니다.

4. 위에서 계산 한 정확한 지점에 필터를 배치하는 데 필요한 주파수 분해능이 없으므로 해당 주파수를 가장 가까운 FFT 빈으로 반올림해야합니다. 이 프로세스는 기능의 정확성에 영향을 미치지 않습니다. 주파수를 fft bin 수로 변환하려면 FFT 크기와 샘플 속도를 알아야합니다.

   ```
   f (i) = 바닥 ((nfft + 1) * h (i) / 샘플 레이트)
   ```

   결과는 다음과 같습니다.

   ```
   f (i) = 9, 16, 25, 35, 47, 63, 81, 104, 132, 165, 206, 256
   ```

   최종 필터 뱅크가 bin 256에서 끝나는 것을 볼 수 있는데, 이는 512 포인트 FFT 크기의 8kHz에 해당합니다.

5. 이제 필터 뱅크를 만듭니다. 첫 번째 필터 뱅크는 첫 번째 지점에서 시작하여 두 번째 지점에서 피크에 도달 한 다음 세 번째 지점에서 0으로 돌아갑니다. 두 번째 필터 뱅크는 2 지점에서 시작 계산 4에있을 다음, 3시 등의 수식을 제로의 최대 도달이이 같은 다음되는 것입니다
   ![img](http://practicalcryptography.com/media/latex/9dbdba8524bc6c95d056048f37b0a4ea4194de45-11pt.png)
   어디에 ![img](http://practicalcryptography.com/media/latex/1697b5c24713e54de1923d78f7dddf294f238490-11pt.png)우리가 원하는 필터의 수이며, ![img](http://practicalcryptography.com/media/latex/3846541a4d8c54b4f92280b77f7bddeeebf0a4ae-11pt.png)M +의 목록입니다 2 멜 간격 주파수.

서로 오버레이 된 10 개 필터의 최종 플롯은 다음과 같습니다.

![10 필터 멜 필터 뱅크 플롯](http://practicalcryptography.com/media/miscellaneous/files/10_filt_melfb.png)10 개의 필터가 포함 된 Mel-filterbank. 이 필터 뱅크는 0Hz에서 시작하여 8000Hz에서 끝납니다. 이 안내서는 참고 용이며 위의 예제는 300Hz에서 시작합니다.

## 델타 및 델타 델타 

차동 및 가속 계수라고도합니다. MFCC 특징 벡터는 단일 프레임의 전력 스펙트럼 엔벨로프만을 설명하지만, 음성은 역학에 관한 정보, 즉 시간에 따른 MFCC 계수의 궤적과 같은 정보를 갖는 것처럼 보입니다. MFCC 궤적을 계산하고 원래의 특징 벡터에 추가하면 ASR 성능이 약간 증가합니다 (12 MFCC 계수가있는 경우 12 개의 델타 계수도 얻을 수 있습니다.이 계수는 길이 24의 특징 벡터를 제공하기 위해 결합됩니다) ).

델타 계수를 계산하기 위해 다음 공식이 사용됩니다.

![img](http://practicalcryptography.com/media/latex/542b8743573ec3ff3ddbfd965512d484bc1a1818-11pt.png)

여기서 정적 계수 로 계산 된 ![img](http://practicalcryptography.com/media/latex/0ebc849fb6b661203c93346c162b470565acd724-11pt.png)프레임에서까지의 델타 계수 입니다. 위한 전형적인 값은 2. 델타 델타 (가속) 계수와 동일한 방식으로 계산되며, 그러나 델타 아닌 정적 계수로부터 계산된다.![img](http://practicalcryptography.com/media/latex/dee6308e7a1c17e1311800c9912280deb4d0c2cf-11pt.png)![img](http://practicalcryptography.com/media/latex/0f102270d35423bfa3612c54b1f872703a5f9266-11pt.png)![img](http://practicalcryptography.com/media/latex/2e8c1c5ca3f3ed9fe2aa30ab706375631430fb4c-11pt.png)![img](http://practicalcryptography.com/media/latex/50ec1aff7eaddddda99094b6cc7c602dc3c98245-11pt.png)

## 구현 

파이썬에서 MFCC를 구현했습니다 ( [here)](https://github.com/jameslyons/python_speech_features) . 코드를 얻으려면 페이지 오른쪽의 'ZIP 다운로드'버튼을 사용하십시오. [readthedocs](http://python-speech-features.readthedocs.org/en/latest/) 에서 설명서를 찾을 수 있습니다 . 코드에 대한 문제 나 질문이있는 경우이 페이지 하단에 의견을 남길 수 있습니다.

[여기](http://labrosa.ee.columbia.edu/matlab/rastamat/) 에 MFCC의 좋은 MATLAB 구현이 [있습니다](http://labrosa.ee.columbia.edu/matlab/rastamat/) .

## 참고 문헌 

Davis, S. Mermelstein, P. (1980) *지속적으로 말하는 문장에서 단음절 단어 인식에 대한 파라 메트릭 표현의 비교* . 음향, 음성 및 신호 처리에 관한 IEEE 거래에서, Vol. 28 No. 4, 357-366 쪽

X. Huang, A. Acero 및 H. Hon. *음성 언어 처리 : 이론, 알고리즘 및 시스템 개발에 대한 안내서* . 프렌 티스 홀, 2001.



Intro to TensorFlow Lite : Speech Recognition on Raspberry Pi
https://www.youtube.com/watch?v=8-vl9bNY9aI

