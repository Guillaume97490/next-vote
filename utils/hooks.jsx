import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

// const fetcher = (url) =>
//   fetch(url)
//     .then((r) => r.json())
//     .then((data) => {
//       return { user: data?.user || null }
//     })

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR('/api/auth/user', fetcher)
  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}

const fetcher = (...args) => fetch(...args).then(res => res.json())
export function useVotes(filter, page){
    let query = ""
    if (filter == "/mes-votes") query = "&createdBy=true"
    if (filter == "/en-cours") query = "&inprogress=true"
    if (filter == "/termines") query = "&finished=true"
  
  const { data, error } = useSWR(`/api/votes?page=${page}${query}`, fetcher)
  return {
    votes: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useVote(voteId){
  const { data, error } = useSWR(`/api/votes/${voteId}`, fetcher)
  return {
    vote: data,
    isLoading: !error && !data,
    isError: error
  }
}
export function useResult(voteId){
  const { data, error } = useSWR(`/api/votes/${voteId}/result`, fetcher)
  return {
    result: data,
    isLoading: !error && !data,
    isError: error
  }
}