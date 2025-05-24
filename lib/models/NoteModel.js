import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema({
  note: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseModel",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
}, { timestamps: true });

const NoteModel = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default NoteModel;
