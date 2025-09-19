export const fieldMappings = {
  overallHealthScore: "accuracy",
  heartRate: "vitalsMap.vitals.heart_rate",
  systolic: "vitalsMap.vitals.bp_sys",
  diastolic: "vitalsMap.vitals.bp_dia",
  bmi: "bodyCompositionData.BMI",
  endurance: "exercises[2].setList[0].time",
  stressIndex: "vitalsMap.metadata.heart_scores.stress_index",
  posture: "vitalsMap.posture",
};
