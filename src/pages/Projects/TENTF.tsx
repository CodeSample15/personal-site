import { useState, cache, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Markdown from "react-markdown";

const DEVLOG_API = 'https://devlogs.lukecrimi.com/TENTF';
const MAX_BUTTONS = 6;
const getImages = cache(fetch_devlog); //set up caching for devlogs (don't keep making requests to devlog server)

export const TENTF = () => {
  const [numLogs, setNumLogs] = useState(0);
  const [images, setImages] = useState<string[]>();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  let targetDevlog = searchParams.get('devlog');

  if(!targetDevlog) {
    setSearchParams({devlog: '0'});
    targetDevlog = '0'
  }

  const load_devlog = (target: string | null) => {
    if(!target)
      target = '0'

    setLoading(true);
    getImages(target).then((log)=>{
      if(!log.text || !log.images) {
        setText("This devlog doesn't exist!");
        setImages([]);
      }
      else {
        setText(log.text);
        setImages(log.images);
      }
      setLoading(false);
    });
  }

  useEffect(()=>{
    setNumLogs(0);
    setLoading(true);

    //max number of
    get_num_logs().then((result)=>{
      //target latest devlog
      if(targetDevlog === 'latest') {
        targetDevlog = `${result-1}`;
        setSearchParams({devlog: `${result-1}`});
      }

      setNumLogs(result);
    }).then(()=>{
      //load devlog
      load_devlog(targetDevlog);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-start min-vh-100 gap-2 w-75">
        <div className="btn-group pb-5" role="group" aria-label="Basic outlined example">
          {
            getButtons(Number(targetDevlog), numLogs, (devlog)=>{
              setSearchParams({devlog: `${devlog}`})
              load_devlog(`${devlog}`);
          })
          } 
        </div>

        {
          loading ?
          <>
            <span className="placeholder placeholder-wave w-75"></span>
            <span className="placeholder placeholder-wave w-100">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            <span className="placeholder placeholder-wave w-50"></span>
            <span className="placeholder placeholder-wave w-20"></span>
          </>
          :
          <>
            <div className="d-flex flex-column justify-content-center pt-2">
              <Markdown>{text}</Markdown>
            </div>

            {images && images.length > 0 &&
            <div id="carousel" className="carousel slide pt-5 w-50 mx-auto">
              <div className="carousel-inner">
                {images.map((data, index)=>(
                  <div className={`carousel-item ${index==0?'active':''}`} key={index}>
                    <img className="d-block w-100" src={`data:image/png;base64,${data}`}/>
                  </div>
                ))}
              </div>
              {
                images.length>1 &&
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              }
            </div>
            }
          </>
        }
      </div>
    </div>
  )
}

function getButtons(currentButton: number, highestButton: number, updatePage:(devlog:number)=>void) {
  let numbers = [currentButton];
  
  //don't judge this algo too much, I did a quick and dirty cuz I really just want to get started on making the game itself
  let leftNumberShift = 1;
  let rightNumberShift = 1;

  for(let i=0; i<MAX_BUTTONS-1; i++) {
    let rightAdded = false;
    let leftAdded = false;

    //check right side
    if(currentButton + rightNumberShift < highestButton) {
      numbers.push(currentButton + rightNumberShift);
      rightNumberShift++;
      rightAdded = true;
    }

    //check left side
    if(currentButton - leftNumberShift >= 0) {
      numbers.unshift(currentButton - leftNumberShift);
      leftNumberShift++;
      leftAdded = true;
    }

    if(!(rightAdded || leftAdded)) //if neither side was added to, break from the loop
      break;
    else if(rightAdded && leftAdded) //if both sides were added to, decrease the number of loops by 1
      i++;
  }

  //for arrow control
  const highNum = currentButton == highestButton-1 ? currentButton : currentButton + 1;
  const lowNum = currentButton == 0 ? 0 : currentButton - 1;

  return <>
    <button type="button" className="btn btn-outline-secondary" onClick={()=>updatePage(lowNum)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg>
    </button>

    {numbers.map((item, index)=>(
      <button type="button" className={"btn " + (item==currentButton ? 'btn-info' : 'btn-outline-info')} key={index} onClick={()=>updatePage(item)}>
        {item}
      </button>
    ))}

    <button type="button" className="btn btn-outline-secondary" onClick={()=>updatePage(highNum)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
      </svg>
    </button>
  </>
}

async function fetch_devlog(id: string): Promise<{[name: string]: any}> {
  let log = {};

  await fetch(`${DEVLOG_API}/log/${id}`).then(async (result)=>{
    if(result?.ok) {
      const data = await result.json();
      if(data?.log) {
        log = data.log;
      }
    }
  }).catch((error)=>{
    console.log(error);
  });

  return log;
}


async function get_num_logs(): Promise<number> {
  let num_logs = 0;

  await fetch(`${DEVLOG_API}/log_count`).then(async (resp)=>{
    if(resp?.ok) {
      const data = await resp.json();
      if(data?.count)
        num_logs =  data.count;
    }
  }).catch((error)=>{
    console.log(error);
  });

  return num_logs;
}