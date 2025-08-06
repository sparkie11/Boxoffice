export interface MatchInfo {
  m_id: number;
  match_name: string;
  venue: number;
  stadium_name: string;
  t_id: number;
  tournament_name: string;
  match_date: string;
  match_time: string;
  city_name: string;
  country_name: string;
}

export interface ListingNote {
  id: number;
  name: string;
}

export interface Split {
  id: number;
  name: string;
}

export interface Ticket {
  s_no: number;
  match_id: number;
  event_flag: string;
  ticket_type: string;
  ticket_type_id: number;
  ticket_category: string;
  ticket_category_id: number;
  ticket_block: string;
  home_town: string;
  row: string;
  quantity: number;
  seat: number;
  price_type: string;
  ticket_in_hand: number;
  first_seat: string | null;
  ship_date: string | null;
  price: number;
  price_gbp: number;
  web_price: number;
  listing_note: ListingNote[];
  split: Split;
}

export interface TicketHistoryDataItem {
  match_info: MatchInfo;
  tickets: Ticket[];
}

export interface TicketHistoryResponse {
  success: boolean;
  data: {
    data: TicketHistoryDataItem[];
  };
}