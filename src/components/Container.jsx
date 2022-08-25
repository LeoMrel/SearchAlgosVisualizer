import React from "react";


const Container = ({children}) => {
    return(
        <div className="flex place-content-center h-screen w-screen">
                <div className="container flex flex-col min-h-screen h-full w-full">
                    {children}
            </div>
        </div>
    )
}

export default Container