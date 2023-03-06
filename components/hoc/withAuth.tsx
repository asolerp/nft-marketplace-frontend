/* eslint-disable react/display-name */

import { useGlobal } from '@providers/global'
import { GlobalTypes } from '@providers/global/utils'
import axios from 'axios'
import axiosClient from 'lib/fetcher/axiosInstance'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const Router = useRouter()
    const [verified, setVerified] = useState(false)
    const { dispatch } = useGlobal()

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const accessToken = localStorage.getItem('token')
          // if no accessToken was found,then we redirect to "/" page.
          if (!accessToken) {
            Router.replace('/')
          } else {
            // we call the api that verifies the token.
            const data = await axios.get('/api/user/verify', {
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
              dispatch({
                type: GlobalTypes.SET_TOKEN,
                payload: { token: null },
              })
              Router.replace('/')
            }
          }
        } catch (e: any) {
          if (e.response.status === 401) {
            localStorage.removeItem('token')
            dispatch({
              type: GlobalTypes.SET_TOKEN,
              payload: { token: null },
            })
            Router.replace('/')
          }
          if (e.response.status === 403) {
            try {
              const refreshToken = localStorage.getItem('refresh-token')
              if (!refreshToken) {
                Router.replace('/')
              } else {
                const res = await axiosClient.post('/api/user/refresh', {
                  token: refreshToken,
                })

                if (res) {
                  setVerified(true)
                  localStorage.setItem('token', res.data.token)
                }
              }
            } catch {
              localStorage.removeItem('token')
              localStorage.removeItem('refresh-token')
              dispatch({
                type: GlobalTypes.SET_TOKEN,
                payload: { token: null },
              })
              Router.replace('/')
            }
          }
        }
      }
      verifyToken()
    }, [Router, dispatch])

    if (verified) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }
}

export default withAuth
