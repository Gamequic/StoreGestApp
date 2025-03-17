import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
  constructor() {
    this.apiURl = 'http://192.168.1.236:8080/api';
    this.userKey = "userData";
  }

  async GetUserData() {
    const data = await AsyncStorage.getItem(this.userKey);
    return JSON.parse(data);
  }

  async SaveUserData(data) {
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

    if (differenceInMinutes > 25) {
      await this.LogIn({ email: data.email, password: data.password });
      const user = await this.GetUserData();
      return user.token;
    } else {
      return data.token;
    }
  }

  async SignUp({ name, email, password }) {
    const body = { name, email, password };

    try {
      const rta = await axios.post(this.apiURl + '/user/create', body);
      await this.LogIn({ email, password });
      return rta;
    } catch (error) {
      throw error; // Rethrow the error after logging
    }
  }

  async LogIn({ email, password }) {
    const body = { email, password };

    try {
      const rta = await axios.post(this.apiURl + '/auth/login', body);

      await this.SaveUserData({
        token: rta.data.Token,
        name: rta.data.Name,
        email,
        password
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Rethrow the error after logging
    }
  }
}

export default AuthService;
