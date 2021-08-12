import React, { useEffect, useState, useCallback, useRef } from "react";

const Posts = () => {
  const [Pdata, setData] = useState([]);

  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(10);

  const observer = useRef();

  const lastelement = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setNum((num) => num + 10);
        setNum2((num2) => num2 + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    let fetchData = async () => {
      await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => setData([...Pdata, ...data.slice(num, num2)]));
    };
    fetchData();
    // eslint-disable-next-line
  }, [num, num2]);

  return (
    <>
      {Pdata.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-800 h-screen">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-16 h-16 border-8 border-blue-400 border-solid rounded-full animate-spin"
          ></div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-col pt-8 bg-gray-800">
          <p className="text-white text-5xl pb-5">Infinite Scrolling</p>
          {Pdata.map((post, index) => {
            return (
              <div key={index} className="lg:w-1/2 capitalize w-4/5 ">
                <div className="text-blue-600 pb-5 pt-5 text-2xl">
                  <b>
                    {post.id}. {post.title}
                  </b>
                </div>
                <div
                  ref={lastelement}
                  className="capitalize text-white text-lg"
                >
                  {post.body}
                </div>
              </div>
            );
          })}
          <div className="text-5xl pb-10 pt-10 text-gray-400">
            {Pdata.length !== 100 && "Loading..."}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
