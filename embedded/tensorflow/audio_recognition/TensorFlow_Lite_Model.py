# TF Model -> TFLite Converter -> TFLite Model
# 라즈베리파이에 위의 전부를 넣는 것이 아니라 TFLite Model만 넣어주면된다.
# 오디오 캡처를 위해 Raspberry Pi에 마이크를 추가한다.
from tensorflow import lite
from tensorflow.keras import models

# Parameters
keras_model_filename = 'wake_word_stop_model.h5'
tflite_filename = 'wake_word_stop_lite.tflite'

# Convert model to TF KLite model
model = models.load_model(keras_model_filename)
converter = lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
open(tflite_filename, 'wb').write(tflite_model)