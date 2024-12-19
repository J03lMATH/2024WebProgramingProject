/** @type {{ items: Info[] }} */
const data = require("../data/infos.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/infos").Info} Info
 */

/**
 * Get all infos (Infos are the activitise that the user has done)
 * @returns {Promise<DataListEnvelope<Info>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("infos")
    .select("*, hashtags(*)", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a info by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Info>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("infos")
    .select("*, hashtags(*)")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new info to user
 * @param {number} userId
 * @param {Info} info
 * @returns {Promise<DataEnvelope<Info>>}
 */
async function add(userId, info) {
  const { data, error } = await conn
    .from("infos")
    .insert([
      {
        userId: userId,
        title: info.title,
        type: info.type,
        date: info.date,
        distance: info.distance,
        duration: info.duration,
        calories: info.calories,
        avgPace: info.avgPace,
        image: info.image,
      },
    ])
    .select("*")
    .single();
  if (info.hashtags?.length) {
    await conn
      .from("hashtags")
      .insert(
        info.hashtags.map((hashtag) => ({
          infoId: data.id,
          name: hashtag.name,
        }))
      )
      .select("*");
  }
  console.log("Data:", data);
  console.log("Error:", error);

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Update a info
 * @param {number} id
 * @param {Info} info
 * @returns {Promise<DataEnvelope<Info>>}
 */
async function update(id, info) {
  const { data, error } = await conn
    .from("infos")
    .update({
      title: info.title,
      type: info.type,
      date: info.date,
      distance: info.distance,
      duration: info.duration,
      calories: info.calories,
      avgPace: info.avgPace,
      image: info.image,
    })
    .eq("id", id)
    .select("*")
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("infos")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
