import React, { createContext } from "react";

const ContextStore = createContext({
   albums: ["Maroon 5", "Jay", "Louis"],
   activeAlbum: 0,
});

export default ContextStore;
