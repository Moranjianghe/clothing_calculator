export default {
  title: '穿衣計算器',
  buttons: {
    showFormula: '顯示指南',
    hideFormula: '隱藏指南',
    showReference: '顯示參考',
    hideReference: '隱藏參考',
    resetDefault: '重置預設值',
  },
  sections: {
    clothingResistance: '常見衣物熱阻',
    activityHeatRate: '常見活動放熱率',
    commonActivity: '常見活動放熱率',
    moreData: '更多數據',
    selectCalculation: '選擇計算項目',
    basicParams: '基礎參數',
    calcParams: '計算參數',
    calcResult: '計算結果',
    formula: '使用指南'
  },
  params: {
    conversionFactor: '熱阻單位換算係數',
    basicThermalResistance: '人體基礎熱阻 (clo)',
    evaporativeHeatRate: '非蒸發放熱率 (W/m²)',
    skinTemp: '皮膚溫度 (°C)',
    envTemp: '環境溫度 (°C)',
    clothingResistance: '服裝熱阻 (clo)',
    defaultValue: '預設值: ',
    tooltips: {
      conversionFactor: '用於將熱阻單位從 m²·K/W 轉換為 clo 的係數，1 clo = 0.155 m²·K/W',
      basicThermalResistance: '人體皮膚、脂肪層等提供的基礎保溫能力，通常為 0.78 clo',
      evaporativeHeatRate: '人體通過輻射、對流等方式散發的熱量，不包括出汗蒸發散熱',
      skinTemp: '人體皮膚表面溫度，正常情況約為 33-34°C',
      envTemp: '周圍環境的溫度，可以是室內或室外溫度',
      clothingResistance: '衣物提供的保溫能力，單位為 clo，數值越大保暖性越好'
    }
  },
  calculations: {
    clothingResistance: '服裝熱阻 (I)',
    basicThermalResistance: '人體基礎熱阻 (Ia)',
    envTemp: '環境溫度 (Ta)',
    skinTemp: '皮膚溫度 (Ts)',
    heatRate: '單位體表面積非蒸發放熱率 (H)'
  },
  clothing: {
    shortSleeve: '短袖T恤',
    longSleeve: '長袖襯衫',
    thinSweater: '薄毛衣',
    thickSweater: '厚毛衣',
    lightJacket: '輕薄夾克',
    thickJacket: '厚夾克',
    downJacket: '羽絨服',
    suit: '西裝外套',
    winterCoat: '防寒服',
    workClothes: '工作服'
  },
  activities: {
    sitting: '靜坐、休息',
    standing: '站立放鬆',
    lightOffice: '輕度辦公',
    slowWalk: '緩慢行走 (3km/h)',
    normalWalk: '一般步行 (4-5km/h)',
    fastWalk: '快速步行',
    lightLabor: '輕體力勞動',
    mediumLabor: '中等體力勞動',
    heavyLabor: '重體力勞動'
  },
  formula: {
    totalResistance: '服裝總熱阻(It)',
    clothingResistance: '服裝熱阻(I)',
    parameters: '參數說明：',
    reference: '參考標準：',
    warning: '注意：當前輸入參數可能不合理，請檢查溫度和熱阻值',
    description: '本計算器可以幫助您科學地計算在不同溫度環境下所需的保暖裝備',
    guide: '基礎使用指南：',
    step1: '1. 根據日常活動習慣，選擇合適的活動放熱率',
    step2: '2. 利用放熱率計算所需衣物的克羅值，據此選購合適的衣物',
    disclaimer: '注意事項：本計算器採用簡化計算方式，主要適用於一般城市環境。所有數據僅供參考，在極端環境下（如高濕度、大風、無人區等）需要更精確的計算方法。',
    moreInfo: '更多專業資訊請參考：',
    moreInfoLink: 'Standard 55 – Thermal Environmental Conditions for Human Occupancy'
  }
} 