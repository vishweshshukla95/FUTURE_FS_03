export const countries = [
  {
    id: 1, name: "India", flag: "🇮🇳", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Jaipur", "Goa", "Varanasi", "Agra", "Kerala"],
    description: "Land of diverse cultures, ancient temples and breathtaking landscapes"
  },
  {
    id: 2, name: "France", flag: "🇫🇷", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    cities: ["Paris", "Lyon", "Nice", "Marseille", "Bordeaux", "Strasbourg"],
    description: "Romance, art, cuisine and the iconic Eiffel Tower"
  },
  {
    id: 3, name: "Japan", flag: "🇯🇵", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    cities: ["Tokyo", "Osaka", "Kyoto", "Hiroshima", "Sapporo", "Nara"],
    description: "Where ancient tradition meets futuristic technology"
  },
  {
    id: 4, name: "Switzerland", flag: "🇨🇭", image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800",
    cities: ["Zurich", "Geneva", "Bern", "Lucerne", "Interlaken", "Zermatt"],
    description: "Alpine paradise with stunning mountains and pristine lakes"
  },
  {
    id: 5, name: "USA", flag: "🇺🇸", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    cities: ["New York", "Los Angeles", "Chicago", "Las Vegas", "Miami", "San Francisco"],
    description: "Land of endless opportunities and iconic landmarks"
  },
  {
    id: 6, name: "Australia", flag: "🇦🇺", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast"],
    description: "Wild outback, stunning beaches and unique wildlife"
  },
  {
    id: 7, name: "Italy", flag: "🇮🇹", image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800",
    cities: ["Rome", "Venice", "Florence", "Milan", "Naples", "Amalfi"],
    description: "Art, history, cuisine and timeless beauty"
  },
  {
    id: 8, name: "Thailand", flag: "🇹🇭", image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800",
    cities: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Koh Samui"],
    description: "Tropical paradise with temples, beaches and street food"
  },
  {
    id: 9, name: "Nepal", flag: "🇳🇵", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    cities: ["Kathmandu", "Pokhara", "Namche Bazaar", "Lukla", "Chitwan"],
    description: "Home of the Himalayas and world's greatest treks"
  },
  {
    id: 10, name: "Dubai", flag: "🇦🇪", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    cities: ["Dubai City", "Abu Dhabi", "Sharjah", "Ajman"],
    description: "Futuristic skyline, luxury shopping and desert adventures"
  },
  {
    id: 11, name: "Greece", flag: "🇬🇷", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
    cities: ["Athens", "Santorini", "Mykonos", "Crete", "Rhodes", "Corfu"],
    description: "Ancient ruins, crystal blue waters and island paradise"
  },
  {
    id: 12, name: "Maldives", flag: "🇲🇻", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    cities: ["Male", "Baa Atoll", "Ari Atoll", "North Male Atoll"],
    description: "Ultimate luxury island paradise with overwater bungalows"
  },
];

export const packages = [
  {
    id: 1, name: "Himalayan Trek Adventure", country: "Nepal", duration: "12 Days", price: 45000,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    category: "Trek", rating: 4.9, reviews: 234,
    highlights: ["Everest Base Camp", "Namche Bazaar", "Tengboche Monastery", "Kala Patthar"],
    includes: ["Hotel", "Guide", "Meals", "Permits", "Transportation"]
  },
  {
    id: 2, name: "Paris Romance Package", country: "France", duration: "7 Days", price: 85000,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    category: "Luxury", rating: 4.8, reviews: 189,
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise", "Versailles"],
    includes: ["5-Star Hotel", "Breakfast", "City Tour", "Airport Transfer"]
  },
  {
    id: 3, name: "Bali Adventure & Relaxation", country: "Indonesia", duration: "8 Days", price: 55000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    category: "Adventure", rating: 4.7, reviews: 312,
    highlights: ["Ubud Rice Terraces", "Mount Batur Sunrise", "Uluwatu Temple", "Seminyak Beach"],
    includes: ["Resort Stay", "Breakfast", "Activities", "Airport Transfer"]
  },
  {
    id: 4, name: "Swiss Alps Winter Wonderland", country: "Switzerland", duration: "10 Days", price: 120000,
    image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800",
    category: "Winter", rating: 4.9, reviews: 156,
    highlights: ["Jungfraujoch", "Zermatt Skiing", "Lucerne Lake", "Interlaken"],
    includes: ["Chalet Stay", "Ski Pass", "All Meals", "Train Pass"]
  },
  {
    id: 5, name: "Rajasthan Royal Tour", country: "India", duration: "9 Days", price: 35000,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    category: "Cultural", rating: 4.6, reviews: 445,
    highlights: ["Jaipur Pink City", "Udaipur Lake Palace", "Jodhpur Blue City", "Jaisalmer Desert"],
    includes: ["Heritage Hotel", "Breakfast", "AC Transport", "Guide"]
  },
  {
    id: 6, name: "Maldives Luxury Escape", country: "Maldives", duration: "6 Days", price: 150000,
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
    category: "Luxury", rating: 5.0, reviews: 98,
    highlights: ["Overwater Bungalow", "Snorkeling", "Dolphin Cruise", "Spa"],
    includes: ["Water Villa", "All Meals", "Water Sports", "Seaplane Transfer"]
  },
  {
    id: 7, name: "Japan Cherry Blossom Tour", country: "Japan", duration: "11 Days", price: 95000,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    category: "Cultural", rating: 4.8, reviews: 267,
    highlights: ["Tokyo Disney", "Mount Fuji", "Kyoto Temples", "Osaka Street Food"],
    includes: ["Hotel", "JR Pass", "Breakfast", "Guide"]
  },
  {
    id: 8, name: "African Safari Experience", country: "Kenya", duration: "14 Days", price: 180000,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    category: "Safari", rating: 4.9, reviews: 134,
    highlights: ["Masai Mara", "Serengeti", "Ngorongoro Crater", "Amboseli"],
    includes: ["Safari Lodge", "All Meals", "Game Drives", "Flight"]
  },
];

export const hotels = [
  { id: 1, name: "The Oberoi", city: "Mumbai", country: "India", stars: 5, price: 15000, rating: 4.9, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800", amenities: ["Pool", "Spa", "Gym", "Restaurant", "WiFi"] },
  { id: 2, name: "Le Grand Paris", city: "Paris", country: "France", stars: 5, price: 25000, rating: 4.8, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800", amenities: ["Rooftop Bar", "Spa", "Concierge", "Restaurant", "WiFi"] },
  { id: 3, name: "Tokyo Palace Hotel", city: "Tokyo", country: "Japan", stars: 5, price: 22000, rating: 4.9, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800", amenities: ["Onsen", "Restaurant", "Gym", "Concierge", "WiFi"] },
  { id: 4, name: "Swiss Mountain Lodge", city: "Interlaken", country: "Switzerland", stars: 4, price: 18000, rating: 4.7, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", amenities: ["Mountain View", "Ski Storage", "Restaurant", "Sauna", "WiFi"] },
  { id: 5, name: "Burj Al Arab", city: "Dubai", country: "Dubai", stars: 5, price: 85000, rating: 5.0, image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800", amenities: ["Private Beach", "Helicopter Pad", "Butler", "Pool", "WiFi"] },
  { id: 6, name: "Santorini Cliffs Resort", city: "Santorini", country: "Greece", stars: 5, price: 35000, rating: 4.9, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", amenities: ["Infinity Pool", "Cave Room", "Sea View", "Spa", "WiFi"] },
];

export const adventures = [
  { id: 1, name: "Everest Base Camp Trek", location: "Nepal", difficulty: "Hard", duration: "14 Days", price: 55000, icon: "🏔️", category: "Trek" },
  { id: 2, name: "Scuba Diving", location: "Maldives", difficulty: "Easy", duration: "1 Day", price: 8000, icon: "🤿", category: "Water" },
  { id: 3, name: "Desert Safari", location: "Dubai", difficulty: "Easy", duration: "1 Day", price: 5000, icon: "🏜️", category: "Safari" },
  { id: 4, name: "Bungee Jumping", location: "Switzerland", difficulty: "Medium", duration: "Half Day", price: 12000, icon: "🪂", category: "Extreme" },
  { id: 5, name: "White Water Rafting", location: "Rishikesh, India", difficulty: "Medium", duration: "1 Day", price: 3500, icon: "🚣", category: "Water" },
  { id: 6, name: "Northern Lights Tour", location: "Norway", difficulty: "Easy", duration: "3 Days", price: 45000, icon: "🌌", category: "Nature" },
  { id: 7, name: "Skiing", location: "Alps, Switzerland", difficulty: "Medium", duration: "5 Days", price: 65000, icon: "⛷️", category: "Winter" },
  { id: 8, name: "Hot Air Balloon", location: "Cappadocia, Turkey", difficulty: "Easy", duration: "Half Day", price: 15000, icon: "🎈", category: "Air" },
  { id: 9, name: "Amazon Jungle Trek", location: "Brazil", difficulty: "Hard", duration: "7 Days", price: 75000, icon: "🌿", category: "Trek" },
  { id: 10, name: "Whale Watching", location: "Australia", difficulty: "Easy", duration: "1 Day", price: 6000, icon: "🐋", category: "Wildlife" },
  { id: 11, name: "Rock Climbing", location: "Yosemite, USA", difficulty: "Hard", duration: "2 Days", price: 18000, icon: "🧗", category: "Extreme" },
  { id: 12, name: "Paragliding", location: "Himachal, India", difficulty: "Medium", duration: "Half Day", price: 4500, icon: "🪂", category: "Air" },
];

export const cars = [
  { id: 1, type: "Sedan", name: "Toyota Camry", price: 2500, seats: 4, ac: true, icon: "🚗" },
  { id: 2, type: "SUV", name: "Toyota Fortuner", price: 3500, seats: 7, ac: true, icon: "🚙" },
  { id: 3, type: "Luxury", name: "Mercedes E-Class", price: 6000, seats: 4, ac: true, icon: "🏎️" },
  { id: 4, type: "Mini Bus", name: "Toyota Hiace", price: 5000, seats: 12, ac: true, icon: "🚐" },
  { id: 5, type: "Hatchback", name: "Maruti Swift", price: 1500, seats: 4, ac: true, icon: "🚗" },
  { id: 6, type: "Tempo Traveller", name: "Force Traveller", price: 7000, seats: 17, ac: false, icon: "🚌" },
];

export const flights = {
  India: {
    routes: [
      { from: "Mumbai", to: "Delhi", price: 3500, duration: "2h 10m", airline: "IndiGo" },
      { from: "Delhi", to: "Mumbai", price: 3200, duration: "2h 15m", airline: "Air India" },
      { from: "Bangalore", to: "Delhi", price: 4200, duration: "2h 45m", airline: "SpiceJet" },
      { from: "Mumbai", to: "Goa", price: 2800, duration: "1h 15m", airline: "IndiGo" },
      { from: "Delhi", to: "Jaipur", price: 2200, duration: "1h 05m", airline: "Air India" },
      { from: "Chennai", to: "Mumbai", price: 3800, duration: "2h 20m", airline: "Vistara" },
    ]
  },
  International: {
    routes: [
      { from: "Mumbai", to: "Dubai", price: 18000, duration: "3h 30m", airline: "Emirates" },
      { from: "Delhi", to: "London", price: 45000, duration: "9h 20m", airline: "British Airways" },
      { from: "Mumbai", to: "Singapore", price: 22000, duration: "5h 45m", airline: "Singapore Airlines" },
      { from: "Delhi", to: "New York", price: 65000, duration: "14h 30m", airline: "Air India" },
      { from: "Mumbai", to: "Bangkok", price: 15000, duration: "4h 15m", airline: "Thai Airways" },
      { from: "Delhi", to: "Paris", price: 48000, duration: "8h 45m", airline: "Air France" },
    ]
  }
};

export const trains = {
  India: {
    routes: [
      { from: "Mumbai", to: "Delhi", price: 1800, duration: "16h", train: "Rajdhani Express" },
      { from: "Delhi", to: "Agra", price: 800, duration: "2h", train: "Gatimaan Express" },
      { from: "Mumbai", to: "Goa", price: 1200, duration: "8h", train: "Konkan Kanya" },
      { from: "Delhi", to: "Jaipur", price: 650, duration: "5h", train: "Shatabdi Express" },
      { from: "Kolkata", to: "Delhi", price: 2200, duration: "17h", train: "Duronto Express" },
      { from: "Chennai", to: "Bangalore", price: 750, duration: "5h", train: "Shatabdi Express" },
    ]
  },
  Europe: {
    routes: [
      { from: "Paris", to: "London", price: 8500, duration: "2h 15m", train: "Eurostar" },
      { from: "Paris", to: "Amsterdam", price: 6500, duration: "3h 30m", train: "Thalys" },
      { from: "Zurich", to: "Milan", price: 5500, duration: "3h 45m", train: "EuroCity" },
      { from: "Rome", to: "Florence", price: 4500, duration: "1h 30m", train: "Frecciarossa" },
    ]
  }
};

export const buses = {
  India: {
    routes: [
      { from: "Mumbai", to: "Pune", price: 350, duration: "3h", operator: "VRL Travels" },
      { from: "Delhi", to: "Agra", price: 400, duration: "4h", operator: "RedBus" },
      { from: "Bangalore", to: "Mysore", price: 300, duration: "3h", operator: "KSRTC" },
      { from: "Mumbai", to: "Goa", price: 800, duration: "8h", operator: "Neeta Tours" },
      { from: "Delhi", to: "Manali", price: 1200, duration: "14h", operator: "HRTC" },
      { from: "Jaipur", to: "Jodhpur", price: 550, duration: "5h", operator: "RSRTC" },
    ]
  },
  Europe: {
    routes: [
      { from: "London", to: "Paris", price: 4500, duration: "8h", operator: "FlixBus" },
      { from: "Amsterdam", to: "Brussels", price: 2500, duration: "3h", operator: "Eurolines" },
      { from: "Berlin", to: "Prague", price: 3000, duration: "4h 30m", operator: "FlixBus" },
    ]
  }
};

export const testimonials = [
  { name: "Priya Sharma", location: "Mumbai", rating: 5, comment: "A2V2 Travel made our Maldives trip absolutely magical! Every detail was perfect.", avatar: "PS", trip: "Maldives Luxury Package" },
  { name: "Rahul Gupta", location: "Delhi", rating: 5, comment: "The Himalayan trek was life-changing. Best guides, best experience!", avatar: "RG", trip: "Everest Base Camp Trek" },
  { name: "Anita Patel", location: "Bangalore", rating: 4, comment: "Switzerland tour was breathtaking. A2V2 handled everything professionally.", avatar: "AP", trip: "Swiss Alps Package" },
  { name: "Vikram Singh", location: "Jaipur", rating: 5, comment: "The Rajasthan heritage tour was authentic and beautifully curated.", avatar: "VS", trip: "Rajasthan Royal Tour" },
];
