import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import  PopularJobCard  from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hooks/useFetch'

import styles from './popularjobs.style'

const Popularjobs = () => {
  const router = useRouter()
  
  const {data, isLoading, error } =useFetch('search',{
    query: 'React Developer',
    num_pages: '1'
  })

  const [selectedJob, setSelectedJob ]= useState()

  const handleCardPress = (item)=>{
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
    
  }

  return (
    <View style={styles.cardsContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading 
          ? <ActivityIndicator size='large' />
          : error
          ? <Text> Something went wrong  </Text>
          : <FlatList
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={item=>item?.job_id}
              contentContainerStyle={{columnGap: SIZES.medium}}
              horizontal
            />
        }
      </View>
    </View>
  )
}

export default Popularjobs