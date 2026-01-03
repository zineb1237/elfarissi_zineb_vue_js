import { db } from '../services/firebase'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'

export function useFirestore() {
  const discussionsCol = collection(db,'discussions')
  const responsesCol = collection(db,'responses')

  const addDiscussion = async(title,content,user)=>{
    await addDoc(discussionsCol,{
      title, content, author: user.email, createdAt: new Date()
    })
  }

  const getDiscussions = async()=>{
    const q = query(discussionsCol, orderBy('createdAt','desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))
  }

  const addResponse = async(discussionId,content,user)=>{
    await addDoc(responsesCol,{
      discussionId,
      content,
      author:user.email,
      createdAt:new Date()
    })
  }

  return { addDiscussion, getDiscussions, addResponse }
}
