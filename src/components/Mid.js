import React, { useEffect, useState } from "react";
import axios from "axios";
import Audio from "./Audio";


function Mid() {
  const [data, setData] = useState([]);
  const [word, setWord] = useState("");


  let value;
  const handleInputs = () => {
    value = document.getElementById("val").value;
    setWord(value);
  };

  const dictionaryApi = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  useEffect(() => {
    dictionaryApi();
  }, [word]);

  return (
    <div className="pt-10 md:pl-36 md:pr-36 sm:pr-16 sm:pl-16 pl-4 pr-4 bg-cyan-900 pb-10">
      <div className="flex flex-row justify-center items-center">
        <div className="text-2xl lg:text-6xl md:text-4xl sm:text-3xl font-light text-white">
          {data[0]?.word?data[0]?.word.toUpperCase():"YOUR WORD"}
        </div>
      </div>
      <div className="pt-6 flex flex-row w-full">
        <input
          id="val"
          placeholder="Search a Word"
          className="w-full bg-slate-500 text-white pt-2 pb-2 pl-1 pr-1 border-0 border-b-2 border-black"
        ></input>
        <img
          src="https://cdn.pixabay.com/photo/2021/10/11/00/59/search-6699087__340.png"
          className="h-10 ml-1 border-0 rounded w-12 bg-white"
          alt=""
          onClick={handleInputs}
        />
      </div>
      <div className="mt-6 overflow-y-scroll bg-slate-400 pt-2 pb-2 pl-3 pr-3 h-96 border-8 border-slate-500 rounded no-scrollbar">
        <div>
          <Audio source={data[0]?.phonetics[0]?.audio!==""?data[0]?.phonetics[0]?.audio:(
            data[0]?.phonetics[1]?.audio?data[0]?.phonetics[1]?.audio : 
            data[0]?.phonetics[2]?.audio?data[0]?.phonetics[2]?.audio : ""
          )} id={data[0]?.word}/>
        </div>
        <div>
          {data.map((element) => {
            return (
              <div>
                {element.meanings.map((items) => {
                  return items.definitions.map((elem) => {
                    return (
                      <div>
                        <div className="pt-1 pb-1 pr-2 pl-2 bg-white mt-2 mb-2 border-0 rounded">
                          <div className="border-0 border-b-2 pb-0.5 leading-5">
                            𝐃𝐞𝐟𝐢𝐧𝐭𝐢𝐨𝐧 : {elem.definition}
                          </div>
                          <div className="pt-0.5">𝐔𝐬𝐞 : As {items.partOfSpeech}</div>
                          <div className="">
                            <div>
                              {elem.example ? `𝐄𝐱𝐚𝐦𝐩𝐥𝐞 : ${elem.example}` : ""}
                            </div>
                            <div>
                              {elem.synonyms[0] != null
                                ? `𝐒𝐲𝐧𝐨𝐧𝐲𝐦𝐬 : ${elem.synonyms.map(
                                    (s) => ` ${s} `
                                  )}`
                                : items.synonyms[0] != null
                                ? `𝐒𝐲𝐧𝐨𝐧𝐲𝐦𝐬 : ${items.synonyms
                                    .map((s) => ` ${s} `)
                                    .slice(
                                      0,
                                      Math.floor(Math.random() * 3) + 1
                                    )}`
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mid;
