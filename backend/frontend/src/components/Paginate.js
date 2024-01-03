import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    
    const navigate = useNavigate()
    const location = useLocation()
    const parameters = useParams()
    console.log(JSON.stringify(parameters))

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    const urlFormat = (pageNumber, keyword) => {
        const url = new URL(`/?keyword=${keyword}&page=${pageNumber+1}`)
        // const url = new URL(`/?keyword=${keyword}&page=${pageNumber+1}`)
        const urlFormatted = {
            hash: url.hash,
            pathname: url.pathname,
            search: url.search,
        }
        return urlFormatted
    }

    const pageClickHandler = (pageNumber, keyword) => {
        navigate(urlFormat(pageNumber, keyword))
    }
    

  return (pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer 
        key={x+1}
        onClick={pageClickHandler(x, keyword)}
        >
            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
  )
}

export default Paginate
