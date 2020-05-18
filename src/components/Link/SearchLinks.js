import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const [filter, setFilter] = useState('')
  const [filteredLinks, setFilteredLinks] = useState([])
  const [links, setLinks] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    getInitialLinks()
  }, [])

  function getInitialLinks() {
    firebase.db.collection('links').get().then(snapshot => {
      const links = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setLinks(links)
    })
  }
  function handleSearch(event) {
    event.preventDefault()
    const query = filter.toLowerCase()
    const mathces = links.filter(link => {
      return link.description.toLowerCase().includes(query) || link.postedBy.name.toLowerCase().includes(query)
    })
    setFilteredLinks(mathces)
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={e => setFilter(e.target.value)} />
          <button>Ok</button>
        </div>
      </form>
      {filteredLinks.map((link, index) => <LinkItem key={link.id} showCount={false} link={link} index={index}></LinkItem>)}
    </div>
  )
}

export default SearchLinks;
