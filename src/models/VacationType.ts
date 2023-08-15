export interface VacationType {
    vacation_id?: string | undefined
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    image_path?: string;
  }