export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          name: string;
          birth_date: string;
          phone: string;
          gender: "남" | "여";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          birth_date: string;
          phone: string;
          gender: "남" | "여";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
      };
    };
  };
};
