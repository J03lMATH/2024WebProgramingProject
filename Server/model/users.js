/** @type {{ items: User[] }} */
const data = require("../data/users.json");
const supabase = require("./supabase");
const { getConnection } = require("./supabase");
const conn = getConnection();
const {
  signIn,
  signOut,
  getCurrentUser,
  verifyTokenAsync,
} = require("./supabase");

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
  console.log("Infos:", user.infos.length);
  if (user.infos?.length) {
    await conn
      .from("infos")
      .insert(
        user.infos.map((info) => ({
          userId: data.id,
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

/**
 * login a user
 
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<DataEnvelope<User>>}
 */
async function login(email, password) {
  const { user, error } = await signIn(email, password);
  if (error) {
    console.error("Login Error:", error.message);
  } else {
    console.log("Login Successful", user);
  }
  return {
    isSuccess: !error,
    message: error?.message,
    data: user,
  };
}

/**
 * logout a user
 * @returns {Promise<{isSuccess: boolean, message: string}>}
 */
async function logout() {
  const { error } = await signOut();
  if (error) {
    console.error("Logout Error:", error.message);
  } else {
    console.log("Logout Successful");
  }
  return {
    isSuccess: !error,
    message: error?.message,
  };
}

async function fetchCurrentUser() {
  const { data: user, error } = await getCurrentUser();
  if (error) {
    console.error("Fetch Current User Error:", error.message);
  } else {
    console.log("Fetch Current User Successful", user);
  }
  return {
    isSuccess: !error,
    message: error?.message,
    data: user,
  };
}

async function verifyToken(token) {
  const { user, error } = await verifyTokenAsync(token);
  if (error) {
    console.error("Verify Token Error:", error.message);
  } else {
    console.log("Verify Token Successful", user);
  }
  return {
    isSuccess: !error,
    message: error?.message,
    data: user,
  };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
  login,
  logout,
  fetchCurrentUser,
  verifyToken,
};
