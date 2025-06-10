export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      academic_contributions: {
        Row: {
          abstract: string | null
          authors: string | null
          contribution_type: string | null
          created_at: string
          doi_url: string | null
          id: number
          keywords: string | null
          source_id: number | null
          title: string | null
          topic_id: number | null
          updated_at: string | null
          year: string | null
        }
        Insert: {
          abstract?: string | null
          authors?: string | null
          contribution_type?: string | null
          created_at?: string
          doi_url?: string | null
          id?: number
          keywords?: string | null
          source_id?: number | null
          title?: string | null
          topic_id?: number | null
          updated_at?: string | null
          year?: string | null
        }
        Update: {
          abstract?: string | null
          authors?: string | null
          contribution_type?: string | null
          created_at?: string
          doi_url?: string | null
          id?: number
          keywords?: string | null
          source_id?: number | null
          title?: string | null
          topic_id?: number | null
          updated_at?: string | null
          year?: string | null
        }
        Relationships: []
      }
      discussions: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          topic_id: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      insight_sources: {
        Row: {
          created_at: string
          id: string
          insight_id: string | null
          source_id: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          insight_id?: string | null
          source_id?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          insight_id?: string | null
          source_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "insight_sources_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insight_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      insights: {
        Row: {
          confidence: number | null
          content: string
          created_at: string
          downvotes: number | null
          id: string
          position: string
          scholar_id: string | null
          topic_id: number | null
          updated_at: string
          upvotes: number | null
        }
        Insert: {
          confidence?: number | null
          content: string
          created_at?: string
          downvotes?: number | null
          id?: string
          position: string
          scholar_id?: string | null
          topic_id?: number | null
          updated_at?: string
          upvotes?: number | null
        }
        Update: {
          confidence?: number | null
          content?: string
          created_at?: string
          downvotes?: number | null
          id?: string
          position?: string
          scholar_id?: string | null
          topic_id?: number | null
          updated_at?: string
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "insights_scholar_id_fkey"
            columns: ["scholar_id"]
            isOneToOne: false
            referencedRelation: "scholars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          academic_title: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          field_of_study: string | null
          id: string
          institution: string | null
          is_admin: boolean
          is_scholar: boolean | null
          updated_at: string
          username: string | null
          verification_status: string | null
          verified_at: string | null
        }
        Insert: {
          academic_title?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          field_of_study?: string | null
          id: string
          institution?: string | null
          is_admin?: boolean
          is_scholar?: boolean | null
          updated_at?: string
          username?: string | null
          verification_status?: string | null
          verified_at?: string | null
        }
        Update: {
          academic_title?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string | null
          is_admin?: boolean
          is_scholar?: boolean | null
          updated_at?: string
          username?: string | null
          verification_status?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      scholars: {
        Row: {
          avatar_url: string | null
          created_at: string
          credentials: string[] | null
          id: string
          institution: string | null
          name: string
          title: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          credentials?: string[] | null
          id?: string
          institution?: string | null
          name: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          credentials?: string[] | null
          id?: string
          institution?: string | null
          name?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          authors: string | null
          created_at: string
          doi: string | null
          id: number
          name: string | null
          publication: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          url: string | null
          year: number | null
        }
        Insert: {
          authors?: string | null
          created_at?: string
          doi?: string | null
          id?: number
          name?: string | null
          publication?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
          year?: number | null
        }
        Update: {
          authors?: string | null
          created_at?: string
          doi?: string | null
          id?: number
          name?: string | null
          publication?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
          year?: number | null
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          id: string
          insight_id: string | null
          user_id: string | null
          vote_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          insight_id?: string | null
          user_id?: string | null
          vote_type: string
        }
        Update: {
          created_at?: string
          id?: string
          insight_id?: string | null
          user_id?: string | null
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_insight_id_fkey"
            columns: ["insight_id"]
            isOneToOne: false
            referencedRelation: "insights"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
