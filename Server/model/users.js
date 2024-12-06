/** @type {{ items: User[] }} */
const data = require("../data/users.json");
const supabase = require("./supabase");
const { getConnection } = require("./supabase");
const conn = getConnection();
const jwt = require("jsonwebtoken");
const {
  signIn,
  signOut,
  getCurrentUser,
  verifyTokenAsync,
  signUp,
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
 * Get all users with infos
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAllWithInfos() {
  const { data, error, count } = await conn
    .from("users")
    .select("*, infos(*)", { count: "estimated" });
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
 * Get a user by email and password
 * @param {string} email
 * @returns {Promise<DataEnvelope<User>>}
 */
async function getByLogin(email) {
  const { data, error } = await conn
    .from("users")
    .select("*, infos(*)")
    .eq("email", email)
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
  console.log("Error:", error);
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

async function createToken(user, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userid: user.userid, email: user.email },
      process.env.JWT_SECRET ?? "",
      { expiresIn },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET ?? "", (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

/**
 *
 * @param {number} userId
 * @returns
 */

async function getInfos(userId) {
  const { data, error } = await conn
    .from("infos")
    .select("*")
    .eq("userId", userId);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}
/**
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
async function signingUp(email, password) {
  const { user, error } = await signUp(email, password);
  if (error) {
    console.error("Sign Up Error:", error.message);
  }
  return {
    isSuccess: !error,
    message: error?.message,
    data: user,
  };
}

//trying to set up a login by session once working will delete the other login fucntions
async function loginByData(email, password) {
  console.log("Login by Data", email, password);
  const { data, error } = await conn
    .from("users")
    .select("*, infos(*)")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error) {
    console.error("Login by Data Error:", error.message);
    return {
      isSuccess: false,
      message: error.message,
      data: null,
      token: null,
    };
  }

  const token = await createToken(data, 1234567);
  return {
    isSuccess: true,
    message: "User Logged In",
    data: { data, token },
  };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
  login, //Login in user based on Auth Users in Supabase
  logout,
  fetchCurrentUser,
  verifyToken,
  createToken,
  getInfos,
  signingUp,
  getByLogin, //getUser by Email and Password
  getAllWithInfos,
  loginByData, //Login by Data
};
