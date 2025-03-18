
export interface ThreatData {
  id: string;
  type: 'ransomware' | 'phishing' | 'malware' | 'ddos';
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  intensity: number; // 1-10
  impact: string;
  timestamp: Date;
  description: string;
}

export interface GuardianData {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  threatsStopped: number;
  score: number;
}

// Generate random coordinates with slight clustering around major cities/tech hubs
const generateRandomCoordinate = (center: [number, number], jitter: number = 15): [number, number] => {
  const lat = center[0] + (Math.random() - 0.5) * jitter;
  const lng = center[1] + (Math.random() - 0.5) * jitter;
  return [
    Math.max(-85, Math.min(85, lat)), // Keep latitude in range
    lng % 360 // Wrap longitude around the globe
  ];
};

// Major tech centers and their approximate coordinates
const techCenters: {[key: string]: {coords: [number, number], region: string, country: string}} = {
  siliconValley: { coords: [37.4, -122.1], region: 'North America', country: 'United States' },
  newYork: { coords: [40.7, -74.0], region: 'North America', country: 'United States' },
  london: { coords: [51.5, -0.1], region: 'Europe', country: 'United Kingdom' },
  berlin: { coords: [52.5, 13.4], region: 'Europe', country: 'Germany' },
  tokyo: { coords: [35.7, 139.8], region: 'Asia', country: 'Japan' },
  seoul: { coords: [37.6, 127.0], region: 'Asia', country: 'South Korea' },
  singapore: { coords: [1.3, 103.8], region: 'Asia', country: 'Singapore' },
  mumbai: { coords: [19.1, 72.9], region: 'Asia', country: 'India' },
  sydney: { coords: [-33.9, 151.2], region: 'Oceania', country: 'Australia' },
  saoPaulo: { coords: [-23.6, -46.6], region: 'South America', country: 'Brazil' },
};

const threatDescriptions = {
  ransomware: [
    "Encrypted critical hospital systems, affecting patient care for 24 hours",
    "Locked 20 schools in Brazil, impacting classes for 15,000 students",
    "Hit municipal services in a small town, delaying emergency responses",
    "Targeted a manufacturing plant, halting production for 3 days",
    "Affected a logistics company, delaying thousands of deliveries"
  ],
  phishing: [
    "Campaign targeting banking customers led to 30 compromised accounts",
    "Company-wide email compromised employee credentials",
    "Sophisticated academic credential theft affecting university students",
    "Vaccine appointment scam targeting elderly citizens",
    "Tax return phishing affecting hundreds of taxpayers"
  ],
  malware: [
    "Information-stealing malware discovered in popular app downloads",
    "Trojan affecting mobile banking users across 5 countries",
    "Supply chain attack impacting software used by government agencies",
    "Cryptomining malware slowing systems at multiple research institutions",
    "Spyware targeting journalists and political figures"
  ],
  ddos: [
    "Major e-commerce platform experienced 2-hour outage during peak sales",
    "Public service website unavailable during critical announcement period",
    "Financial services disrupted for customers across multiple regions",
    "Gaming tournament disrupted by coordinated attack",
    "Cloud provider services degraded, affecting thousands of websites"
  ]
};

// Generate simulated threat data
export const generateThreats = (count: number = 30): ThreatData[] => {
  const threats: ThreatData[] = [];
  const types: ('ransomware' | 'phishing' | 'malware' | 'ddos')[] = ['ransomware', 'phishing', 'malware', 'ddos'];
  
  for (let i = 0; i < count; i++) {
    const centerKey = Object.keys(techCenters)[Math.floor(Math.random() * Object.keys(techCenters).length)];
    const center = techCenters[centerKey];
    const [lat, lng] = generateRandomCoordinate(center.coords);
    const type = types[Math.floor(Math.random() * types.length)];
    const intensity = Math.floor(Math.random() * 10) + 1;
    
    // Get a random description for this threat type
    const descriptionList = threatDescriptions[type];
    const description = descriptionList[Math.floor(Math.random() * descriptionList.length)];
    
    // Generate a timestamp within the last 24 hours
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - Math.random() * 24);
    
    threats.push({
      id: `threat-${i}`,
      type,
      latitude: lat,
      longitude: lng,
      country: center.country,
      region: center.region,
      intensity,
      impact: `Affected ${Math.floor(Math.random() * 100) + 1} systems`,
      timestamp,
      description
    });
  }
  
  return threats;
};

// Generate simulated guardian network data
export const generateGuardians = (count: number = 20): GuardianData[] => {
  const guardians: GuardianData[] = [];
  
  for (let i = 0; i < count; i++) {
    const centerKey = Object.keys(techCenters)[Math.floor(Math.random() * Object.keys(techCenters).length)];
    const center = techCenters[centerKey];
    const [lat, lng] = generateRandomCoordinate(center.coords, 25); // Wider distribution
    
    guardians.push({
      id: `guardian-${i}`,
      latitude: lat,
      longitude: lng,
      country: center.country,
      threatsStopped: Math.floor(Math.random() * 50) + 1,
      score: Math.floor(Math.random() * 5000) + 100
    });
  }
  
  return guardians;
};

// Prediction data for future threats
export interface ThreatPrediction {
  id: string;
  type: 'ransomware' | 'phishing' | 'malware' | 'ddos';
  region: string;
  probability: number; // 0-1
  estimatedTimeframe: string;
  potentialTargets: string[];
  description: string;
}

export const generatePredictions = (count: number = 5): ThreatPrediction[] => {
  const predictions: ThreatPrediction[] = [];
  const types: ('ransomware' | 'phishing' | 'malware' | 'ddos')[] = ['ransomware', 'phishing', 'malware', 'ddos'];
  const regions = ['North America', 'Europe', 'Asia', 'Oceania', 'South America', 'Africa'];
  const timeframes = ['next 24 hours', 'next 48 hours', '3-5 days', 'coming week'];
  const targets = [
    'Healthcare institutions', 
    'Educational institutions', 
    'Government agencies', 
    'Financial services',
    'E-commerce platforms',
    'Manufacturing sector',
    'Energy infrastructure',
    'Transportation systems',
    'Media organizations'
  ];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const probability = (Math.random() * 0.5) + 0.3; // Between 0.3 and 0.8
    const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
    
    // Select 1-3 potential targets
    const targetCount = Math.floor(Math.random() * 3) + 1;
    const selectedTargets: string[] = [];
    const tempTargets = [...targets];
    
    for (let j = 0; j < targetCount; j++) {
      if (tempTargets.length === 0) break;
      const index = Math.floor(Math.random() * tempTargets.length);
      selectedTargets.push(tempTargets[index]);
      tempTargets.splice(index, 1);
    }
    
    predictions.push({
      id: `prediction-${i}`,
      type,
      region,
      probability,
      estimatedTimeframe: timeframe,
      potentialTargets: selectedTargets,
      description: `Potential ${type} campaign targeting ${selectedTargets.join(', ')} in ${region} within the ${timeframe}.`
    });
  }
  
  return predictions;
};
