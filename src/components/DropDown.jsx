/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
const CurrencyDropDown = ({
  currencies,
  currency,
  setcurrencies,
  favourites,
  handleFavourite,
  title,
}) => {

    const isfav=curr=>favourites.includes(curr)


  return (
    <div>
      <label htmlFor={title} className="
      block text-sm font-medium text-gray-700
      ">{title}</label>

      <div className="mt-1 relative">
        <select value={currency} onChange={(e)=>setcurrencies(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md
        shadow-sm focus:outline-none focus:ring-2 foucs:ring-indigo-500
        ">
            {favourites.map((currency)=>{
                  return (
                    <option 
                    className="bg-gray-200"
                    value={currency} key={currency}>
                      {currency}
                    </option>
                  );
            })}

            <hr/>

          {currencies
          .filter(c=>!favourites.includes(c))
          .map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        </select>


          <button onClick={()=>handleFavourite(currency)} 
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">
            {isfav(currency) ? <HiStar />:<HiOutlineStar/>}
            
            </button>

      </div>
    </div>
  );
};

export default CurrencyDropDown;
