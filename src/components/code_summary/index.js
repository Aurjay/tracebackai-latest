import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const RecommendationCard = styled(Card)`
  flex-basis: calc(75% - 4rem);
  min-width: 600px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f5f5f5; /* Light grey background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: calc(85vh - 10rem);
  transition: transform 0.9s ease-in-out;
  border-radius: 10px;
  overflow-y: auto;
`

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [fileSent, setFileSent] = useState(false)
  const [recommendationData, setRecommendationData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const url = `https://www.googleapis.com/upload/storage/v1/b/test-json-latest/o?uploadType=media&name=${encodeURIComponent(
          selectedFile.name
        )}`

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          body: selectedFile
        })

        if (response.ok) {
          console.log('File uploaded successfully!')
          setFileSent(true)
        } else {
          throw new Error('File upload failed')
        }
      } catch (error) {
        setUploadError(error.message)
      }
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const response = await fetch('https://tracebackaigptcodesummary-4t2r2e6xka-uc.a.run.app/api/new-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Pass any necessary payload data here
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendationData(data)
      } else {
        console.error('Failed to fetch recommendations')
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (fileSent) {
      handleRefresh()
    }
  }, [fileSent])

  return (
    <div>
      <input type='file' accept='.py' onChange={handleFileChange} />
      <Button variant='contained' color='primary' onClick={handleFileUpload}>
        Upload File
      </Button>
      {uploadError && <p>Error: {uploadError}</p>}
      {fileSent && <p>File sent successfully. Refresh to get the Summary.</p>}
      {recommendationData && (
        <RecommendationCard variant='outlined'>
          <h2>Code Summary</h2>
          <div style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
            {recommendationData && recommendationData.answer}
          </div>
        </RecommendationCard>
      )}
      {fileSent && (
        <RecommendationCard variant='outlined'>
          <Button variant='contained' color='primary' disabled={refreshing} onClick={handleRefresh}>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </RecommendationCard>
      )}
    </div>
  )
}

const RecommendationSummary = () => {
  return (
    <div>
      <RecommendationCard variant='outlined'>
        <FileUploadForm />
      </RecommendationCard>
    </div>
  )
}

const PageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align cards to the top */
  height: 100vh;
`

const RecommendationSummaryPage = () => {
  return (
    <PageContainer>
      <RecommendationSummary />
    </PageContainer>
  )
}

export default RecommendationSummaryPage
