import axios, { AxiosResponse, AxiosError } from 'axios';

export async function getGoogleProfileData(token:string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${token}`
      );
      return response.data;
    } catch (error) {
      // Handle the error here, you can log it or throw a custom error if needed
      console.error('Error fetching profile data:', error);
      return null; // Return null for error case
    }
  }


export  async function getFacebookProfileData(accessToken:string) {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching Facebook profile data:', error);
      return null;
    }
  }