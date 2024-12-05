/**@type {{ items: ExerciseType[] }} */
const data = require("../data/exerciseType.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 *  @typedef {import("../../Client/src/models/exerciseType").ExerciseType} ExerciseType
 */

/**
 * Get all exerciseTypes
 * @returns {Promise<DataListEnvelope<ExerciseType>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("exerciseType")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a exerciseType by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<ExerciseType>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("exerciseType")
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
 * Add a new exerciseType
 * @param {ExerciseType} exerciseType
 * @returns {Promise<DataEnvelope<ExerciseType>>}
 */

async function add(exerciseType) {
  const { data, error } = await conn
    .from("exerciseType")
    .insert([
      {
        name: exerciseType.name,
        description: exerciseType.description,
      },
    ])
    .select("*")
    .single();
  console.log("Data:", data);
  console.log("Error:", error);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Update a exerciseType
 * @param {number} id
 * @param {ExerciseType} exerciseType
 * @returns {Promise<DataEnvelope<ExerciseType>>}
 */
async function update(id, exerciseType) {
  const { data, error } = await conn
    .from("exerciseType")
    .update({
      name: exerciseType.name,
      description: exerciseType.description,
    })
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Remove a exerciseType
 * @param {number} id
 * @returns {Promise<DataEnvelope<ExerciseType>>}
 */

async function remove(id) {
  const { data, error } = await conn
    .from("exerciseType")
    .delete()
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

// Seed the database with the data from data/exerciseType.json
async function seed() {
  for (const exerciseType of data.items) {
    await add(exerciseType);
  }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
};
