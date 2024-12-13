/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import CurrencyDropDown from "./DropDown"
import { HiArrowsRightLeft } from "react-icons/hi2"

const CurrencyConvertor = () => {

    const [currencies, setcurrencies] = useState([])
    const [amount, setamount] = useState(1)

    const [fromCurr, setfromCurr] = useState("USD")
    const [toCurr, settoCurr] = useState("INR")

    const [convertedAmount, setconvertedAmount] = useState(null)
    const [converting, setconverting] = useState(false)

    const [favourites, setfavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || ["INR","EUR"]);


    //currencies => https://api.frankfurter.app/currencies

     //conversion => https://api.frankfurter.app/latest?amount=1&from=USD&to=INR


    const fetchCurrencies=async ()=>{
        try{
            const res=await fetch("https://api.frankfurter.app/currencies")
            const data=await res.json()


            setcurrencies(Object.keys(data))

        }catch(error){
            console.error("Error In Fetching",error)
        }
    }

    useEffect(()=>{
            fetchCurrencies()
    },[])

    console.log(currencies)

    const ConvertCurr=async ()=>{

        if(!amount)return
        setconverting(true)

        try{
            const res=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`)
            const data=await res.json()


            setconvertedAmount(data.rates[toCurr]+" "+toCurr)

        }catch(error){
            console.error("Error In Fetching",error)
        }finally{
            setconverting(false)
        }

    }

    const handleFavourite=(currency)=>{
        let updatedFav=[...favourites];

        if(favourites.includes(currency)){
            updatedFav=updatedFav.filter(fav=>fav !== currency)
        }else{
            updatedFav.push(currency)
        }

        setfavourites(updatedFav)
        localStorage.setItem("favourites",JSON.Stringify(updatedFav))
    }

    const swapCurr=()=>{
        setfromCurr(toCurr)
        settoCurr(fromCurr)
    }


   



  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md ">
        <h2 className="
        mb-5 text-2xl font-semibold text-gray-700"
        >Currency Convertor</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <CurrencyDropDown currencies={currencies} title="From:"
            currency={fromCurr}
            setcurrencies={setfromCurr}
            handleFavourite={handleFavourite}
            favourites={favourites}
            />
            <div className="flex justify-center -mb-5 sm:mb-0">
                <button 
                onClick={swapCurr}
                className="p-2 bg-gray-200 rounded-full cursor-pointer
                hover:bg-gray-300
                ">
                    <HiArrowsRightLeft className="text-xl text-gray-700"/>
                </button>
            </div>
            <CurrencyDropDown currencies={currencies} title="To:"
             currency={toCurr}
             favourites={favourites}
             setcurrencies={settoCurr}
            handleFavourite={handleFavourite}
            />
        </div>

        <div className="mt-4">
            <label htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
            >Amount</label>
            <input type="number" onChange={(e)=>setamount(e.target.value)}
            value={amount}
            className="w-full p-2 border border-gray-300 rounded-md
            shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
            />
        </div>

        <div className="flex justify-end mt-6">
            <button className={`px-5 py-2 bg-indigo-600 text-white rounded-md
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
            focus:ring-offset-2 ${converting?"animate-pulse":""} `}
            onClick={ConvertCurr}>
              Convert  
            </button>    
        </div>

        {convertedAmount &&  <div className="mt-4 text-lg font-medium text-right text-green-600">
            Converted Amount: {convertedAmount}
        </div>}

    </div>
        
  )
}

export default CurrencyConvertor