import React from "react";


const Container = ({children}) => {
    return(
        <div className="flex place-content-center">
                <div className="container relative flex flex-col min-h-screen h-full w-full">
                    {children}
            </div>
        </div>
    )
}

export default Container