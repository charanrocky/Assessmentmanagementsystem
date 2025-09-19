export const fieldMappings = {
  overallHealthScore: "accuracy",
  heartRate: "vitalsMap.vitals.heart_rate",
  bmi: "bodyCompositionData.BMI",
  systolic: "vitalsMap.vitals.bp_sys",
  diastolic: "vitalsMap.vitals.bp_dia",
  endurance: "exercises[?(@.id==235)].setList[0].time",
};
