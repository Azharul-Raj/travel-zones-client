import countries from "world-countries";

const formattedCountries=countries.map(country=>({
    value:country.cca2,
    label:country.name.common,
    flag:country.flag,
    latlan:country.latlng,
    region:country.region
}))

const useCountries=()=>{
    const getAll=()=>formattedCountries;
    const getByValue=(value:any)=>{
        return formattedCountries.map(item=>item.value===value);
    }
    return {
        getAll,
        getByValue
    }
}

export default useCountries;