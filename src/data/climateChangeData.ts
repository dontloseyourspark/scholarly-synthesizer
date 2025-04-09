
// Climate change specific data for visualizations and content

export const consensusData = [
  { name: 'Support', value: 97 },
  { name: 'Against', value: 3 }
];

export const impactData = [
  { category: 'Sea Level Rise', value: 0.19, fill: '#0EA5E9' },
  { category: 'Global Temperature', value: 1.1, fill: '#F97316' },
  { category: 'CO₂ (ppm)', value: 415, fill: '#8B5CF6' },
  { category: 'Arctic Ice Loss (%)', value: 13.1, fill: '#D946EF' }
];

export const keyPublications = [
  {
    id: 1,
    title: "IPCC Sixth Assessment Report",
    authors: "Intergovernmental Panel on Climate Change",
    year: 2021,
    url: "https://www.ipcc.ch/report/ar6/wg1/"
  },
  {
    id: 2,
    title: "Global Warming of 1.5°C",
    authors: "IPCC Special Report",
    year: 2018,
    url: "https://www.ipcc.ch/sr15/"
  },
  {
    id: 3,
    title: "State of the Climate 2022",
    authors: "World Meteorological Organization",
    year: 2022,
    url: "https://library.wmo.int/index.php?lvl=notice_display&id=22130"
  }
];

export const climateEffects = [
  {
    title: "Rising Temperatures",
    icon: "ThermometerSun",
    iconColor: "text-orange-500",
    description: "Global average temperature has increased by about 1.1°C since pre-industrial times."
  },
  {
    title: "Changing Weather Patterns",
    icon: "Cloud",
    iconColor: "text-blue-400",
    description: "Increased frequency and intensity of extreme weather events, including hurricanes, droughts, and floods."
  },
  {
    title: "Melting Ice Caps",
    icon: "Wind",
    iconColor: "text-cyan-500",
    description: "Arctic sea ice is declining at a rate of 13.1% per decade, affecting global ocean currents and weather patterns."
  },
  {
    title: "Biodiversity Loss",
    icon: "TreePine",
    iconColor: "text-green-600",
    description: "An estimated one million plant and animal species are at risk of extinction due to climate change."
  }
];

export const CHART_COLORS = ['#4CAF50', '#F44336'];
