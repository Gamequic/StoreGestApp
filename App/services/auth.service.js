import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
  constructor() {
    this.apiURl = 'http://192.168.1.236:8080/api';
    this.userKey = "userData";
  }

  async GetUserData() {
    const data = await AsyncStorage.getItem(this.userKey);
    console.log("Retrieved user data:", data);
    return JSON.parse(data);
  }

  async SaveUserData(data) {
    console.log("Saving user data:", data);
    await AsyncStorage.setItem(
      this.userKey,
      JSON.stringify({
        ...data,
        time: new Date(),
      })
    );
  }

  async GetToken() {
    const data = await this.GetUserData();
    const time = new Date(data.time);
    const nowTime = new Date();
    const differenceInMinutes = (nowTime - time) / (1000 * 60);

    console.log("Token age in minutes:", differenceInMinutes);

    if (differenceInMinutes > 25) {
      console.log("Token expired, logging in...");
      await this.LogIn({ email: data.email, password: data.password });
      const user = await this.GetUserData();
      return user.token;
    } else {
      console.log("Returning existing token.");
      return data.token;
    }
  }

  async SignUp({ name, email, password }) {
    const body = { name, email, password };
    console.log("Signing up with data:", body);

    try {
      const rta = await axios.post(this.apiURl + '/user/create', body);
      console.log("Sign up response:", rta);
      await this.LogIn({ email, password });
      return rta;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error; // Rethrow the error after logging
    }
  }

  async LogIn({ email, password }) {
    const body = { email, password };
    console.log("Logging in with data:", body);

    try {
      const rta = await axios.post(this.apiURl + '/auth/login', body);
      console.log("Login response:", rta);

      await this.SaveUserData({
        token: rta.data.token, // Assuming the token is in rta.data.token
        email,
        password
      });

      return {
        rta,
        api: this.apiURl + '/auth/login'
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Rethrow the error after logging
    }
  }
}

export default AuthService;
