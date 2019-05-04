if (process.env.NODE_ENV == 'production') {
   callbackUrl = "https://wish-penny-wise.herokuapp.com/callback"
   console.log(`from auth0-variables: running in production`)
} else {
  callbackUrl = 'http://localhost:3000/callback'
  console.log(`from auth0-variables: running in production`)
}

export const AUTH_CONFIG = {
  domain: 'getpennywise.auth0.com',
  clientId: 'pHFR9v0qziCHxDLrBdxr0ba7KSgAXl0T',
  callbackUrl
  

  // callbackUrl: 'http://localhost:3000/callback'
  // callbackUrl: "https://wish-penny-wise.herokuapp.com/callback"


  
  // apiUrl: 'http://roundup.auth0.com/callback'
}

