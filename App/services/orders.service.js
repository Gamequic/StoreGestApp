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

//   async FindOne(id) {
//     const rta = await axios.get(this.apiURl + '/food/' + id, {
//       headers: {
//         'Authorization': 'Bearer your_token',
//         'Content-Type': 'application/json',
//         'auth': await service.GetToken()
//       }
//     })

//     return rta.data
//   }

//   async Update({ ID, Amount, Name, IsKg }) {
//     try {
//       const rta = await axios.patch(this.apiURl + '/food/', {
//         ID, Name, Amount, IsKg
//       }, {
//         headers: {
//           'Authorization': 'Bearer your_token',
//           'Content-Type': 'application/json',
//           'auth': await service.GetToken()
//         }
//       });
//       return rta;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async Delete(ID) {
//     try {
//       const rta = await axios.delete(this.apiURl + '/food/' + ID, {
//         headers: {
//           'Authorization': 'Bearer your_token',
//           'Content-Type': 'application/json',
//           'auth': await service.GetToken()
//         }
//       });
//       return rta;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async Create({ Amount, Name, IsKg }) {
//     try {
//       const rta = await axios.post(this.apiURl + '/food/', {
//         "Amount": Number(Amount),
//         "IsKg": IsKg,
//         "Name": Name
//       }, {
//         headers: {
//           'Authorization': 'Bearer your_token',
//           'Content-Type': 'application/json',
//           'auth': await service.GetToken()
//         }
//       });
//       return rta;
//     } catch (error) {
//       throw error;
//     }
//   }
  
}

export default FoodService;
