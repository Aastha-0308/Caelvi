import Counter from "../models/Counter.js";

async function genNextId() {
  const { seq } = await Counter.findByIdAndUpdate(
    'userIdCounter',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return seq;
}

export default genNextId