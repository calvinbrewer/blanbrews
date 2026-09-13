export const taxiNumber = '+39 0578 20178'
export const taxiHref = 'tel:+39057820178'
export const venueDirections =
  'https://www.google.com/maps/dir/?api=1&destination=Borgo+Siliano+Vocabolo+Sigliano+47+Citta+della+Pieve+Italy'

type WeddingEvent = {
  title: string
  date: string
  time: string
  location: string
  dressCode: string | null
  description: string
  featured?: boolean
}

export const weddingEvents: WeddingEvent[] = [
  {
    title: 'Pizza Party',
    date: 'October 1, 2026',
    time: '6:00 PM',
    location: 'Borgo Siliano',
    dressCode: 'Dressy-casual',
    description: 'A casual pizza party to kick off our wedding weekend.',
  },
  {
    title: 'Wedding Ceremony & Reception',
    date: 'October 2, 2026',
    time: '4:00 PM',
    location: 'Borgo Siliano',
    dressCode: 'Cocktail Attire (jacket and tie encouraged)',
    description:
      'An intimate ceremony surrounded by the rolling hills and vineyards of Tuscany, followed by dinner and dancing.',
    featured: true,
  },
  {
    title: 'After Party',
    date: 'October 2, 2026',
    time: 'Midnight (into Saturday)',
    location: 'Borgo Siliano',
    dressCode:
      'Casual (feel free to stay in your wedding attire or change into something comfortable)',
    description: 'An after party to continue the shenanigans.',
  },
  {
    title: 'Saturday Brunch',
    date: 'October 3, 2026',
    time: '1:00 PM',
    location: 'Borgo Siliano',
    dressCode:
      'Relaxed (we can almost promise you the bride will be in sweatpants)',
    description: 'A relaxed brunch with a little hair of the dog.',
  },
  {
    title: 'Farewell Dinner',
    date: 'October 3, 2026',
    time: '7:00 PM',
    location: 'Borgo Siliano',
    dressCode: 'Dressy-casual (did someone say linens?!)',
    description: 'A special farewell dinner in the vineyards.',
  },
  {
    title: 'Departures',
    date: 'October 4, 2026',
    time: '10:00 AM',
    location: 'Home',
    dressCode: null,
    description:
      'Safe travels home! We hope you had an unforgettable time celebrating with us.',
  },
]
