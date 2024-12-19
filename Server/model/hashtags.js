/** @type {{ items: Hashtag[]}} */
const data = require("../data/hashtags.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/hashtags").Hashtag} Hashtag
 */

/**
 * Get all hashtags
 * @returns {Promise<DataListEnvelope<Hashtag>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("hashtags")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * add a new hashtag
 * @param {Hashtag} hashtag
 * @param {number} infoId
 * @returns {Promise<DataEnvelope<Hashtag>>}
 */
async function add(infoId, hashtag) {
  const { data, error } = await conn.from("hashtags").insert([
    {
      infoId: infoId,
      name: hashtag.name,
    },
  ]);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

module.exports = {
  getAll,
  add,
};
