require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

module.exports = {
  getConnection() {
    return supabase;
  },

  /**
   * Authenticate a user via email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: object|null, error: object|null}>}
   */
  async signIn(email, password) {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user, error };
  },

  /**
   * Log out the current user
   * @returns {Promise<{error: object|null}>}
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Get the current authenticated user
   * @returns {object|null}
   */
  getCurrentUser() {
    return supabase.auth.getUser();
  },

  /**
   * Verify a token asynchronously
   * @param {string} token
   * @returns {Promise<{user: object|null, error: object|null}>}
   */
  async verifyTokenAsync(token) {
    const { data: user, error } = await supabase.auth.getUser(token);
    return { user, error };
  },
};
