import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role:    { type: String, required: true },
  status:  { type: String, enum: ["applied","interview","offer","rejected"], default: "applied" },
  notes:   String,
  followUpOn: Date
},{ timestamps:true });

export default mongoose.model("Application", ApplicationSchema);
