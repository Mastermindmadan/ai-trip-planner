export const SAMPLE_PACKAGES = [
  {
    id: '1',
    name: 'Ooty Weekend Escape',
    duration: '3 Days, 2 Nights',
    price: '$120 - $250',
    rating: 4.8,
    highlights: ['Botanical Gardens', 'Doddabetta Peak', 'Toy Train Ride'],
    image: 'https://picsum.photos/seed/ooty/800/600'
  },
  {
    id: '2',
    name: 'Kodaikanal Nature Tour',
    duration: '4 Days, 3 Nights',
    price: '$150 - $300',
    rating: 4.7,
    highlights: ['Kodai Lake', 'Coakers Walk', 'Silver Cascade Falls'],
    image: 'https://picsum.photos/seed/kodai/800/600'
  },
  {
    id: '3',
    name: 'Goa Beach Holiday',
    duration: '5 Days, 4 Nights',
    price: '$300 - $600',
    rating: 4.9,
    highlights: ['Baga Beach', 'Old Goa Churches', 'Watersports'],
    image: 'https://picsum.photos/seed/goa/800/600'
  },
  {
    id: '4',
    name: 'Manali Adventure Trip',
    duration: '6 Days, 5 Nights',
    price: '$400 - $800',
    rating: 4.9,
    highlights: ['Rohtang Pass', 'Solang Valley', 'Paragliding'],
    image: 'https://picsum.photos/seed/manali/800/600'
  }
];

export const DESTINATIONS_DB: Record<string, any> = {
  'Paris': {
    lat: 48.8566,
    lng: 2.3522,
    hotels: [
      { id: 'p1', type: 'hotel', name: 'Hotel Le Meurice', rating: 5, price: '$$$$', image: 'https://picsum.photos/seed/p1/400/300' },
      { id: 'p2', type: 'hotel', name: 'CitizenM Paris', rating: 4, price: '$$', image: 'https://picsum.photos/seed/p2/400/300' }
    ]
  },
  'Tokyo': {
    lat: 35.6762,
    lng: 139.6503,
    hotels: []
  }
};
