import axios from "axios";

import AuthService from './auth.service';

const service = new AuthService()

class MoneyService {
  constructor() {
    this.apiURl = service.apiURl;
  }

  async FindLastOne() {
    try {
      const rta = await axios.get(this.apiURl + '/money/lastOne', {
        headers: {
          'Authorization': 'Bearer your_token',
          'Content-Type': 'application/json',
          'auth': await service.GetToken()
        }
      })
  
      return rta.data
    } catch (error) {
      return {
        Current: 0
      };
    }
  }

  async GetRecordByDate(date) {
    const [ Year, Month, Day ] = date.split("-");

    const rta = await axios.post(this.apiURl + '/money/findByDate', {
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

  async GetRecordByDateRange(initDate, endDate) {
    const [ InitYear, InitMonth, InitDay ] = initDate.split("-");
    const [ EndYear, EndMonth, EndDay ] = endDate.split("-");

    const rta = await axios.post(this.apiURl + '/money/findByDateRange', {
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

  async Create({ amount, reason, description, date}) {
    const rta = await axios.post(this.apiURl + '/money/', {
      "Amount": Number(amount),
      "Reason": reason,
      "Description": description
    }, {
      headers: {
        'Authorization': 'Bearer your_token',
        'Content-Type': 'application/json',
        'auth': await service.GetToken()
      }
    });

    return rta
  }
}

export default MoneyService;
