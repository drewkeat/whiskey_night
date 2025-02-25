export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      clubs: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
      clubs_members: {
        Row: {
          clubid: number
          memberid: string
          role: Database["public"]["Enums"]["member_role"] | null
        }
        Insert: {
          clubid: number
          memberid: string
          role?: Database["public"]["Enums"]["member_role"] | null
        }
        Update: {
          clubid?: number
          memberid?: string
          role?: Database["public"]["Enums"]["member_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "clubmembers_memberid_fkey"
            columns: ["memberid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clubs_members_clubid_fkey"
            columns: ["clubid"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          end_time: string | null
          host: string | null
          id: number
          location: number | null
          name: string | null
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          host?: string | null
          id?: number
          location?: number | null
          name?: string | null
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string | null
          host?: string | null
          id?: number
          location?: number | null
          name?: string | null
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_host_fkey"
            columns: ["host"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_location_fkey"
            columns: ["location"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      events_attendees: {
        Row: {
          attendee_id: string
          event_id: number
          status: Database["public"]["Enums"]["invitation_status"]
        }
        Insert: {
          attendee_id: string
          event_id: number
          status?: Database["public"]["Enums"]["invitation_status"]
        }
        Update: {
          attendee_id?: string
          event_id?: number
          status?: Database["public"]["Enums"]["invitation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "events_attendees_attendee_id_fkey"
            columns: ["attendee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events_whiskeys: {
        Row: {
          event_id: number
          whiskey: number
        }
        Insert: {
          event_id: number
          whiskey: number
        }
        Update: {
          event_id?: number
          whiskey?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_whiskeys_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_whiskeys_whiskey_fkey"
            columns: ["whiskey"]
            isOneToOne: false
            referencedRelation: "whiskeys"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          created_at: string
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: number
          notes: string | null
          updated_at: string | null
          whiskey_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          notes?: string | null
          updated_at?: string | null
          whiskey_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          notes?: string | null
          updated_at?: string | null
          whiskey_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_whiskey_id_fkey"
            columns: ["whiskey_id"]
            isOneToOne: false
            referencedRelation: "whiskeys"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string | null
          firstname: string | null
          id: string
          lastname: string | null
        }
        Insert: {
          email?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
        }
        Update: {
          email?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
        }
        Relationships: []
      }
      whiskeys: {
        Row: {
          abv: string | null
          age: string | null
          caskType: string | null
          createdAt: string | null
          description: string | null
          distillery: string | null
          flavorProfile: Json | null
          id: number
          location: string | null
          name: string
          style: string | null
          type: string | null
          updatedAt: string | null
          whiskeyImg: string | null
          whiskeyLink: string | null
        }
        Insert: {
          abv?: string | null
          age?: string | null
          caskType?: string | null
          createdAt?: string | null
          description?: string | null
          distillery?: string | null
          flavorProfile?: Json | null
          id?: number
          location?: string | null
          name: string
          style?: string | null
          type?: string | null
          updatedAt?: string | null
          whiskeyImg?: string | null
          whiskeyLink?: string | null
        }
        Update: {
          abv?: string | null
          age?: string | null
          caskType?: string | null
          createdAt?: string | null
          description?: string | null
          distillery?: string | null
          flavorProfile?: Json | null
          id?: number
          location?: string | null
          name?: string
          style?: string | null
          type?: string | null
          updatedAt?: string | null
          whiskeyImg?: string | null
          whiskeyLink?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      invitation_status: "confirmed" | "pending" | "declined"
      member_role: "member" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

