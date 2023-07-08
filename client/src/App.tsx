import { useState, useEffect } from "react";
import Links from './Links';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";

const getAllLinks = async () => {
  try{
     const response = await fetch(`http://127.0.0.1:8090/api/collections/links/records`, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
     })

     const data = await response.json()
     return data;
  } catch (err) {
     console.log(err);
  }
  return null;
}

const getLink = async (link:string) => {
  try {
    const response = await fetch('http://127.0.0.1:8090/api/collections/links/records', {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({input: link})
    })
    const data = await response.json();
    
    return data.id;
  } catch (err) {
    console.error(err);
  }
  return null;
}

interface LinkData {
  id: string;
  input: string;
  created: string;
}

const App = () => {

  const [link, setLink] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [visible, setVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [allLinksData, setAllLinksData] = useState<LinkData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLinks();
      if (data) {
        setAllLinksData(data.items);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="bg-white w-full h-screen">
      <div className="flex justify-center text-white flex-col">
        
        <p className="max-2xl:w-1/2 text-4xl text-center m-5 border select-none border-black bg-black rounded-2xl w-1/5 mx-auto p-5 font-bold text-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">LINK CUTTER</p>
        
        <input type="text" className={isValid ? 'mx-auto m-2 rounded-xl p-3 w-1/3 flex justify-center align-middle border border-black text-black hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white focus:bg-black focus:text-white focus:border-white focus:translate-y-1' : 'mx-auto m-2 rounded-xl p-3 w-1/3 flex justify-center align-middle border-2 border-red-500 text-black hover:bg-black hover:transform hover:translate-y-1 duration-75 hover:text-white hover:border-white focus:bg-black focus:text-white focus:border-white focus:translate-y-1'} value={link} onChange={(e) => {
          setLink(e.target.value);
        }}/> 
        
        <div className={isValid ? 'hidden' : 'flex justify-center mx-auto text-black bg-red-500 p-2 rounded-md border-2 border-black transform ease-in-out duration-300'}>Wprowadź link!</div>
        
        <button className="bg-whte text-black border-2 border-black w-max mt-3 p-3 mx-auto rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white" onClick={async () =>
        {
          const id = await getLink(link);
          
            if(link !== ''){
              setIsValid(true)
              setVisible(true)
              if (id === null) return;
              setShortLink(`http://127.0.0.1:3000/${id}`)   
            } else {
              setIsValid(false)
              console.log('blad');
              return;
            }
        }}>GET SHORT</button>
        
        <a className={visible ? 'flex justify-center mx-auto  mt-5 text-xl text-black border-2 border-black p-4 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white' : 'hidden'} href={shortLink} target="_blank">{shortLink}</a>
        
      </div>

      <div className="flex justify-center mx-auto mt-10"> 
            <button className="bg-whte text-black border-2 border-black w-max mt-3 p-3 mx-auto rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white" onClick={ async () => {
              const allLinksData = await getAllLinks();
              console.log(allLinksData);

              if (allLinksData) {
                setAllLinksData(allLinksData.items);
                setTableVisible(true)
              }

              }}>GET ALL LINKS</button>
         </div>

         {/* <Links /> */}

         <table className={tableVisible ? '"text-center mt-5 mx-auto w-1/4 border-2 border-black"' : 'hidden'}>
        <thead>
          <tr className="border-2 border-black">
            <th>ID</th>
            <th>INPUT</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {allLinksData.map((linkData) => (
            <tr key={linkData.id}>
              <td>{linkData.id}</td>
              <td>{linkData.input}</td>
              <td>{linkData.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;