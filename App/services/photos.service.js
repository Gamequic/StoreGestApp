import axios from "axios";

import AuthService from './auth.service';

const service = new AuthService()

class FoodService {
  constructor() {
    this.apiURl = service.apiURl;
  }

  FindOne(photoName) {
    /*
      The timestamp always generate an unique url,
      so the image do not get cached ( in case it changes/get updated)

      The query t is not required for the image
    */
    const timestamp = new Date().getTime();
    return `${this.apiURl + "/photos/static/" + photoName}?t=${timestamp}`;
  }

  async Update (photo, photoName) {
    if (photo.uri === undefined) {
      throw Error("Missing photo")
    }

    try {
        const formData = new FormData();

        const filename = photo.uri.split("/").pop()

        const fileType = filename.split('.').pop();

        const file = {
          uri: photo.uri,
          name: filename,
          type: `image/${fileType}`,
        };

        formData.append('file', file);

        const rta = await axios.patch(this.apiURl + '/photos/' + photoName, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth': await service.GetToken()
          },
        });

        return rta.data.route;
    } catch (error) {
      throw error;
    }
  }

  async Create(photo) {
    if (photo.uri === undefined) {
      throw Error("Missing photo")
    }

    try {
        const formData = new FormData();

        const filename = photo.uri.split("/").pop()

        const fileType = filename.split('.').pop();

        const file = {
            uri: photo.uri,
            name: filename,
            type: `image/${fileType}`,
        };

        formData.append('file', file);

        const rta = await axios.post(this.apiURl + '/photos/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'auth': await service.GetToken()
            },
          });

        return rta.data.route;
    } catch (error) {
        throw error;
    }
  }
  
}

export default FoodService;
