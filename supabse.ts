export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      security_events: {
        Row: {
          id: string
          created_at: string
          event_type: string
          severity: 'low' | 'medium' | 'high' | 'critical'
          source_ip: string
          description: string
          raw_data: Json
        }
        Insert: {
          id?: string
          created_at?: string
          event_type: string
          severity: 'low' | 'medium' | 'high' | 'critical'
          source_ip: string
          description: string
          raw_data?: Json
        }
        Update: {
          id?: string
          created_at?: string
          event_type?: string
          severity?: 'low' | 'medium' | 'high' | 'critical'
          source_ip?: string
          description?: string
          raw_data?: Json
        }
      }
    }
  }
}
