<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 获取浏览器语言并设置初始语言
const getBrowserLanguage = () => {
  // 先从本地存储中获取
  const savedLocale = localStorage.getItem('preferredLocale')
  if (savedLocale) {
    return savedLocale
  }
  
  const lang = navigator.language || navigator.userLanguage
  if (lang.startsWith('zh')) {
    // 检查是否为繁体中文地区
    if (['zh-TW', 'zh-HK', 'zh-MO'].includes(lang)) {
      return 'zh-TW'
    }
    // 其他中文默认使用简体中文
    return 'zh-CN'
  }
  // 其他语言默认使用英文
  return 'en'
}

// 设置初始语言
locale.value = getBrowserLanguage()

// 监听语言变化，保存到本地存储
watch(locale, (newLocale) => {
  localStorage.setItem('preferredLocale', newLocale)
})

// 保存上次的计算配置
const saveLastConfig = () => {
  const config = {
    H: H.value,
    Ts: Ts.value,
    Ta: Ta.value,
    conversionFactor: conversionFactor.value,
    basicThermalResistance: basicThermalResistance.value,
    clothingResistance: clothingResistance.value,
    inputI: inputI.value,
    selectedCalculation: selectedCalculation.value
  }
  localStorage.setItem('lastConfig', JSON.stringify(config))
}

// 加载上次的配置
const loadLastConfig = () => {
  const savedConfig = localStorage.getItem('lastConfig')
  if (savedConfig) {
    const config = JSON.parse(savedConfig)
    H.value = config.H
    Ts.value = config.Ts
    Ta.value = config.Ta
    conversionFactor.value = config.conversionFactor
    basicThermalResistance.value = config.basicThermalResistance
    clothingResistance.value = config.clothingResistance
    inputI.value = config.inputI
    selectedCalculation.value = config.selectedCalculation
  }
}

// 在值变化时保存配置
watch([H, Ts, Ta, conversionFactor, basicThermalResistance, clothingResistance, inputI, selectedCalculation], () => {
  saveLastConfig()
})

// 组件挂载后加载配置
onMounted(() => {
  loadLastConfig()
})

// 语言选项
const languages = [
  { code: 'en', name: 'English', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg' },
  { code: 'zh-CN', name: '简体中文', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg' },
  { code: 'zh-TW', name: '繁體中文', flag: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg' }
]

// 默认值常量
const DEFAULT_VALUES = {
  H: 58.1,
  Ts: 33.3,
  Ta: -20,
  conversionFactor: 0.155,
  basicThermalResistance: 0.78,
  clothingResistance: 0,
  inputI: 0
}

const H = ref(DEFAULT_VALUES.H)  // 单位体表面积的非蒸发放热率
const Ts = ref(DEFAULT_VALUES.Ts) // 皮肤温度
const Ta = ref(DEFAULT_VALUES.Ta)  // 环境温度
const conversionFactor = ref(DEFAULT_VALUES.conversionFactor) // 热阻单位换算系数
const basicThermalResistance = ref(DEFAULT_VALUES.basicThermalResistance) // 人体基础热阻
const clothingResistance = ref(DEFAULT_VALUES.clothingResistance) // 服装热阻
const inputI = ref(DEFAULT_VALUES.inputI) // 输入的服装热阻值

// 重置所有值到默认值
const resetToDefault = () => {
  H.value = DEFAULT_VALUES.H
  Ts.value = DEFAULT_VALUES.Ts
  Ta.value = DEFAULT_VALUES.Ta
  conversionFactor.value = DEFAULT_VALUES.conversionFactor
  basicThermalResistance.value = DEFAULT_VALUES.basicThermalResistance
  clothingResistance.value = DEFAULT_VALUES.clothingResistance
  inputI.value = DEFAULT_VALUES.inputI
}

const selectedCalculation = ref('I') // 默认计算服装热阻

// 常见衣物热阻数据
const commonClothingData = [
  { key: 'shortSleeve', value: 0.08 },
  { key: 'longSleeve', value: 0.25 },
  { key: 'thinSweater', value: 0.28 },
  { key: 'thickSweater', value: 0.35 },
  { key: 'lightJacket', value: 0.25 },
  { key: 'thickJacket', value: 0.55 },
  { key: 'downJacket', value: 0.55 },
  { key: 'suit', value: 0.35 },
  { key: 'winterCoat', value: 0.60 },
  { key: 'workClothes', value: 0.30 },
]

// 常见活动放热率数据
const commonActivityData = [
  { key: 'sitting', value: 58 },
  { key: 'standing', value: 70 },
  { key: 'lightOffice', value: 93 },
  { key: 'slowWalk', value: 115 },
  { key: 'normalWalk', value: 140 },
  { key: 'fastWalk', value: 200 },
  { key: 'lightLabor', value: 165 },
  { key: 'mediumLabor', value: 230 },
  { key: 'heavyLabor', value: 290 },
]

// 显示参考数据面板
const showReferenceData = ref(window.innerWidth >= 1024)

// 快速填充数据方法
const fillActivityValue = (value) => {
  H.value = value
}

const fillClothingValue = (value) => {
  if (selectedCalculation.value === 'Ia') {
    clothingResistance.value = value
  } else if (selectedCalculation.value === 'I') {
    // 当计算服装热阻时不填充
    return
  } else {
    inputI.value = value
  }
}

const I = computed(() => {
  if (selectedCalculation.value !== 'I') return inputI.value
  return ((Ts.value - Ta.value) / (conversionFactor.value * H.value)) - basicThermalResistance.value
})

const calculatedTa = computed(() => {
  if (selectedCalculation.value !== 'Ta') return null
  return Ts.value - (conversionFactor.value * H.value * (Number(inputI.value) + basicThermalResistance.value))
})

const calculatedTs = computed(() => {
  if (selectedCalculation.value !== 'Ts') return null
  return Ta.value + (conversionFactor.value * H.value * (Number(inputI.value) + basicThermalResistance.value))
})

const calculatedH = computed(() => {
  if (selectedCalculation.value !== 'H') return null
  const totalResistance = Number(inputI.value) + basicThermalResistance.value
  if (totalResistance === 0) return null // 防止除以零
  return Math.abs((Ts.value - Ta.value) / (conversionFactor.value * totalResistance))
})

const calculatedIa = computed(() => {
  if (selectedCalculation.value !== 'Ia') return null
  return ((Ts.value - Ta.value) / (conversionFactor.value * H.value)) - clothingResistance.value
})

// 显示/隐藏公式说明
const showFormula = ref(window.innerWidth >= 1024)

// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    showReferenceData.value = true
    showFormula.value = true
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl md:text-2xl font-bold text-gray-800">{{ t('title') }}</h1>
          <div class="flex items-center space-x-4">
            <div class="relative group">
              <div class="flex items-center space-x-1 cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                <img 
                  :src="languages.find(l => l.code === locale)?.flag" 
                  :alt="languages.find(l => l.code === locale)?.name"
                  class="w-5 h-4 object-cover"
                />
                <select v-model="locale" 
                        class="appearance-none bg-transparent border-none focus:ring-0 cursor-pointer pl-1 pr-6">
                  <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                    <img :src="lang.flag" :alt="lang.name" class="w-5 h-4 inline-block mr-1" />
                    {{ lang.name }}
                  </option>
                </select>
                <span class="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <div class="absolute top-full right-0 mt-1 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Language / 语言 / 語言
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="showFormula = !showFormula"
                      class="text-sm px-3 py-1.5 rounded-lg transition-colors"
                      :class="showFormula ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
                {{ showFormula ? t('buttons.hideFormula') : t('buttons.showFormula') }}
              </button>
              <button @click="showReferenceData = !showReferenceData"
                      class="text-sm px-3 py-1.5 rounded-lg transition-colors"
                      :class="showReferenceData ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
                {{ showReferenceData ? t('buttons.hideReference') : t('buttons.showReference') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid lg:grid-cols-12 gap-6">
        <!-- 左侧边栏：参考数据 -->
        <div v-show="showReferenceData" 
             class="lg:col-span-3 space-y-6 transition-all duration-300"
             :class="{'hidden lg:block': !showReferenceData}">
          <!-- 常见衣物热阻 -->
          <div class="bg-white rounded-xl shadow-sm p-4">
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-bold text-gray-800">{{ t('sections.clothingResistance') }}</h3>
              <a href="https://www.researchgate.net/publication/282954979_A_database_of_static_clothing_thermal_insulation_and_vapor_permeability_values_of_non-Western_ensembles_for_use_in_ASHRAE_Standard_55_ISO_7730_and_ISO_9920" 
                 target="_blank" 
                 class="text-xs text-blue-600 hover:text-blue-800">
                更多数据 →
              </a>
            </div>
            <div class="space-y-2">
              <button v-for="item in commonClothingData" 
                      :key="item.key"
                      @click="fillClothingValue(item.value)"
                      class="w-full text-left text-sm p-2 rounded border hover:bg-blue-50 transition-colors">
                <span class="font-medium">{{ t(`clothing.${item.key}`) }}</span>
                <span class="float-right text-gray-600">{{ item.value }} clo</span>
              </button>
            </div>
          </div>

          <!-- 常见活动放热率 -->
          <div class="bg-white rounded-xl shadow-sm p-4">
            <h3 class="font-bold text-gray-800 mb-3">{{ t('sections.commonActivity') }}</h3>
            <div class="space-y-2">
              <button v-for="item in commonActivityData" 
                      :key="item.key"
                      @click="fillActivityValue(item.value)"
                      class="w-full text-left text-sm p-2 rounded border hover:bg-blue-50 transition-colors">
                <span class="font-medium">{{ t(`activities.${item.key}`) }}</span>
                <span class="float-right text-gray-600">{{ item.value }} W/m²</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 中间主要区域：计算器 -->
        <div :class="{'lg:col-span-12': !showReferenceData, 'lg:col-span-6': showReferenceData}"
             class="space-y-6">
          <!-- 计算类型选择 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-bold text-gray-800">{{ t('sections.selectCalculation') }}</h2>
              <button @click="resetToDefault"
                      class="text-sm px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                {{ t('buttons.resetDefault') }}
              </button>
            </div>
            <select v-model="selectedCalculation" 
                    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="I">{{ t('calculations.clothingResistance') }}</option>
              <option value="Ia">{{ t('calculations.basicThermalResistance') }}</option>
              <option value="Ta">{{ t('calculations.envTemp') }}</option>
              <option value="Ts">{{ t('calculations.skinTemp') }}</option>
              <option value="H">{{ t('calculations.heatRate') }}</option>
            </select>
          </div>

          <!-- 基础参数设置 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-4">{{ t('sections.basicParams') }}</h2>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <label class="text-sm font-medium text-gray-700 group relative">
                      {{ t('params.conversionFactor') }}
                      <span class="ml-1 text-gray-400 cursor-help">?</span>
                      <div class="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-64 z-10">
                        {{ t('params.tooltips.conversionFactor') }}
                      </div>
                    </label>
                    <button @click="conversionFactor = DEFAULT_VALUES.conversionFactor"
                            class="text-xs text-blue-600 hover:text-blue-800">
                      {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.conversionFactor }}
                    </button>
                  </div>
                  <input type="number" v-model="conversionFactor" step="0.001"
                         class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                </div>
                <div v-if="selectedCalculation !== 'Ia'" class="space-y-2">
                  <div class="flex justify-between">
                    <label class="text-sm font-medium text-gray-700">{{ t('params.basicThermalResistance') }}</label>
                    <button @click="basicThermalResistance = DEFAULT_VALUES.basicThermalResistance"
                            class="text-xs text-blue-600 hover:text-blue-800">
                      {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.basicThermalResistance }}
                    </button>
                  </div>
                  <input type="number" v-model="basicThermalResistance" step="0.01"
                         class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                </div>
              </div>
            </div>
          </div>

          <!-- 计算参数输入 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-4">{{ t('sections.calcParams') }}</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-if="selectedCalculation !== 'H'" class="space-y-2">
                <div class="flex justify-between">
                  <label class="text-sm font-medium text-gray-700">{{ t('params.evaporativeHeatRate') }}</label>
                  <button @click="H = DEFAULT_VALUES.H"
                          class="text-xs text-blue-600 hover:text-blue-800">
                    {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.H }}
                  </button>
                </div>
                <input type="number" v-model="H" 
                       class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              </div>

              <div v-if="selectedCalculation !== 'Ts'" class="space-y-2">
                <div class="flex justify-between">
                  <label class="text-sm font-medium text-gray-700">{{ t('params.skinTemp') }}</label>
                  <button @click="Ts = DEFAULT_VALUES.Ts"
                          class="text-xs text-blue-600 hover:text-blue-800">
                    {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.Ts }}
                  </button>
                </div>
                <input type="number" v-model="Ts" 
                       class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              </div>

              <div v-if="selectedCalculation !== 'Ta'" class="space-y-2">
                <div class="flex justify-between">
                  <label class="text-sm font-medium text-gray-700">{{ t('params.envTemp') }}</label>
                  <button @click="Ta = DEFAULT_VALUES.Ta"
                          class="text-xs text-blue-600 hover:text-blue-800">
                    {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.Ta }}
                  </button>
                </div>
                <input type="number" v-model="Ta" 
                       class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              </div>

              <div v-if="selectedCalculation === 'Ia'" class="space-y-2">
                <div class="flex justify-between">
                  <label class="text-sm font-medium text-gray-700">{{ t('params.clothingResistance') }}</label>
                  <button @click="clothingResistance = DEFAULT_VALUES.clothingResistance"
                          class="text-xs text-blue-600 hover:text-blue-800">
                    {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.clothingResistance }}
                  </button>
                </div>
                <input type="number" v-model="clothingResistance" 
                       class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              </div>

              <div v-if="selectedCalculation !== 'I' && selectedCalculation !== 'Ia'" class="space-y-2">
                <div class="flex justify-between">
                  <label class="text-sm font-medium text-gray-700">{{ t('params.clothingResistance') }}</label>
                  <button @click="inputI = DEFAULT_VALUES.inputI"
                          class="text-xs text-blue-600 hover:text-blue-800">
                    {{ t('params.defaultValue') }}{{ DEFAULT_VALUES.inputI }}
                  </button>
                </div>
                <input type="number" v-model="inputI" 
                       class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              </div>
            </div>
          </div>

          <!-- 计算结果 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-4">{{ t('sections.calcResult') }}</h2>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <p v-if="selectedCalculation === 'I' && I !== null" class="text-xl text-blue-700">
                {{ t('calculations.clothingResistance') }} = <span class="font-bold">{{ I.toFixed(2) }}</span> clo
              </p>
              <p v-if="selectedCalculation === 'Ia' && calculatedIa !== null" class="text-xl text-blue-700">
                {{ t('calculations.basicThermalResistance') }} = <span class="font-bold">{{ calculatedIa.toFixed(2) }}</span> clo
              </p>
              <p v-if="selectedCalculation === 'Ta' && calculatedTa !== null" class="text-xl text-blue-700">
                {{ t('calculations.envTemp') }} = <span class="font-bold">{{ calculatedTa.toFixed(2) }}</span> °C
              </p>
              <p v-if="selectedCalculation === 'Ts' && calculatedTs !== null" class="text-xl text-blue-700">
                {{ t('calculations.skinTemp') }} = <span class="font-bold">{{ calculatedTs.toFixed(2) }}</span> °C
              </p>
              <p v-if="selectedCalculation === 'H' && calculatedH !== null" class="text-xl text-blue-700">
                {{ t('calculations.heatRate') }} = <span class="font-bold">{{ calculatedH.toFixed(2) }}</span> W/m²
                <span v-if="calculatedH < 0" class="block text-sm text-red-500 mt-2">
                  {{ t('formula.warning') }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- 右侧边栏：公式说明 -->
        <div v-show="showFormula" 
             class="lg:col-span-3 space-y-6 transition-all duration-300"
             :class="{'hidden lg:block': !showFormula}">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h3 class="font-bold text-gray-800 mb-4">{{ t('sections.formula') }}</h3>
            <div class="space-y-4 text-sm">
              <div class="p-3 bg-blue-50 rounded-lg">
                <p class="text-gray-700">{{ t('formula.description') }}</p>
              </div>
              
              <div class="mt-4">
                <p class="font-medium text-gray-800">{{ t('formula.guide') }}</p>
                <ul class="mt-2 space-y-2 text-gray-600">
                  <li>{{ t('formula.step1') }}</li>
                  <li>{{ t('formula.step2') }}</li>
                </ul>
              </div>

              <div class="p-3 bg-blue-50 rounded-lg">
                <p class="font-medium text-blue-700">{{ t('formula.totalResistance') }}</p>
                <p class="mt-1">It = (Ts - Ta)/(0.155 × H)</p>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <p class="font-medium text-blue-700">{{ t('formula.clothingResistance') }}</p>
                <p class="mt-1">I = It - Ia</p>
              </div>
              <div class="mt-4">
                <p class="font-medium mb-2">{{ t('formula.parameters') }}</p>
                <ul class="space-y-2 text-gray-600">
                  <li>• Ts：{{ t('params.skinTemp') }}</li>
                  <li>• Ta：{{ t('params.envTemp') }}</li>
                  <li>• H：{{ t('params.evaporativeHeatRate') }}</li>
                  <li>• 0.155：{{ t('params.conversionFactor') }}</li>
                  <li>• Ia：{{ t('params.basicThermalResistance') }}</li>
                  <li>• I：{{ t('params.clothingResistance') }}</li>
                </ul>
              </div>
              <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p class="text-gray-700">{{ t('formula.disclaimer') }}</p>
              </div>
              <div class="mt-4 text-xs text-gray-500">
                <p>{{ t('formula.moreInfo') }}
                  <a href="https://www.ashrae.org/technical-resources/bookstore/standard-55-thermal-environmental-conditions-for-human-occupancy" 
                     target="_blank" 
                     class="text-blue-600 hover:text-blue-800">
                    {{ t('formula.moreInfoLink') }}
                  </a>
                </p>
                <p class="mt-2">{{ t('formula.reference') }}
                  <a href="https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=F6C078D53F49F178707304E759AAF568" 
                     target="_blank" 
                     class="text-blue-600 hover:text-blue-800">
                    GB/T 18398-2001
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 添加平滑过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* 确保输入框在暗模式下背景为白色 */
input[type="number"], select {
  background-color: white !important;
}

/* 移除输入框的上下箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* 添加阴影过渡效果 */
.shadow-sm {
  transition: box-shadow 0.2s ease-in-out;
}
.shadow-sm:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
