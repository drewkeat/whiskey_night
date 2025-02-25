"use client"
import React, {useState, useEffect} from 'react'
import Image from "next/image"
import Link from "next/link"
import {Box, Card, ListItem, Skeleton, Typography} from "@mui/material"
import { ImageNotSupportedOutlined } from '@mui/icons-material'
import {Tables} from "@/types/supabase_types"
import { getWhiskeyImg } from '@/utils/supabase/queries/clientQueries'

type Props = {
  whiskey: Tables<"whiskeys"> 
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

  const path = "/whiskeys/" + whiskey.name
  
  return (
    <Card key={`whiskey-${whiskey.id}`} elevation={4}>
          <ListItem divider>
            {img ? (
              <Box sx={{flexGrow: 1}}>
                <Link href={path}>
                  <Image
                    alt={whiskey.name + "-image"}
                    src={img}
                    width={50}
                    height={50}
                  />
                </Link>
              </Box>
            ) : (<Box sx={{flexGrow: 1}}>{loading ? <Skeleton variant='rectangular' sx={{width: "50px", height: "50px"}}/>: <ImageNotSupportedOutlined sx={{width: "50px", height: "50px"}}/>}</Box>)}
            <Link href={path}><Typography>{whiskey.name}</Typography></Link>
          </ListItem>
        </Card>
  )
}

export default WhiskeyListingCard