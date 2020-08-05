#### MFCC(Mel Frequency Cepstral Coefficient)

- 음성인식에서 가장 널리 사용되는 알고리즘이다.



음성 인식 시 가장 필요한 것은 입력된 신호에서 노이즈 및 배경 소리로 부터 실제 유효한 소리의 특징을 추출하는 것이다. MFCC는 바로 소리의 특징을 추출하는 기법인데, 입력된 소리 전체를 대상으로 하는 것이 아니라, 일정 구간(Sort time)식 나누어, 이 구간에 대한 스펙트럼을 분석하여 특징을 추출하는 기법이다. _ 1980



MFCC 이전에는 HMM Classifier를 이용한 Linear Prediction Coefficients(LPC)와 Linear Prediction Cepstral Coefficient(LPCC) 기법이 음성 인식 기법으로 주로 활용되어 왔다.



##### MFCC의 단계

1. 입력 시간 도메인의 소리 신호를 작은 크기 프레임으로 자른다.
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







Intro to TensorFlow Lite : Speech Recognition on Raspberry Pi
https://www.youtube.com/watch?v=8-vl9bNY9aI

