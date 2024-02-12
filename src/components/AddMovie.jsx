import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useFirebase } from "../firebase/firebase";
import ReactStars from 'react-stars'

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [year, setYear] = useState(0);
  const [coverpic, setCoverPic] = useState("");
  const [description, setDescription] = useState("");
  const [loading,setLoading] = useState(false);

  const firebase = useFirebase();

  const handleSubmit = async () => {
    setLoading(true);
    await firebase.handleCreateNewData(title, year,rating, coverpic, description);
    console.log(coverpic);
    setLoading(false);
  };
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <div className="relative">
                    <label
                      htmlFor="file"
                      className="leading-7 text-sm text-gray-300"
                    >
                      Upload Cover Picture
                    </label>
                    <input
                      id="file"
                      type="file"
                      name="file"
                      // value={coverpic}
                      onChange={(e) => setCoverPic(e.target.files[0])}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <div className="relative">
                    <label
                      htmlFor="file"
                      className="leading-7 text-sm text-gray-300"
                    >
                      Ratings
                    </label>
                    <ReactStars
                        size={30}
                        half={true}
                        value={rating}
                        onChange={(rate) => setRating(rate)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handleSubmit}
                  className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                 {loading == true?<TailSpin height={25} color="white" /> :
                  `Submit`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
