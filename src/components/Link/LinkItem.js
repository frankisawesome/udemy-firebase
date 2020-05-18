import React, { useContext } from "react";
import { Link, withRouter } from 'react-router-dom'
import { getDomain } from '../../utils'
import { FirebaseContext } from "../../firebase";

function LinkItem({ showCount, index, link, history }) {
  const { firebase, user } = useContext(FirebaseContext)

  async function handleVote() {
    if (!user) {
      history.push('/login')
    } else {
      const voteRef = firebase.db.collection('links').doc(link.id)
      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = {
            votedBy: { id: user.uid, name: user.displayName }
          }
          const updatedVotes = [...previousVotes, vote]
          voteRef.update({ votes: updatedVotes })
        }
      })
    }
  }

  async function handleDelete() {
    const linkRef = firebase.db.collection('links').doc(link.id)
    await linkRef.delete()
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}</span>}
        <div className="vote-button" onClick={handleVote}>up</div>
        <div className="ml1">
          <div>
            {link.description} <span className="link">{getDomain(link.url)}</span>
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes by {link.postedBy.name} {link.created.toDate().toDateString()} {" | "}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0 ? `${link.comments.length} comments ` : "discuss"}
            </Link>
            {postedByAuthUser && (<>
              {" | "}
              <span className="delete-button" onClick={handleDelete}>delete</span>
            </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LinkItem);
