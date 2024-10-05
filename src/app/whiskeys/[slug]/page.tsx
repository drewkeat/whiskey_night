import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'

import { getWhiskey } from '@/utils/supabase/queries/serverQueries'

type Props = {
  params: {slug: string}
}

async function WhiskeyDetailsPage({params}: Props) {
  const whiskey = await getWhiskey(decodeURI(params.slug))
  return (
    <Card>
      <CardHeader title={whiskey.name} /><CardContent>
        <img src={whiskey.image} alt={`${whiskey.name} image`} style={{ width: '100%', height: 'auto' }} />
        <Typography variant="body2" color="textSecondary" component="p">
          {whiskey.description}
        </Typography>
        <Typography variant="h6" component="p">
          Region: {whiskey.region}
        </Typography>
      </CardContent>
  )
}
    </Card>
  )
}

export default WhiskeyDetailsPage