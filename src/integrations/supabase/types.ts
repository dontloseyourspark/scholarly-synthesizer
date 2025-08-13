export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
          user_profile: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id?: number | null
          updated_at?: string
          user_id?: string | null
          user_profile?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id?: number | null
          updated_at?: string
          user_id?: string | null
          user_profile?: Json | null
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
          verification_status: string
          verified_at: string | null
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
          verification_status?: string
          verified_at?: string | null
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
          verification_status?: string
          verified_at?: string | null
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
      notifications: {
        Row: {
          created_at: string
          event_type: string
          id: string
          is_read: boolean
          message: string
          related_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          is_read?: boolean
          message: string
          related_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          is_read?: boolean
          message?: string
          related_id?: string | null
          user_id?: string
        }
        Relationships: []
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
      topic_content_cards: {
        Row: {
          created_at: string
          description: string
          icon_color: string | null
          icon_name: string | null
          id: string
          sort_order: number | null
          title: string
          topic_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon_color?: string | null
          icon_name?: string | null
          id?: string
          sort_order?: number | null
          title: string
          topic_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon_color?: string | null
          icon_name?: string | null
          id?: string
          sort_order?: number | null
          title?: string
          topic_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_content_cards_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_publications: {
        Row: {
          authors: string
          created_at: string
          doi: string | null
          id: string
          is_key_publication: boolean | null
          publication: string | null
          sort_order: number | null
          title: string
          topic_id: number | null
          updated_at: string
          url: string
          year: number
        }
        Insert: {
          authors: string
          created_at?: string
          doi?: string | null
          id?: string
          is_key_publication?: boolean | null
          publication?: string | null
          sort_order?: number | null
          title: string
          topic_id?: number | null
          updated_at?: string
          url: string
          year: number
        }
        Update: {
          authors?: string
          created_at?: string
          doi?: string | null
          id?: string
          is_key_publication?: boolean | null
          publication?: string | null
          sort_order?: number | null
          title?: string
          topic_id?: number | null
          updated_at?: string
          url?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "topic_publications_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_sections: {
        Row: {
          additional_content: string | null
          category_icon: string | null
          category_label: string | null
          created_at: string
          description: string | null
          id: string
          section_type: string
          sort_order: number | null
          subtitle: string | null
          title: string | null
          topic_id: number | null
          updated_at: string
        }
        Insert: {
          additional_content?: string | null
          category_icon?: string | null
          category_label?: string | null
          created_at?: string
          description?: string | null
          id?: string
          section_type: string
          sort_order?: number | null
          subtitle?: string | null
          title?: string | null
          topic_id?: number | null
          updated_at?: string
        }
        Update: {
          additional_content?: string | null
          category_icon?: string | null
          category_label?: string | null
          created_at?: string
          description?: string | null
          id?: string
          section_type?: string
          sort_order?: number | null
          subtitle?: string | null
          title?: string | null
          topic_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_sections_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_visualizations: {
        Row: {
          chart_config: Json | null
          chart_data: Json | null
          chart_type: string
          content_description: string | null
          content_title: string | null
          created_at: string
          id: string
          image_url: string | null
          sort_order: number | null
          source_citation: string | null
          tab_key: string
          tab_label: string
          topic_id: number | null
          updated_at: string
        }
        Insert: {
          chart_config?: Json | null
          chart_data?: Json | null
          chart_type: string
          content_description?: string | null
          content_title?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          sort_order?: number | null
          source_citation?: string | null
          tab_key: string
          tab_label: string
          topic_id?: number | null
          updated_at?: string
        }
        Update: {
          chart_config?: Json | null
          chart_data?: Json | null
          chart_type?: string
          content_description?: string | null
          content_title?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          sort_order?: number | null
          source_citation?: string | null
          tab_key?: string
          tab_label?: string
          topic_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_visualizations_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
