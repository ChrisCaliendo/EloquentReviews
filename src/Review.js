const getReview = () => {
    const response = await fetch(api_link)
    const json = await response.json()
    if (response.ok){
      setReview(json)
    }
  }
