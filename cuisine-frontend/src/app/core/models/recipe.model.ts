export interface Recipe {
  id?: number;              
  title: string;
  category: string;
  description: string;
  prep_time: number;
  cook_time: number;
  calories: number;
  is_healthy: boolean;
  image_url?: string;
  author?: string;
  created_at?: string;
}
