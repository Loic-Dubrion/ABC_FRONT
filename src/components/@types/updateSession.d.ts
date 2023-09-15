export interface IUpdateSession {
  name: string;
  sequence_id: number;
  tool_id: number;
  comments: string;
  time: number;
  is_face_to_face: boolean;
  is_group_work: boolean;
  equipment: string;
}
