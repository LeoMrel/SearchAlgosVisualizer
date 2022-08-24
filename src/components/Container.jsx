import React from "react";


const Container = ({children}) => {
    return(
        <div className="flex place-content-center">
                <div className="container flex flex-col min-h-screen h-full w-full place-content-center place-items-center">
                    {children}
            </div>
        </div>
    )
}

export default Container