# 定义变量值
H =  58.1 # 单位体表面积的非蒸发放热率，单位为瓦每平方米（W/m²）
Ts = 33.3  # 皮肤温度，单位为摄氏度（°C）
Ta = -20 # 环境温度，单位为摄氏度（°C）
conversion_factor = 0.155  # 热阻单位换算系数
basic_thermal_resistance = 0.78 # 人体基础热阻

# 计算热阻I
I = (Ts - Ta) / (conversion_factor * H)-basic_thermal_resistance

# 输出结果
print(f"服装热阻 I 的值为 {I} clo")