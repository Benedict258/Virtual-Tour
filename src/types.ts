export interface Tour {
  id: number;
  title: string;
  imgClass: string;
  category: TourCategory;
  duration: string;
  views: string;
  trend?: string;
  isFree?: boolean;
}

export type TourCategory = "Culture" | "Nature" | "History" | "Entertainment" | "Relaxation" | "Modern" | "All";

export interface ChatMessage {
  user: string;
  msg: string;
  time: string;
  pinned?: boolean;
}
