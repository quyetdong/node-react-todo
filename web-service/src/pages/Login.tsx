import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import axios from 'axios'

export const Login: React.FC = () => {
  const fetchAuthUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_USER_AUTH_URL || '',
        {
          withCredentials: true,
        }
      )

      if (response && response.data) {
        console.log('User: ', response.data)
      }
    } catch (err: any) {
      console.log('Not properly authenticated ', err.message)
    }
  }

  const redirectToGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null
    const googleLoginUrl = process.env.REACT_APP_GOOGLE_AUTH_URL
    const newWindow = window.open(
      googleLoginUrl,
      '_blank',
      'width=500,height=600'
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated")
          fetchAuthUser()
          if (timer) clearInterval(timer)
        }
      }, 500)
    }
  }

  return (
    <div className="login">
      <Fragment>
        <Link to="/login/google">
          <GoogleButton onClick={redirectToGoogleSSO} />
        </Link>
      </Fragment>
    </div>
  )
}
