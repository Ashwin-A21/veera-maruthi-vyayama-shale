/**
 * All editable copy and business details live here.
 * Items marked `TODO(confirm)` are placeholders — replace them with the
 * gym's real details before going live.
 */

export const site = {
  name: "Sri Ayyappa Kripa Veera Maruthi Vyayama Shale",
  shortName: "Veera Maruthi",
  kannadaName: "ವೀರ ಮಾರುತಿ ವ್ಯಾಯಾಮ ಶಾಲೆ",
  description:
    "A modern strength and fitness gym in Hosangadi, Manjeshwar — inspired by Lord Hanuman, blessed by Swami Ayyappa.",
  url: "https://veeramaruthi.example", // TODO(confirm): production domain

  address: {
    lines: ["Hosangadi, Manjeshwar,", "Bangramanjeshwar,", "Kasaragod District, Kerala 671323"], // TODO(confirm) exact building / landmark
    mapsQuery: "Hosangadi, Manjeshwar, Kasaragod, Kerala",
  },

  phones: ["+91 00000 00000"], // TODO(confirm)
  whatsapp: "910000000000", // TODO(confirm): digits only, with country code
  instagram: "https://instagram.com/", // TODO(confirm)

  hours: [
    { days: "Monday – Saturday", time: "5:00 AM – 10:00 AM" }, // TODO(confirm)
    { days: "Monday – Saturday", time: "4:30 PM – 9:30 PM" }, // TODO(confirm)
    { days: "Sunday", time: "6:00 AM – 10:00 AM" }, // TODO(confirm)
  ],
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Training", href: "#training" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
  { label: "Gallery", href: "#gallery" },
] as const;

export const features = [
  { title: "Brand-new equipment", text: "Modern multi-station machines, racks and cardio." },
  { title: "Free weights", text: "Dumbbells, barbells and plates for serious strength." },
  { title: "Coaching for all", text: "First-timers, students, seniors and athletes." },
  { title: "Family atmosphere", text: "We bow before we lift, and look after each other." },
] as const;

export const facilities = [
  { key: "facFreeWeights", title: "Free Weights" },
  { key: "facStrength", title: "Strength Rigs" },
  { key: "facCardio", title: "Cardio" },
  { key: "facMachines", title: "Machines" },
  { key: "facFunctional", title: "Functional" },
] as const;

// TODO(confirm): programmes, batch times and inclusions
export const programmes = [
  {
    title: "Strength Training",
    tag: "All levels",
    items: ["Squat, bench & deadlift", "Progressive programmes", "Technique coaching"],
  },
  {
    title: "Bodybuilding",
    tag: "Hypertrophy",
    items: ["Split routines", "Posing practice", "Diet guidance"],
  },
  {
    title: "Weight Loss",
    tag: "Conditioning",
    items: ["Circuit sessions", "Cardio plans", "Weekly check-ins"],
  },
  {
    title: "Functional Training",
    tag: "Athletic",
    items: ["Kettlebells & cable work", "Mobility and core", "Everyday strength"],
  },
  {
    title: "Personal Training",
    tag: "1-on-1",
    items: ["Plan built around you", "Form correction", "Progress tracking"],
  },
  {
    title: "Mandala Vratham Batch",
    tag: "41 days",
    items: ["Gentle, disciplined routine", "Early-morning batch", "For Sabarimala devotees"],
  },
] as const;

// TODO(confirm): prices
export const plans = [
  { name: "Monthly", note: "Full gym access", price: "800" },
  { name: "Quarterly", note: "3 months", price: "2,100" },
  { name: "Half-yearly", note: "6 months", price: "4,000" },
  { name: "Annual", note: "12 months", price: "7,500" },
  { name: "Students", note: "With valid ID, per month", price: "600" },
  { name: "Personal Training", note: "Add-on, per month", price: "1,500" },
] as const;
