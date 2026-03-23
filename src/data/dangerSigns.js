export const dangerSigns = [
  {
    id: 1,
    category: "Head & Vision",
    symptoms: [
      { id: "s1", text: "Severe persistent headache", pidgin: "Head dey pain you well well", severity: "danger" },
      { id: "s2", text: "Blurred or double vision", pidgin: "Your eyes dey blur or you dey see double", severity: "danger" },
      { id: "s3", text: "Dizziness or fainting", pidgin: "You dey feel like you wan fall", severity: "danger" },
    ]
  },
  {
    id: 2,
    category: "Bleeding",
    symptoms: [
      { id: "s4", text: "Vaginal bleeding", pidgin: "Blood dey comot from your private part", severity: "danger" },
      { id: "s5", text: "Heavy discharge with smell", pidgin: "Plenty bad-smelling discharge", severity: "danger" },
    ]
  },
  {
    id: 3,
    category: "Baby Movement",
    symptoms: [
      { id: "s6", text: "Baby not moving for 2+ hours", pidgin: "Baby never move for 2 hours", severity: "danger" },
      { id: "s7", text: "Reduced baby movement", pidgin: "Baby movement don reduce", severity: "warning" },
    ]
  },
  {
    id: 4,
    category: "Body",
    symptoms: [
      { id: "s8", text: "Severe swelling of face, hands or feet", pidgin: "Your face, hand or leg don swell well well", severity: "danger" },
      { id: "s9", text: "High fever (above 38°C)", pidgin: "Serious fever", severity: "danger" },
      { id: "s10", text: "Difficulty breathing", pidgin: "You no fit breathe well", severity: "danger" },
      { id: "s11", text: "Severe abdominal pain", pidgin: "Belle dey pain you well well", severity: "danger" },
      { id: "s12", text: "Mild swelling of feet only", pidgin: "Only your leg small-small swell", severity: "warning" },
    ]
  },
  {
    id: 5,
    category: "Other",
    symptoms: [
      { id: "s13", text: "Convulsions or seizures", pidgin: "Your body dey shake anyhow", severity: "danger" },
      { id: "s14", text: "Loss of consciousness", pidgin: "You faint or black out", severity: "danger" },
      { id: "s15", text: "Burning pain when urinating", pidgin: "E dey pain you when you wan wee-wee", severity: "warning" },
    ]
  }
]