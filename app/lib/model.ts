export interface ItineraryDay {
  title: string;
  summary: string;
  attractions: string;
  transportation: string;
  accomodations: string;
}

export interface BudgetBreakdown {
  food: number;
  misc: number;
  activities: number;
  accomodation: number;
  transportation: number;
}

export interface BasicInfo {
  currency: string;
  sim_card_details: string;
  useful_apps: string;
  emergency_contacts: string;
}

export interface ItineraryData {
  basic_info?: BasicInfo;
  trip_title: string;
  itineraries: {
    [date: string]: ItineraryDay;
  };
  visa_required: boolean;
  budget_breakdown: BudgetBreakdown;
}

export interface TripDetails {
  id: string;
  userId: string;
  trip_name: string;
  image: string;
  destination: string;
  start_date: Date;
  end_date: Date;
  budget: number;
  travel_style: string;
  interests: string;
  number_of_persons: number;
  is_visa_required: boolean;
  itineraries: ItineraryData;
  createdAt: Date;
  updatedAt: Date;
}
