import Token2 from "./Token2"
import Token1 from "./Token1"
import Token3 from "./Token3"
import Token4 from "./Token4"
import Token5 from "./Token5"

const Token = () => {
 
  return (
    <div  className="w-full h-full flex justify-center">
    <div className='h-200 w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl '>
     <Token1/>
     <Token2/>
     <Token3/>
     <Token4/>
     <Token5/>
      
    </div>
    </div>
  )
}

export default Token


