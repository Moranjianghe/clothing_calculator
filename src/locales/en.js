export default {
  title: 'Clothing Calculator',
  buttons: {
    showFormula: 'Show Guide',
    hideFormula: 'Hide Guide',
    showReference: 'Show Reference',
    hideReference: 'Hide Reference',
    resetDefault: 'Reset to Default',
  },
  sections: {
    clothingResistance: 'Common Clothing Resistance',
    activityHeatRate: 'Common Activity Heat Rate',
    commonActivity: 'Common Activity Heat Rate',
    moreData: 'More Data',
    selectCalculation: 'Select Calculation Item',
    basicParams: 'Basic Parameters',
    calcParams: 'Calculation Parameters',
    calcResult: 'Calculation Result',
    formula: 'Guide & Formula'
  },
  params: {
    conversionFactor: 'Thermal Resistance Conversion Factor',
    basicThermalResistance: 'Basic Thermal Resistance (clo)',
    evaporativeHeatRate: 'Non-evaporative Heat Rate (W/m²)',
    skinTemp: 'Skin Temperature (°C)',
    envTemp: 'Environment Temperature (°C)',
    clothingResistance: 'Clothing Resistance (clo)',
    defaultValue: 'Default: '
  },
  calculations: {
    clothingResistance: 'Clothing Resistance (I)',
    basicThermalResistance: 'Basic Thermal Resistance (Ia)',
    envTemp: 'Environment Temperature (Ta)',
    skinTemp: 'Skin Temperature (Ts)',
    heatRate: 'Non-evaporative Heat Rate (H)'
  },
  clothing: {
    shortSleeve: 'Short Sleeve T-shirt',
    longSleeve: 'Long Sleeve Shirt',
    thinSweater: 'Thin Sweater',
    thickSweater: 'Thick Sweater',
    lightJacket: 'Light Jacket',
    thickJacket: 'Thick Jacket',
    downJacket: 'Down Jacket',
    suit: 'Suit Jacket',
    winterCoat: 'Winter Coat',
    workClothes: 'Work Clothes'
  },
  activities: {
    sitting: 'Sitting, Resting',
    standing: 'Standing Relaxed',
    lightOffice: 'Light Office Work',
    slowWalk: 'Slow Walking (3km/h)',
    normalWalk: 'Normal Walking (4-5km/h)',
    fastWalk: 'Fast Walking',
    lightLabor: 'Light Physical Labor',
    mediumLabor: 'Medium Physical Labor',
    heavyLabor: 'Heavy Physical Labor'
  },
  formula: {
    totalResistance: 'Total Thermal Resistance (It)',
    clothingResistance: 'Clothing Resistance (I)',
    parameters: 'Parameter Description:',
    reference: 'Reference Standard:',
    warning: 'Note: Current input parameters may be unreasonable, please check temperature and thermal resistance values',
    description: 'This calculator helps you scientifically determine the thermal protection needed for different temperature environments',
    guide: 'Quick Guide:',
    step1: '1. Select appropriate heat emission rate based on your daily activities',
    step2: '2. Calculate required clothing insulation (clo value) and choose suitable garments accordingly',
    disclaimer: 'Note: This calculator uses a simplified method suitable for general urban environments. All data is for reference only. More precise calculations are needed for extreme conditions (e.g., high humidity, strong winds, wilderness areas).',
    moreInfo: 'For more professional information, please refer to:',
    moreInfoLink: 'Standard 55 – Thermal Environmental Conditions for Human Occupancy'
  }
} 