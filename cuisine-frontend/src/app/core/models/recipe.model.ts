export interface Ingredient {
  name: string;
  quantity: string;
}

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
  // file chosen from device (frontend only)
  image?: File;
  author_name?: string;
  author?: string;
  created_at?: string;
  ingredients?: Ingredient[];
}
