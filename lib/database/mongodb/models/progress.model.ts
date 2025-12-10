import { Schema, model, models } from "mongoose";

const ProgressSchema = new Schema({
  userId: { 
    type: String, 
    required: true,
    index: true // Index za brže pretraživanje
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  weight: { 
    type: Number, 
    required: false 
  },
  measurements: {
    chest: { type: Number, required: false }, // Obim grudi (cm)
    waist: { type: Number, required: false }, // Obim struka (cm)
    hips: { type: Number, required: false }, // Obim kukova (cm)
    arm: { type: Number, required: false }, // Obim ruke (cm)
    thigh: { type: Number, required: false }, // Obim butine (cm)
  },
  photos: [{
    url: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['front', 'side', 'back', 'other'],
      default: 'front'
    },
    uploadedAt: { type: Date, default: Date.now }
  }],
  notes: { 
    type: String, 
    required: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Index za brže pretraživanje po userId i datumu
ProgressSchema.index({ userId: 1, date: -1 });

const Progress = models.Progress || model("Progress", ProgressSchema);

export default Progress;

