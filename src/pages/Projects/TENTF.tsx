import { useState, cache, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Markdown from "react-markdown";

const DEVLOG_API = 'https://devlogs.lukecrimi.com/TENTF';
const getImages = cache(fetch_devlog);

export const TENTF = () => {
  const [numLogs, setNumLogs] = useState(0);
  const [images, setImages] = useState<string[]>();
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  let targetDevlog = searchParams.get('devlog');

  if(!targetDevlog)
    setSearchParams({devlog: '0'});

  useEffect(()=>{
    setNumLogs(0);
    setLoading(true);

    //max number of
    get_num_logs().then((result)=>{
      if(targetDevlog === 'latest') {
        targetDevlog = `${result-1}`;
        setSearchParams({devlog: `${result-1}`});
      }

      setNumLogs(result)
    }).then(()=>{
      //load devlog
      getImages(targetDevlog!).then((log)=>{
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
    });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-center min-vh-100">
        {
          loading ?
          <div>Loading...</div>
          :
          <>
            <div>
              <Markdown>{text}</Markdown>
            </div>

            {images && images.length > 0 &&
            <div id="carousel" className="carousel slide">
              <div className="carousel-inner">
                {images.map((data, index)=>(
                  <div className={`carousel-item ${index==0?'active':''}`} key={index}>
                    <img className="d-block w-100" src={`data:image/png;base64,${data}`}/>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            }
          </>
        }
      </div>
    </div>
  )
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