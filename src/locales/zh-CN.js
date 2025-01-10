export default {
  title: '穿衣计算器',
  buttons: {
    showFormula: '显示指南',
    hideFormula: '隐藏指南',
    showReference: '显示参考',
    hideReference: '隐藏参考',
    resetDefault: '重置默认值',
  },
  sections: {
    clothingResistance: '常见衣物热阻',
    activityHeatRate: '常见活动放热率',
    commonActivity: '常见活动放热率',
    moreData: '更多数据',
    selectCalculation: '选择计算项目',
    basicParams: '基础参数',
    calcParams: '计算参数',
    calcResult: '计算结果',
    formula: '使用指南'
  },
  params: {
    conversionFactor: '热阻单位换算系数',
    basicThermalResistance: '人体基础热阻 (clo)',
    evaporativeHeatRate: '非蒸发放热率 (W/m²)',
    skinTemp: '皮肤温度 (°C)',
    envTemp: '环境温度 (°C)',
    clothingResistance: '服装热阻 (clo)',
    defaultValue: '默认值: ',
    tooltips: {
      conversionFactor: '用于将热阻单位从 m²·K/W 转换为 clo 的系数，1 clo = 0.155 m²·K/W',
      basicThermalResistance: '人体皮肤、脂肪层等提供的基础保温能力，通常为 0.78 clo',
      evaporativeHeatRate: '人体通过辐射、对流等方式散发的热量，不包括出汗蒸发散热',
      skinTemp: '人体皮肤表面温度，正常情况约为 33-34°C',
      envTemp: '周围环境的温度，可以是室内或室外温度',
      clothingResistance: '衣物提供的保温能力，单位为 clo，数值越大保暖性越好'
    }
  },
  calculations: {
    clothingResistance: '服装热阻 (I)',
    basicThermalResistance: '人体基础热阻 (Ia)',
    envTemp: '环境温度 (Ta)',
    skinTemp: '皮肤温度 (Ts)',
    heatRate: '单位体表面积非蒸发放热率 (H)'
  },
  clothing: {
    shortSleeve: '短袖T恤',
    longSleeve: '长袖衬衫',
    thinSweater: '薄毛衣',
    thickSweater: '厚毛衣',
    lightJacket: '轻薄夹克',
    thickJacket: '厚夹克',
    downJacket: '羽绒服',
    suit: '西装外套',
    winterCoat: '防寒服',
    workClothes: '工作服'
  },
  activities: {
    sitting: '静坐、休息',
    standing: '站立放松',
    lightOffice: '轻度办公',
    slowWalk: '缓慢行走 (3km/h)',
    normalWalk: '一般步行 (4-5km/h)',
    fastWalk: '快速步行',
    lightLabor: '轻体力劳动',
    mediumLabor: '中等体力劳动',
    heavyLabor: '重体力劳动'
  },
  formula: {
    totalResistance: '服装总热阻(It)',
    clothingResistance: '服装热阻(I)',
    parameters: '参数说明：',
    reference: '参考标准：',
    warning: '注意：当前输入参数可能不合理，请检查温度和热阻值',
    description: '本计算器可以帮助您科学地计算在不同温度环境下所需的保暖装备',
    guide: '基础使用指南：',
    step1: '1. 根据日常活动习惯，选择合适的活动放热率',
    step2: '2. 利用放热率计算所需衣物的克罗值，据此选购合适的衣物',
    disclaimer: '注意事项：本计算器采用简化计算方式，主要适用于一般城市环境。所有数据仅供参考，在极端环境下（如高湿度、大风、无人区等）需要更精确的计算方法。',
    moreInfo: '更多专业信息请参考：',
    moreInfoLink: 'Standard 55 – Thermal Environmental Conditions for Human Occupancy'
  }
} 