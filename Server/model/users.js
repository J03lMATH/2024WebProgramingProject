/** @type {{ items: User[] }} */
const data = require("../data/users.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/user").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("users")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*, infos(*)")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
  const { data, error } = await conn
    .from("users")
    .insert([
      {
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        age: user.age,
        admin: user.admin,
        image: user.image,
        address: user.address,
      },
    ])
    .select("*")
    .single();

  console.log("Data:", data);
  console.log("Error:", error);
  if (user.infos?.length) {
    await conn;
    try {
      const infosInsert = await conn
        .from("infos")
        .insert(
          user.infos.map((info) => ({
            userID: data.id,
            title: info.title,
            type: info.type,
            date: info.date,
            distance: info.distance,
            duration: info.duration,
            calories: info.calories,
            avgPace: info.avgPace,
            image: info.image,
          }))
        )
        .select("*");

      if (infosInsert.error) {
        throw infosInsert.error;
      }
    } catch (err) {
      return {
        isSuccess: false,
        message: `Error adding infos: ${err.message}`,
        data: null,
      };
    }
  }
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function seed() {
  for (const user of data.items) {
    await add(user);
  }
}

/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(id, user) {
  const { data, error } = await conn
    .from("users")
    .update({
      name: user.name,
      email: user.email,
      password: user.password,
      age: user.age,
      admin: user.admin,
      image: user.image,
      address: user.address,
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
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("users")
    .delete()
    .eq("id", id)
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
  seed,
};
