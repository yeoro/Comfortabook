import tensorflow as tf
import numpy as np

a = tf.constant([[1, 2],
                 [3, 4]])
print(a)
b = tf.add(a, 1)
print(b)
print(a * b)

c = np.multiply(a, b)
print(c)

print(a.numpy())

def fizzbuzz(max_num):
  counter = tf.constant(0)
  max_num = tf.convert_to_tensor(max_num)
  for num in range(1, max_num.numpy()+1):
    num = tf.constant(num)
    if int(num % 3) == 0 and int(num % 5) == 0:
      print('FizzBuzz')
    elif int(num % 3) == 0:
      print('Fizz')
    elif int(num % 5) == 0:
      print('Buzz')
    else:
      print(num.numpy())
    counter += 1