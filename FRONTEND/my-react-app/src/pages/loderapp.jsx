import React, { useEffect, useState } from "react";
import Loader from "./loder";
import Home from "./homehero";

function Loadersapp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // simulate load
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Loader /> : <Home />}</>;
}

export default Loadersapp;