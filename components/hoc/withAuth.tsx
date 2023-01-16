/* eslint-disable react/display-name */

import axios from 'axios'
import axiosClient from 'lib/fetcher/axiosInstance'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const Router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const accessToken = localStorage.getItem('token')
          // if no accessToken was found,then we redirect to "/" page.
          if (!accessToken) {
            Router.replace('/')
          } else {
            // we call the api that verifies the token.
            const data = await axios.get('/user/verify', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            // if token was verified we set the state.
            if (data) {
              setVerified(true)
            } else {
              // If the token was fraud we first remove it from localStorage and then redirect to "/"
              localStorage.removeItem('token')
              Router.replace('/')
            }
          }
        } catch (e: any) {
          if (e.response.status === 401) {
            localStorage.removeItem('token')
            Router.replace('/')
          }
          if (e.response.status === 403) {
            try {
              const refreshToken = localStorage.getItem('refresh-token')
              if (!refreshToken) {
                Router.replace('/')
              } else {
                const res = await axiosClient.post('/user/refresh', {
                  token: refreshToken,
                })
                console.log('REFRESH RES', res)
                if (res) {
                  setVerified(true)
                  localStorage.setItem('token', res.data.token)
                }
              }
            } catch {
              localStorage.removeItem('token')
              localStorage.removeItem('refresh-token')
              Router.replace('/')
            }
          }
        }
      }
      verifyToken()
    }, [Router])

    if (verified) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}

export default withAuth
