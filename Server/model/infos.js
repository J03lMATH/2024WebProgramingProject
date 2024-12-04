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
 * Get all users
 * @returns {Promise<DataListEnvelope<Info>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("infos")
    .select("*", { count: "estimated" });
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
    .select("*")
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
 * @param {Info} info
 * @returns {Promise<DataEnvelope<Info>>}
 */
async function add(info) {
  const { data, error } = await conn
    .from("infos")
    .insert([
      {
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

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Update a user
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
