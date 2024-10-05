import React from 'react'
import { getWhiskey } from '@/utils/supabase/queries/serverQueries'

type Props = {
  params: {slug: string}
}

async function WhiskeyDetailsPage({params}: Props) {
  const whiskey = await getWhiskey(decodeURI(params.slug))
  return (
    <>
      <div>WhiskeyDetailsPage</div>
      <div>{JSON.stringify(whiskey)}</div>
    </>
  )
}

export default WhiskeyDetailsPage