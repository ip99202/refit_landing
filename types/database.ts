export type Database = {
  public: {
    Tables: {
      user_info_landing: {
        Row: {
          id: string;
          name: string;
          birth_date: string;
          phone: string;
          gender: "남" | "여";
          q1: string;
          q2: string;
          q3: string;
          etc: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          birth_date: string;
          phone: string;
          gender: "남" | "여";
          q1: string;
          q2: string;
          q3: string;
          etc?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_info_landing"]["Insert"]>;
      };
    };
  };
};
