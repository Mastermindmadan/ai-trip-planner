import { Trip, DayItinerary, Recommendation } from '../types';
import { generateUUID } from '../lib/utils';

export const plannerService = {
  generateItinerary: async (params: Partial<Trip>): Promise<Trip> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const duration = Number(params.duration) || 1;
    const destination = params.destination || 'Selected Destination';
    
    // Day-by-day logic
    const itinerary: DayItinerary[] = [];
    for (let i = 1; i <= duration; i++) {
      itinerary.push({
        day: i,
        activities: [
          { time: '09:00 AM', title: `Breakfast at a local favorite in ${destination}`, description: 'Enjoy authentic local cuisine to start your day.' },
          { time: '11:00 AM', title: `Visit ${destination} Main Attraction`, description: 'Explore the most famous landmark in the city.' },
          { time: '01:30 PM', title: 'Lunch at Scenic Viewpoint', description: 'Great food with a breathtaking view of the surroundings.' },
          { time: '04:00 PM', title: 'Leisure Activity / Shopping', description: 'Visit local markets or relax in a city park.' },
          { time: '08:00 PM', title: 'Gourmet Dinner Experience', description: 'Recommended fine dining spot to end the day.' }
        ]
      });
    }

    // Recommendations
    const hotels: Recommendation[] = [
      { id: 'h1', type: 'hotel', name: 'Grand Royal Stay', rating: 4.8, price: '$120 / night', image: `https://picsum.photos/seed/${destination}h1/400/300`, link: 'https://www.booking.com/search.html?ss=' + destination },
      { id: 'h2', type: 'hotel', name: 'Azure Beach Resort', rating: 4.7, price: '$250 / night', image: `https://picsum.photos/seed/${destination}h2/400/300`, link: 'https://www.booking.com/search.html?ss=' + destination },
      { id: 'h3', type: 'hotel', name: 'City Central Inn', rating: 4.5, price: '$80 / night', image: `https://picsum.photos/seed/${destination}h3/400/300`, link: 'https://www.booking.com/search.html?ss=' + destination }
    ];

    const restaurants: Recommendation[] = [
      { id: 'r1', type: 'food', name: 'The Golden Fork', rating: 4.9, price: '$$', image: `https://picsum.photos/seed/${destination}r1/400/300`, link: 'https://www.tripadvisor.com/search?q=' + destination },
      { id: 'r2', type: 'food', name: 'Skyline Bistro', rating: 4.6, price: '$$$', image: `https://picsum.photos/seed/${destination}r2/400/300`, link: 'https://www.tripadvisor.com/search?q=' + destination }
    ];

    const budgetVal = Number(params.budget?.replace(/[^0-9.-]+/g,"")) || 1000;
    
    return {
      id: generateUUID(),
      userId: params.userId || '',
      title: `Trip to ${destination}`,
      startLocation: params.startLocation || '',
      destination: destination,
      duration: duration,
      budget: params.budget || '1000',
      style: params.style || 'Solo',
      interests: params.interests || [],
      transport: params.transport || 'Flight',
      itinerary,
      hotels,
      restaurants,
      estimatedCost: budgetVal * 0.85, // Mock calculation
      createdAt: new Date().toISOString()
    };
  }
};
