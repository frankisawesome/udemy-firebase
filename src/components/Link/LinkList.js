import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from './LinkItem'

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext)
  const [links, setLinks] = useState([])
  const isNewPage = props.location.pathname.includes('new')

  useEffect(() => {
    getLinks()
  }, [])

  function getLinks() {
    firebase.db.collection('links').orderBy('created', 'desc').onSnapshot(handleSnapshot)
  }

  const handleSnapshot = (snapshot) => {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
    setLinks(links)
  }

  function renderLinks() {
    if (isNewPage) {
      return links
    }
    return links.slice().sort((a, b) => b.votes.length - a.votes.length)
  }
  return (
    <div>
      {renderLinks().map((link, index) => <LinkItem key={link.id} showCount={true} link={link} index={index + 1} />)}
    </div>
  )
}

export default LinkList;
