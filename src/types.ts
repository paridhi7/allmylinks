import { FieldValue } from "firebase/firestore";

export type LinkType = {
  id: string;
  title: string;
  url: string;
  timestamp: FieldValue;
  userId: string | null;
  isActive: boolean;
  order: number;
};
