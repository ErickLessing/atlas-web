export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: { // What a row looks like when fetched
          id: string;
          name: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: { // What data is required to insert a row
          id: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: { // What data is allowed when updating a row
          name?: string;
          updated_at?: string;
        };
      };
    };
  };
}
