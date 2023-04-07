export const REGEX = {
    PASSWORD: /^(?=.*[A-Za-z])(?=(.*[\d]){1,})(?=.*?[^\w\s]).{8,}$/, //Contains 8 characters atleast 1 number, 1 alphabet, 1 special char
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    ONLY_ALPHABETS: /^([a-zA-Z]+)$/,
    PHONE_NUMBER: /^[6-9]{1}[0-9]{9}$/,
    NUMBER_GREATER_THAN_0: /^([1-9][0-9]*(\.[0-9]+)?)|(0+[0-9]*[1-9][0-9]*$)/,
    NUMBER_GREATER_THAN_0_OR_EQUAL_TO_ZERO: /^[0-9]*$/,
    ALPHA_NUMERIC: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/,
    ADDRESS: /^[a-zA-Z0-9\s,.'-]{3,}$/,
    NAME: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
    DOB: /[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(\w+\s\w+\s\w+\)/
}

export const PARENT_PATHS = {
    DEFAULT: '',
    AUTH: 'auth',
    MAIN: 'main',
    ADMIN:'admin',
    SHARED:'shared',
    WILDCARD: '**',
    USER_PROFILE:'user-profile'
  }

  export const PATHS = {
    AUTH: {
        LOGIN: 'login',
        REGISTER: 'register',
        FORGOT_PASSWORD: 'forgot-password',
        RESET_PASSWORD: 'reset-password',
        GET_OTP: 'otp'
    },
    MAIN: {
      DASHBOARD: 'home',
      PROFILE: 'profile',
      YOUR_LIBRARY:'my-library',
      LIKED_SONGS:'liked-songs',
      PLAYLISTS:'playlist/:id',
      PLAYLIST:'playlist',
      CREATE_PLAYLIST:'create_playlist'
  },
  SHARED:{
    NAVBAR:'navbar'
  },
  ADMIN:{
    ADD_SONGS:'add-songs'
  }
  } 

export const APIS ={
  AUTH:{
    SIGNUP: 'users/'
  },
  ALL_SONGS:{
    SONGS:'allSongs',
    MY_SONGS:'songsLibrary/',
    ADD_TO_PLAYLIST:'playlists/'
  },
  USER_PROFILE:{
    MY_PROFILE:'users/'
  }
}

  export const STORAGE_KEYS={
    TOKEN:'token',
    VERIFICATION_ID:'VerificationCode',
    UNIQUE_ID:'user_data',
    FIREBASE_ID:'id'
  }

  let userData:any=localStorage.getItem(STORAGE_KEYS.UNIQUE_ID)
  userData=JSON.parse(userData) 
  export {userData}

  export const SONG_LIBRARY={
    MY_LIKED_LIST:'/likedSongs',
    RECENTLY_PLAYED:'/played'
  }

  