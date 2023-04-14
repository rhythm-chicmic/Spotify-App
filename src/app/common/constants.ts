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
    DOB: /[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(\w+\s\w+\s\w+\)/,
    IMAGE:/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif|.jpeg|.webp)$/,
    MP3:/(.*\.mp3)/
}

export const PARENT_PATHS = {
    DEFAULT: '',
    AUTH: 'auth',
    MAIN: 'main',
    ADMIN:'admin',
    SHARED:'shared',
    WILDCARD: '**',
    USER_PROFILE:'user-profile',
    PAYMENT:'payment'
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
    NAVBAR:'navbar',
    PRIVACY_POLICY:'privacy-policy',
    COOKIES:'cookies'
  },
  ADMIN:{
    ADD_SONGS:'add-songs'
  },
  PAYMENT:{
    PAY_MONEY:'pay-money',
    TRANSACTION_HISTORY:'transaction-history'
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
  },
  TRANSACTION:{
    POST_SONG_BUY_DATA:'transaction/',
    GET_SONG_BUY_DATA:'transaction/'
  },
  EVENT_TRACK:{
    PLAYLIST_TRACK:'eventTrack/',

  },
  MOST_PLAYED_SONGS:{
    POST_PLAYED_SONGS:'mostPlayedSongs/'
  }
}

  export const STORAGE_KEYS={
    TOKEN:'token',
    VERIFICATION_ID:'VerificationCode',
    UNIQUE_ID:'user_data',
    FIREBASE_ID:'id',
    USER_PROFILE:'userProfile'
    
  }

  let userData:any=localStorage.getItem(STORAGE_KEYS.UNIQUE_ID)
  userData=JSON.parse(userData) 
  export {userData}

  export const SONG_LIBRARY={
    MY_LIKED_LIST:'/likedSongs',
    RECENTLY_PLAYED:'/played',
    SONG_ID:'/songId'
  }

 export const IMAGES={
  ADD_PROFILE_IMAGE:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp',
  LIKED_SONGS_IMAGE:'https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp',
  LIKED_SONGS_BANNER_IMAGE:'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/bologna-3.jpg'
 } 

export const IS_SONG_PAID=['Yes','No']

export const STRIPE_KEYS ={
  SECRET_KEY:'sk_test_51MvHaBSGq7tprvVChzZUHit3fnKEAiz2GfbFnUrsA3MRlxKy65rVGpXmlMoYps2J4eJGfUqLdZNwiF8fj0fxwM7i00T1M0wAWA',
  PUBLIC_KEY:'pk_test_51MvHaBSGq7tprvVCWj6hmCgOIw8a0O6UZ1iRI0rbzmKMmgAeFZ7FgbjCLHhJoE1QAOFoL4SVg8U19aPiOZVsnwt200efatgtzf'
}