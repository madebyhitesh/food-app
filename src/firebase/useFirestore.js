import {useState,useEffect} from "react"
import {projectFirestore} from "./config"

const useFirestore = (collection)=>{
    const [docs,setDocs] = useState([])
    
    useEffect(() => {
        const unsub = projectFirestore.collection("products")
        .onSnapshot((snap)=>{
          let documents = [];
          snap.forEach(doc =>{
            documents.push({...doc.data(),id:doc.id})
          });
          setDocs(documents)
        });

        return () => unsub();
       }, [])

    return {docs};
}

export default useFirestore;
