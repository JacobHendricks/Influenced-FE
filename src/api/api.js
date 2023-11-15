import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class InfluencedApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${InfluencedApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  /** Create influencer from data */

  static async addInfluencer(data) {
    let res = await this.request("influencers", data, "post");
    return res.influencer;
  }

  /** Get influencers (filtered by name if not undefined) */

  static async getInfluencers(q) {
    let res = await this.request("influencers", { q });
    return res.influencers;
  }

  /** Get influencers (filtered by category) */
  static async getInfluencersByCategory(category) {
    let res = await this.request(`influencers/category/${category}`);
    return res.influencers;
  }

  /** Search influencers (filtered by name if not undefined) */

  static async searchInfluencers(data) {
    let res = await this.request("influencers/search", data);
    return res.influencers;
  }

  /** Get details on an influencer by id. */

  static async getInfluencer(id) {
    let res = await this.request(`influencers/id/${id}`);
    return res.influencer;
  }

  /** Get influencer id from cid. */

  static async getInfluencerId(cid) {
    let res = await this.request(`influencers/cid/${cid}`);
    return res.influencerId.id;
  }

  /** Get influencer ratings by influencer id. */
  static async getInfluencerRatings(id) {
    let res = await this.request(`influencers/id/${id}/ratings`);
    return res.ratings;
  }

  /** create a rating */

  static async addRating(data) {
    await this.request(`ratings`, data, "post");
  }

  /** Get list of jobs (filtered by title if not undefined) */

  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Get influencer ratings by influencer id. */
  static async updateInfluencerScores(id) {
    console.log("FINAL ID2", id)
    let res = await this.request(`influencers/updateScores/${id}`, {}, "patch");
    return res.scores;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(id, data) {
    let res = await this.request(`users/${id}`, data, "patch");
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
// InfluencedApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default InfluencedApi;