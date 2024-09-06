export const BASE_URL = 'https://dfhapi.doctorsforhealth.co.uk/api/v2/DoctorforHealth';

export const config = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }