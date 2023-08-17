import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchOneAsteroid } from '@/shared/api/routes/asteroids'
import { DetailCard } from '@/components/DetailCard/DetailCard'
import { AsteroidData } from '@/shared/interfaces/interfaces'
import s from './detailPage.module.scss'

export const DetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [oneAsteroid, setOneAsteroid] = useState<AsteroidData>(
    {} as AsteroidData
  )

  useEffect(() => {
    fetchOneAsteroid(id as string).then(res => setOneAsteroid(res.data))
  }, [id])

  return <DetailCard oneAsteroid={oneAsteroid} />
}
