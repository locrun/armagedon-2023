import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Basket, AsteroidsList } from '@/components'
import { OptionDistance } from '@/components/OptionDistance/OptionDistance'
import { useGlobalContext } from '@/features/Context/store'
import { fetchAsteroidList } from '@/shared/api/routes/asteroids'
import { formatAsteroidData } from '@/shared/utils/formatAsteroidData'

import { ResponseData } from '@/shared/interfaces/interfaces'

import s from './homePage.module.scss'

export const HomePage = () => {
  const date = new Date()
  const start_date = date.toISOString().slice(0, 10)

  const { setAsteroidData, asteroidData, cartItemId } = useGlobalContext()
  const [dataFromServer, setDataFromServer] = useState<ResponseData>()

  const [count, setCount] = useState<number>(0)
  const [startDate] = useState<string>(start_date)
  const [endDate, setEndDate] = useState<string>(start_date)

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() + count)
    const formattedDate = date.toISOString().slice(0, 10)
    setEndDate(formattedDate)
  }, [count])

  useEffect(() => {
    if (inView) setCount(prev => (prev += 1))
  }, [inView])

  useEffect(() => {
    fetchAsteroidList(startDate, endDate)
      .then(res => setDataFromServer(res.data))
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
        } else if (error.request) {
          console.log(error.request)
        }
      })
      .finally()
  }, [startDate, endDate, setDataFromServer])

  useEffect(() => {
    if (dataFromServer) {
      const concactArray = Object.values(
        dataFromServer?.near_earth_objects || {}
      ).flat()

      const sortedArray = concactArray.sort((a, b) =>
        a.close_approach_data[0].close_approach_date >
        b.close_approach_data[0].close_approach_date
          ? 1
          : -1
      )
      setAsteroidData(sortedArray)
    }
  }, [dataFromServer, setAsteroidData])

  const newFormattedAsteroidsData = asteroidData?.map(formatAsteroidData)

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>Ближайшие подлёты астероидов</h1>
        <OptionDistance />
        <AsteroidsList asteroids={newFormattedAsteroidsData} />
        <div ref={ref} className={s.label}></div>
      </div>
      <Basket itemCount={cartItemId.length} />
    </>
  )
}
