'use client'
import { Button, TextField } from '@mui/material'
import {useState, useEffect} from 'react'
import { createClient } from '@/utils/supabase/client'


async function whiskeySearch(term:string) {
  const supabase = createClient()
  const {data,error} = await supabase.functions.invoke('scrape-search', {body: JSON.stringify(term)})
  if(error){
    console.error(error)
    return error.message
  }
  return data
}


function NewWhiskey() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<null|string|object[]>()
  

  return (
    <>
      <TextField name='name' type='text' id="whiskey-name" variant='standard' onChange={(e) => setSearchTerm(e.target.value)}/>
      <div id="term">
        {JSON.stringify(searchTerm)}
      </div>
      <Button variant='contained' color='primary' onClick={async() => setSearchResults(await whiskeySearch(searchTerm))} title="Search">Search</Button>
      <div id="results">
        {JSON.stringify(searchResults)}
      </div>
    </>
  )
}

export default NewWhiskey