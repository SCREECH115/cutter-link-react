import { useState } from "react";

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

const App = () => {

  const [link, setLink] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [visible, setVisible] = useState(false);
  
  return (
    <div className="bg-white w-full h-screen">
      <div className="flex justify-center text-white flex-col">
        <p className="text-4xl text-center m-5 border select-none border-black bg-black rounded-2xl w-1/5 mx-auto p-5 font-bold text-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">LINK CUTTER</p>
        <input type="text" className="mx-auto m-2 rounded-xl p-3 w-1/3 flex justify-center align-middle border border-black text-black hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white focus:bg-black focus:text-white focus:border-white focus:translate-y-1" value={link} onChange={(e) => {
          setLink(e.target.value);
        }}/> 
        <button className="bg-whte text-black border-2 border-black w-max mt-3 p-3 mx-auto rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white" onClick={async () =>
        {
          const id = await getLink(link);
          setVisible(true)
          if (id === null) return;
          setShortLink(`http://127.0.0.1:3000/${id}`)
        }}>GET SHORT</button>
        <a className={visible ? 'flex justify-center mx-auto  mt-5 text-xl text-black border-2 border-black p-4 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] hover:bg-black hover:transform hover:translate-y-1 duration-300 hover:text-white hover:border-white' : 'hidden'} href={shortLink} target="_blank">{shortLink}</a>
        
      </div>
    </div>
  );
}

export default App;