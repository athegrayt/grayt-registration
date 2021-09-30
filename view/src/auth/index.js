import { API } from "../config"

export const signup = (user) => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    }).then(res => { 
      return res.json()
    })
      .catch(err => {
      console.log(err)
    })
  }
export const signin = (user) => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    }).then(res => { 
      return res.json()
    })
      .catch(err => {
      console.log(err)
    })
}
export const accountLookup = (email) => {
    return fetch(`${API}/account-lookup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type":"application/json"
      },
      body: JSON.stringify(email)
    }).then(res => { 
      return res.json()
    })
      .catch(err => {
      console.log(err)
    })
}
export const verifyLink = (id, token) => {
    return fetch(`${API}/reset-password/${id}/${token}`, {
      method: "GET"
    }).then(res => { 
      return res.json()
    })
      .catch(err => {
      console.log(err)
    })
}

export const resetPassword = (id, password) => { 
  return fetch(`${API}/reset-password/${id}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.slice(2)}`
      },
      body: JSON.stringify({password})
  }).then(res => {
      return res.json()
    })
      .catch(err => {
      console.log(err)
    })
}
  
export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data))
    next()
  }
}

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt")
    next()
    return fetch(`${API}/signout`, {
      method:"GET"
    })
      .then(response => {
      console.log('signout', response)
      })
    .catch(err=>console.log(err))
  }
}

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  } else {
    return false
  }
}
