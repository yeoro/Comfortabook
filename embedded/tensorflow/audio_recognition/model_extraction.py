#!/usr/bin/env python
# coding: utf-8

# In[1]:


from os import listdir
from os.path import isdir, join
import librosa
import random
import numpy as np
import matplotlib.pyplot as plt
import python_speech_features


# In[2]:


#dataset path adn view passible targets
dataset_path = 'C:\\Users\\multicampus\\Desktop\\data_speech_commands_v0.02.tar\\data_speech_commands_v0.02'
for name in listdir(dataset_path):
    if isdir(join(dataset_path, name)):
        print(name)


# In[3]:


# Create on all targets List
all_targets = [name for name in listdir(dataset_path) if isdir(join(dataset_path, name))]
print(all_targets)
print(dataset_path)
print(listdir(dataset_path))
print(join(dataset_path, name))


# In[4]:


# Leave off background noise set
all_targets.remove('_background_noise_')
print(all_targets)


# In[5]:


# See how many files are in each
num_samples = 0
for target in all_targets:
    print(len(listdir(join(dataset_path, target))))
    num_samples += len(listdir(join(dataset_path, target)))
print('Total samples:', num_samples)


# In[6]:


### Settings
target_list = all_targets
# npz 파일에 저장할 이미지
feature_sets_file = 'all_targets_mfcc_sets.npz'
# 기능 추출 시 오래걸리니 양을 줄인다.
# 임의의 데이터 하위집합 10%
perc_keep_samples = 0.1
# 제대로 작동하는지 확인하는 것
# 교차 유효성 검사에 대한 데이터 10%
val_ratio = 0.1
# 테스트 데이터 10%
test_ratio = 0.1
# wav 파일이 16KHz sampling으로 기록되는 동안인 1분에 더빨리 기록되게한다
# 8KHz와 같이 낮은 sampling 속도로 악취 횟수를 설정
sample_rate = 8000
# 중격계수는 16
num_mfcc = 16
# MFCC 길이는 16
len_mfcc = 16


# In[7]:


# mfcc가 1분 동안 좋은 기능을 만들지 계속 생각해보자.
# Create List of filenames along with ground truth vector (y)
# 배열 만들기
filenames = []
y = []
for index, target in enumerate(target_list):
    print(join(dataset_path, target))
    filenames.append(listdir(join(dataset_path, target)))
    y.append(np.ones(len(filenames[index])) * index)


# In[8]:


# Check ground truth y vector
print(y)
for item in y:
    print(len(item))


# In[9]:


# Flatten filename and y vectors
filenames = [item for sublist in filenames for item in sublist]
y = [item for sublist in y for item in sublist]


# In[10]:


# Associate filenames with true output and shuffle
filenames_y = list(zip(filenames, y))
random.shuffle(filenames_y)
filenames, y = zip(*filenames_y)


# In[11]:


# Only keep the specified number of samples (shorter extraction/training)
# 우리는 프로토 타입 모델 중 총 10%만 사용할 것이다.
# 여기서 중요한 것은 다시 돌아와서 모든 데이터를 사용하는 것이다.
print(len(filenames))
filenames = filenames[:int(len(filenames) * perc_keep_samples)]
print(len(filenames))


# In[12]:


# Calculate validation and test set sizes
# 모델을 교육 할 준비가 끝났다.
# 두 개의 개별 검증 테스트에서 파일 이름 목록 및 근거정보 목록을 wav 파일에서 function을 추출 할 준비가 됐다
val_set_size = int(len(filenames) * val_ratio)
test_set_size = int(len(filenames) * test_ratio)


# In[13]:


# Break dataset apart into train, validation, and test sets
filenames_val = filenames[:val_set_size]
filenames_test = filenames[val_set_size:(val_set_size + test_set_size)]
filenames_train = filenames[(val_set_size + test_set_size):]


# In[14]:


# Break y apart into train, validation, and test sets
y_orig_val = y[:val_set_size]
y_orig_test = y[val_set_size:(val_set_size + test_set_size)]
y_orig_train = y[(val_set_size + test_set_size):]


# In[15]:


# Function: Create MFCC from given path
def calc_mfcc(path):
    
    #Load wavdfile
    # 초당 8000개의 샘플로 리샘플링 하는 Librosa를 사용하여 주어진 경로에서
    # wav파일을 빠르게 로드하자
    signal, fs = librosa.load(path, sr=sample_rate)
    
    # Create MFCCs from sound clip
    # MFCC 기능을 제공하는 python_speech_features를 사용하자
    # 기능들을 이용하여 해당 파형에서 MFCC 세트를 만들자 
    # 매개변수를 사용하여 MFCC set 수를 유지한다.
    # winlen은 25ms 에서 256ms 로 넓히자
    # winstep은 50ms 늘렸다
    # nFFT에 사용할 샘플 수는 window 크기에 따라 다르다.
    
    mfccs = python_speech_features.base.mfcc(signal,
                                            samplerate=fs,
                                            winlen=0.256,
                                            winstep=0.050,
                                            numcep=num_mfcc,
                                            nfilt=26,
                                            nfft=2048,
                                            preemph=0.0,
                                            ceplifter=0,
                                            appendEnergy=False,
                                            winfunc=np.hanning)
    return mfccs.transpose()


# In[16]:


# signal - 특징을 계산할 오디오 신호, N*1 배열이어야 한다
# simplerate - 우리가 작업하고 있는 신호의 샘플링 속도
# winlen - 분석 창의 길이의 기본값은 0.025초이다
# winstep - 몇 초 안에 연속적인 윈도우 사이의 step. 기본값은 0.01초
# numcep - 반환되는 cepstrum 수, 기본값이 13
# nfilt - filterbank안의 filter의 수. 디폴트는 26
# nfft - FFT 사이즈. 디폴트는 512
# lowfreq - mel filters의 가장 낮은 band edge. 기본 Hz는 0
# highfreq - mel filters의 가장 높 band edge. 기본 Hz는 samplerate/2
# preemph - apply preemphasis filter with preemph as coefficient. 0 is no filter. Default is 0.97
# ceplifter -apply a lifter to final cepstral coefficients. 0 is no lifter. Default is 22
# appendEnergy - if this is true, the zeroth cepstral coefficient is replaced with the log of the total frame energy.
# returns - A numpy array of size (NUMFRAMES by numcep) containing features. Each row holds 1 feature vector.


# In[17]:


# 처음에는 500개의 훈련 세트를 가져오자
# m 개의 FCC 매트릭스의 모양 각 오디오 파일을 16세트의 16세트를 생성해야한다.
# TEST: Construct test set by computing MFCC of each WAV file
prob_cnt = 0
x_test = []
y_test = []
for index, filename in enumerate(filenames_train):
    # Stop after 500
    if index >= 500:
        break
        
    # Create path from given filename and target item
    path = join(dataset_path, target_list[int(y_orig_train[index])],
               filename)
    
    # Create MFCCs
    mfccs = calc_mfcc(path)
    
    if mfccs.shape[1] == len_mfcc:
        x_test.append(mfccs)
        y_test.append(y_orig_train[index])
    else:
        print('Dropped:', index, mfccs.shape)
        prob_cnt += 1


# In[18]:


# 오디오 파일 중 손상(?) 된 것들의 갯수에 500을 나누면 1초도 안걸린다? 
print('% of problematic samples:', prob_cnt / 500)


# In[19]:


# 0.08이니 샘플의 손상간 부분은 약 10% 라는 결론이 나온다.
# 이중 몇개는 재생 사운드 라이브러리를 사용하여 단어를 여러개 테스트 하고 오디오 샘플의 MFCC와 결과 이미지를 보인다.
# 잘 들이거나 안들리는 것도 여러개 있다.
# TEST: Test shorter MFCC
# !pip install playsound
from playsound import playsound

idx = 10

# Create path from given filename and target item
path = join(dataset_path, target_list[int(y_orig_train[idx])],
           filenames_train[idx])

# Create MFCCs
mfccs = calc_mfcc(path)
print("MFCCs:", mfccs)

# Plot MFCC
fig = plt.figure()
plt.imshow(mfccs, cmap='inferno', origin='lower')

# TEST: play problem sounds
print(target_list[int(y_orig_train[idx])])
playsound(path)


# In[20]:


# 파일이 점으로 끝나는지 확인하는 함수
# 웨이브는 길이가 충분하지 않은 경우 Y벡터의 샘플 및 해당 레이블을 MFCC로 계산한다.
# function: Create MFCCs, keeping only ones of desired length
def extract_features(in_files, in_y):
    prob_cnt = 0
    out_x = []
    out_y = []
    
    for index, filename in enumerate(in_files):
        
        # Create path from given filename and target item
        path = join(dataset_path, target_list[int(in_y[index])],
                   filename)
        
        # Check to make sure we're reading a .wav file
        if not path.endswith('.wav'):
            continue
            
        # Create MFCCs
        mfccs = calc_mfcc(path)
        
        # Only keep MFCCs with given length
        if mfccs.shape[1] == len_mfcc:
            out_x.append(mfccs)
            out_y.append(in_y[index])
        else:
            print('Dropped:', index, mfccs.shape)
            prob_cnt += 1
            
    return out_x, out_y, prob_cnt


# In[21]:


# 교육 검증에서 테스트 세트를 활용해 해당 기능을 실행한다
# Create train, valudation, and test sets
x_train, y_train, prob = extract_features(filenames_train,
                                          y_orig_train)
print('Removed percentage:', prob / len(y_orig_train))
x_val, y_val, prob = extract_features(filenames_val, y_orig_val)
print('Removed percentage:', prob / len(y_orig_val))
x_test, y_test, prob = extract_features(filenames_test, y_orig_test)
print('Removed percentage:', prob / len(y_orig_test))


# In[23]:


# 위의 결과는 simple중에 약 10프로 정도 제거 된 것을 알 수 있다.
# 마지막으로 numpy save Z 함수를 사용하여 이러한 대규모 배열을 NP에 저장한다.
np.savez(feature_sets_file,
        x_train=x_train,
        y_train=y_train,
        x_val=x_val,
        y_val=y_val,
        x_test=x_test,
        y_test=y_test)


# In[25]:


# TEST: Load features
# numpy dot load라고 부르고 우리가 할 수 있는 파일의 위치를 알려준다.
# 사용 가능한 배열을 나열하고 각 배열의 샘플 수 를 확인하자
feature_sets = np.load(feature_sets_file)
feature_sets.files


# In[26]:


len(feature_sets['x_train'])


# In[27]:


# y 유효성 섬사 세트를 인쇄 하여 우리가 가진 모든 레이블을 볼 수 있다.
print(feature_sets['y_val'])


# In[ ]:




