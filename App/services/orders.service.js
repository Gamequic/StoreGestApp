import axios from "axios";

import AuthService from './auth.service';

const service = new AuthService()

class FoodService {
  constructor() {
    this.apiURl = service.apiURl;
  }

  async Find() {
    const rta = await axios.get(this.apiURl + '/orders/', {
      headers: {
          'Authorization': 'Bearer your_token',
          'Content-Type': 'application/json',
          'auth': await service.GetToken()
        }
      })
  
      return rta.data
  }

  async GetRecordByDate(date) {
    const [ Year, Month, Day ] = date.split("-");

    const rta = await axios.post(this.apiURl + '/orders/findByDate', {
      "Year": Number(Year),
      "Month": Number(Month),
      "Day": Number(Day)
    }, {
      headers: {
        'Authorization': 'Bearer your_token',
        'Content-Type': 'application/json',
        'auth': await service.GetToken()
      }
    });

    return rta.data
  }

  async Create({ Amount, foodListId }) {
    try {
      let FoodList = []
      let FoodAmount = []

      foodListId.forEach((food, index) => {
        FoodList.push(food.ID)
        FoodAmount.push(Number(food.Amount))
      })

      const rta = await axios.post(this.apiURl + '/orders/', {
        Amount, FoodList, FoodAmount
      }, {
        headers: {
          'Authorization': 'Bearer your_token',
          'Content-Type': 'application/json',
          'auth': await service.GetToken()
        }
      });
      return rta;

    } catch (error) {
      throw error;
    }
  }

  async statistics(initDate, endDate) {

    const [ InitYear, InitMonth, InitDay ] = initDate.split("-");
    const [ EndYear, EndMonth, EndDay ] = endDate.split("-");

    const rta = await axios.post(this.apiURl + '/orders/statistics', {
      "InitYear": Number(InitYear),
      "InitMonth": Number(InitMonth),
      "InitDay": Number(InitDay),
      "EndYear": Number(EndYear),
      "EndMonth": Number(EndMonth),
      "EndDay": Number(EndDay),
    }, {
      headers: {
        'Authorization': 'Bearer your_token',
        'Content-Type': 'application/json',
        'auth': await service.GetToken()
      }
    });
  
    return rta.data
  }
  
}

export default FoodService;
