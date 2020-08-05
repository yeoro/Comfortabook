## Tensorflow

#### 2.0 호환성

tf.Session API 삭제-Session 부분은 사라졌다. => @tf.function annotation

```
# TensorFlow 1.X
outputs = session.run(f(placeholder), feed_dict={placeholder: input})
# TensorFlow 2.0
outputs = f(input)
```



tf.placeholder API 삭제 =>@tf.function annotation



ex) 버전1과 2를 비교해보자.

1.x tensorflow

```python
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
```



2.x Tensorflow

```python
W = tf.Variable(tf.ones(shape=(2,2)), name="W")
b = tf.Variable(tf.zeros(shape=(2)), name="b")

@tf.function
def forward(x):
  return W * x + b

out_a = forward([1,0])
print(out_a)
```



그렇다면 기존의 v1은 v2에서 사용 못하나? 그렇지는 않다. v1-> v2로 **마이그레이션** 가이드를 공개했다. 

```python
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
```

v1 형태의 코드를 v2 형태의 코드로 변경하고자 할 때는 기존의 v1 코드에서 tf.placeholder와 tf.Session을 사용하던 부분을 삭제하고 @tf.function으로 대체하면서 전체 코드 구조를 변경한다.

