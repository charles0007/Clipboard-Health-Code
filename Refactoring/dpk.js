const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");


exports.deterministicPartitionkey = (event) => {
  let candidate;
  if (event && event.partitionkey) {
      candidate = event.partitionkey;
  } else {
      candidate = TRIVIAL_PARTITION_KEY;
  }
  if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = hash(candidate);
  }
  return candidate;
};