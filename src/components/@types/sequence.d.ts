export interface ISequence {
  sequence_id: number;
  sequence_name: string;
  sessions: Session[];
}

export interface ISession {
  card_name: string;
  comments: string;
  equipment: string;
  is_face_to_face: boolean;
  is_group_work: boolean;
  level_name: string;
  session_id: number;
  session_name: string;
  time: number;
  tool_name: string;
  color: string;
  card_id: number;
}
