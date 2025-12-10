export type ProgressEntry = {
  _id: string;
  userId: string;
  date: Date | string;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arm?: number;
    thigh?: number;
  };
  photos?: Array<{
    url: string;
    type: 'front' | 'side' | 'back' | 'other';
    uploadedAt: Date | string;
  }>;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type CreateProgressParams = {
  userId: string;
  date?: Date;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arm?: number;
    thigh?: number;
  };
  photos?: Array<{
    url: string;
    type?: 'front' | 'side' | 'back' | 'other';
  }>;
  notes?: string;
};

