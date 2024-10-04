"use client"
import React, {useState, useEffect} from 'react'
import Image from "next/image"
import {Box, Card, ListItem, Skeleton, Typography} from "@mui/material"
import { ImageNotSupportedOutlined } from '@mui/icons-material'
import {Tables} from "@/types/supabase_types"
import { getWhiskeyImg } from '@/utils/supabase/queries/clientQueries'

type Props = {
  whiskey: Tables<"whiskey"> 
}

const WhiskeyListingCard = ({whiskey}: Props) => {
  const [loading, setLoading] = useState(true)
  const [img, setImg] = useState<string>()
  useEffect(() => {
    (async () => {
      const path = await getWhiskeyImg(whiskey)
      setImg(path)
      setLoading(false)
    })()
  
    return () => {
    }
  }, [img, whiskey])
  
  return (
    <Card key={`whiskey-${whiskey.id}`} elevation={4}>
          <ListItem divider>
            {img ? (
              <Box sx={{flexGrow: 1}}>
                <Image
                  alt={whiskey.name + "-image"}
                  src={img}
                  width={50}
                  height={50}
                />
              </Box>
            ) : (<Box sx={{flexGrow: 1}}>{loading ? <Skeleton variant='rectangular' sx={{width: "50px", height: "50px"}}/>: <ImageNotSupportedOutlined sx={{width: "50px", height: "50px"}}/>}</Box>)}
            <Typography>{whiskey.name}</Typography>
          </ListItem>
        </Card>
  )
}

export default WhiskeyListingCard